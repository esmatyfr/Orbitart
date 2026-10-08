"use client";

import { View } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { loadConcurrent, updateSlowFrames } from "@/lib/model-loading";
import type { HeroMotion } from "@/lib/hero-selection";
import type { ModelAsset } from "@/types/model-asset";
import { HeroScene, ProcessScene } from "./showcase-scenes";
import { disposeModels, loadModel, loadScene, type LoadedModel } from "./model-resources";
import { processPrinterAsset } from "@/content/model-assets";
import { motionSettings } from "@/content/motion";

import type { PresentationMotion } from "@/lib/scroll-presentation";

type SharedCanvasProps = {
  presentation: RefObject<PresentationMotion>;
  assets: readonly ModelAsset[];
  heroTrack: HTMLDivElement;
  processTrack: HTMLDivElement;
  heroVisible: boolean;
  processVisible: boolean;
  pageVisible: boolean;
  motion: RefObject<HeroMotion>;
  reducedMotion: boolean;
  accent: string;
  platformRimEmission: number;
  onHeroReady: () => void;
  onLoadProgress: (progress: number) => void;
  onProcessReady: () => void;
  onSettled: (index: number) => void;
  onFailure: () => void;
  onSlow: () => void;
  pickRef: RefObject<((x: number, y: number) => number | undefined) | null>;
  wakeRef: RefObject<(() => void) | null>;
};

function RendererHealth({ active, scrolling, animating, onDegrade, onFailure, onSlow, wakeRef }: {
  active: boolean; scrolling: boolean; animating: RefObject<boolean>; onDegrade: () => void; onFailure: () => void; onSlow: () => void; wakeRef: SharedCanvasProps["wakeRef"];
}) {
  const { gl, invalidate } = useThree();
  const slowFrames = useRef(0);
  const degraded = useRef(false);
  const lastFrame = useRef(0);
  const reportAt = useRef(0);
  useEffect(() => { wakeRef.current = invalidate; return () => { wakeRef.current = null; }; }, [invalidate, wakeRef]);
  useEffect(() => {
    lastFrame.current = 0;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    const refresh = () => { if (active) invalidate(); };
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    refresh();
    return () => {
      gl.domElement.removeEventListener("webglcontextlost", lost);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [active, gl, invalidate, onFailure]);
  useFrame(() => {
    // Views render with autoClear disabled. Clear the shared transparent frame before either View,
    // so moving/resizing scissor rectangles cannot leave old model pixels behind.
    gl.setScissorTest(false);
    gl.clear(true, true, true);
    const now = performance.now();
    const continuous = active && (scrolling || animating.current);
    slowFrames.current = updateSlowFrames(slowFrames.current, now - lastFrame.current, continuous && lastFrame.current !== 0);
    lastFrame.current = continuous ? now : 0;
    if (process.env.NODE_ENV === "development" && active && now - reportAt.current > 500) {
      reportAt.current = now;
      gl.domElement.setAttribute("data-render-budget", JSON.stringify({ geometries: gl.info.memory.geometries, textures: gl.info.memory.textures, lastViewDrawCalls: gl.info.render.calls, lastViewTriangles: gl.info.render.triangles, dpr: gl.getPixelRatio() }));
    }
    if (slowFrames.current >= 30 && !degraded.current) {
      degraded.current = true;
      slowFrames.current = 0;
      onDegrade();
    } else if (slowFrames.current >= 90) {
      slowFrames.current = 0;
      onSlow();
    }
  }, -1);
  return null;
}

export default function SharedCanvas(props: SharedCanvasProps) {
  const { assets, heroVisible, processVisible, pageVisible, onFailure, onLoadProgress } = props;
  const [loaded, setLoaded] = useState<LoadedModel[]>([]);
  const [printerScene, setPrinterScene] = useState<LoadedModel["scene"] | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const [pixelRatio, setPixelRatio] = useState(1.5);
  const [phone, setPhone] = useState(() => window.matchMedia("(max-width: 639px)").matches);
  const lowerQuality = useCallback(() => setPixelRatio(1), []);
  const session = useRef<{ startRemaining: () => void; startPrinter: () => void } | null>(null);
  const animating = useRef(false);
  const motionSources = useRef({ hero: false, process: false });
  const markAnimation = useCallback((active: boolean) => { motionSources.current.hero = active; animating.current = active || motionSources.current.process; }, []);
  const markProcessAnimation = useCallback((active: boolean) => { motionSources.current.process = active; animating.current = active || motionSources.current.hero; }, []);
  const heroTrack = useMemo(() => ({ current: props.heroTrack }), [props.heroTrack]);
  const heroIntroPlayed = useRef(false);
  const processTrack = useMemo(() => ({ current: props.processTrack }), [props.processTrack]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setPhone(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const owned: LoadedModel[] = [];
    let accessory: LoadedModel["scene"] | undefined;
    let remainingStarted = false;
    let printerStarted = false;
    const load = async (asset: ModelAsset) => {
      const model = await loadModel(asset, controller.signal);
      if (controller.signal.aborted) { disposeModels([model.scene]); return; }
      owned.push(model);
      setLoaded([...owned]);
      // Count successfully downloaded AND parsed hero models. The final percent waits for the scene.
      onLoadProgress(Math.floor(owned.length / assets.length * 99));
    };
    const failure = () => { if (!controller.signal.aborted) onFailure(); };
    void load(assets[0]).catch(failure);
    session.current = {
      startPrinter: () => {
        if (printerStarted) return;
        printerStarted = true;
        void loadScene(processPrinterAsset.modelPath, controller.signal).then(scene => {
          if (controller.signal.aborted) { disposeModels([scene]); return; }
          accessory = scene;
          setPrinterScene(scene);
        }).catch(failure);
      },
      startRemaining: () => {
        if (remainingStarted) return;
        remainingStarted = true;
        void loadConcurrent(assets.slice(1), load, controller.signal, 2).catch(failure);
      },
    };
    return () => {
      controller.abort();
      session.current = null;
      disposeModels(owned.map(model => model.scene));
      if (accessory) disposeModels([accessory]);
    };
  }, [assets, onFailure, onLoadProgress]);

  useEffect(() => {
    if (loaded.length > 0 && heroVisible && pageVisible) session.current?.startRemaining();
  }, [loaded.length, heroVisible, pageVisible]);

  // Accessory is loaded once near the process view, never added to the six hero choices.
  useEffect(() => {
    if (processVisible && pageVisible) session.current?.startPrinter();
  }, [processVisible, pageVisible]);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setScrolling(false), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(idleTimer); };
  }, []);

  const models = useMemo(() => assets.flatMap(asset => loaded.filter(model => model.asset.id === asset.id)), [assets, loaded]);
  const processModel = models[0];
  const active = pageVisible && (heroVisible || processVisible);
  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
      <Canvas
        frameloop={!active ? "never" : scrolling ? "always" : "demand"}
        dpr={[1, phone ? motionSettings.phoneDpr : pixelRatio]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance", localClippingEnabled: true }}
        style={{ pointerEvents: "none" }}
      >
        <RendererHealth active={active} scrolling={scrolling} animating={animating} onDegrade={lowerQuality} onFailure={onFailure} onSlow={props.onSlow} wakeRef={props.wakeRef} />
        <View track={heroTrack} visible={heroVisible && pageVisible} index={1}>
          {heroVisible && pageVisible && models.length === assets.length && (
            <HeroScene assets={assets} models={models} onFirstReady={props.onHeroReady}
              introPlayedRef={heroIntroPlayed}
              presentation={props.presentation} motion={props.motion} reducedMotion={props.reducedMotion} accent={props.accent}
              platformRimEmission={props.platformRimEmission}
              onSettled={props.onSettled} pickRef={props.pickRef} onMotionChange={markAnimation} />
          )}
        </View>
        <View track={processTrack} visible={processVisible && pageVisible} index={2}>
          {processModel && printerScene && (
            <ProcessScene asset={processModel.asset} scene={processModel.scene} printerScene={printerScene}
              active={processVisible && pageVisible} onMotionChange={markProcessAnimation}
              onReady={props.onProcessReady} presentation={props.presentation} reducedMotion={props.reducedMotion} />
          )}
        </View>
      </Canvas>
    </div>
  );
}
