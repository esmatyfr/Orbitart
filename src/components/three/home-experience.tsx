"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, type CSSProperties, type PointerEvent, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { ProcessStepControls } from "@/components/ui/process-step-control";
import { heroShowcase } from "@/content/hero-showcase";
import { getModelAsset } from "@/content/model-assets";
import { scanProcess } from "@/content/scan-process";
import { siteConfig } from "@/content/site-config";
import { processStage, processStageScrollTop, processStageFrameScrollTop, heroStoryPose, storyCardPose, stickyProgress, stickyFrameProgress, type PresentationMotion } from "@/lib/scroll-presentation";
import { nearestSelection, wrapSelection, type HeroMotion } from "@/lib/hero-selection";

const SharedCanvas = dynamic(() => import("@/components/three/shared-canvas"), {
  ssr: false,
});
const heroAssets = [...heroShowcase]
  .sort((left, right) => left.order - right.order)
  .map((item) => getModelAsset(item.assetId));
const orderedShowcase = [...heroShowcase].sort((a, b) => a.order - b.order);

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HomeExperience({
  children,
  enable3D,
  processSteps,
}: {
  children: ReactNode;
  enable3D: boolean;
  processSteps: ReactNode;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const presentation = useRef<PresentationMotion>({ inspection: 0, heroExit: 0, process: 0, rotation: 0, pointerX: 0, pointerY: 0 });
  const [stage, setStage] = useState(0);
  const processRef = useRef<HTMLElement>(null);
  const [heroTrack, setHeroTrack] = useState<HTMLDivElement | null>(null);
  const [processTrack, setProcessTrack] = useState<HTMLDivElement | null>(null);
  const [canRender, setCanRender] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [processReady, setProcessReady] = useState(false);
  const [fallback, setFallback] = useState<"unsupported" | "error" | "slow" | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);
  const markHeroReady = useCallback(() => setHeroReady(true), []);
  const markProcessReady = useCallback(() => setProcessReady(true), []);
  const markFailed = useCallback(() => setFallback("error"), []);
  const markSlow = useCallback(() => setFallback("slow"), []);
  const [selected, setSelected] = useState(0);
  const [settled, setSettled] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const motion = useRef<HeroMotion>({ target: 0, dragging: false });
  const pickRef = useRef<((x: number, y: number) => number | undefined) | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const gesture = useRef<{ id: number; x: number; y: number; start: number; horizontal: boolean; rotation: number } | null>(null);
  const activeAsset = heroAssets[selected];
  const activeItem = orderedShowcase[selected];
  const selectStep = useCallback((step: number) => {
    motion.current.target = Math.round(step);
    motion.current.dragging = false;
    setSelected(wrapSelection(step, heroAssets.length));
    wakeRef.current?.();
  }, []);
  const selectIndex = (index: number) => selectStep(nearestSelection(motion.current.target, index, heroAssets.length));

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const finishGesture = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    motion.current.dragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (start.horizontal && presentation.current.inspection < 0.2) selectStep(cancelled ? start.start : motion.current.target);
    else if (presentation.current.inspection < 0.2 && !cancelled && Math.hypot(event.clientX - start.x, event.clientY - start.y) < 8) {
      const rect = event.currentTarget.getBoundingClientRect();
      const index = pickRef.current?.((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
      if (index !== undefined) selectIndex(index);
    }
  };

  useEffect(() => {
    const update = () => {
      setPageVisible(!document.hidden);
      if (document.hidden && gesture.current) {
        const start = gesture.current;
        gesture.current = null;
        selectStep(start.start);
      }
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [selectStep]);

  useEffect(() => {
    if (!enable3D || !heroTrack || !processTrack) return;

    let checked = false;
    let supported = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!checked && entry.isIntersecting) {
            checked = true;
            try {
              const context = document.createElement("canvas").getContext("webgl2");
              supported = Boolean(context);
              context?.getExtension("WEBGL_lose_context")?.loseContext();
            } catch { supported = false; }
            if (!supported) setFallback("unsupported");
          }
          if (!supported) continue;
          if (entry.target === heroTrack) {
            setHeroVisible(entry.isIntersecting);
            if (entry.isIntersecting) setCanRender(true);
          }
          if (entry.target === processTrack) {
            setProcessVisible(entry.isIntersecting);
            if (entry.isIntersecting) setCanRender(true);
          }
        }
      },
      { rootMargin: "160px" },
    );
    observer.observe(heroTrack);
    observer.observe(processTrack);
    return () => observer.disconnect();
  }, [enable3D, attempt, heroTrack, processTrack]);

  useEffect(() => {
    let frame = 0;
    const root = heroRef.current;
    const processRoot = processRef.current;
    const introElements = root?.querySelectorAll<HTMLElement>("[data-hero-intro], .hero-controls");
    let cards = root?.querySelectorAll<HTMLElement>("[data-story-card]");
    const heroScreen = root?.querySelector<HTMLElement>(".hero-screen");
    const processScreen = processRoot?.querySelector<HTMLElement>(".process-screen");
    const arrowElement = root?.querySelector<HTMLButtonElement>(".hero-control");
    const phoneQuery = window.matchMedia("(max-width: 639px)");
    const update = () => {
      frame = 0;
      // Server-rendered service children can arrive after this client boundary mounts.
      if (!cards?.length) cards = root?.querySelectorAll<HTMLElement>("[data-story-card]");
      // Read geometry together before writing styles; use the same stable viewport as sticky CSS.
      const hero = root?.getBoundingClientRect();
      const process = processRoot?.getBoundingClientRect();
      const heroViewport = (heroScreen?.clientHeight ?? window.innerHeight - 72) + 72;
      const processViewport = (processScreen?.clientHeight ?? window.innerHeight - 72) + 72;
      const track = heroTrack?.getBoundingClientRect();
      const processView = processTrack?.getBoundingClientRect();
      const arrow = arrowElement?.getBoundingClientRect();
      presentation.current.heroAspect = track && track.height > 0 ? track.width / track.height : undefined;
      presentation.current.processAspect = processView && processView.height > 0 ? processView.width / processView.height : undefined;
      const enabled = enable3D && !fallback && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hero && root) {
        const progress = !enabled ? 0 : phoneQuery.matches
          ? stickyFrameProgress(hero.top, hero.height - 72, heroViewport - 72, 0)
          : stickyProgress(hero.top + 72, hero.height, heroViewport);
        presentation.current.heroExit = progress;
        // The final mobile stack leaves with the native frame, avoiding an empty exit screen.
        const pose = heroStoryPose(phoneQuery.matches ? Math.min(progress, 0.94) : progress);
        presentation.current.inspection = pose.enlarge;
        root.dataset.story = enabled ? "animated" : "static";
        root.style.setProperty("--story-enlarge", String(pose.enlarge));
        root.style.setProperty("--story-theme", String(pose.theme));
        root.style.setProperty("--story-intro-opacity", String(pose.intro));
        introElements?.forEach(element => { element.inert = enabled && pose.intro < 0.08; });
        cards?.forEach((element, index, currentCards) => {
          const card = storyCardPose(progress, Number(element.dataset.storyCard), phoneQuery.matches);
          element.style.setProperty("--card-y", card.y + "%");
          element.style.setProperty("--card-opacity", String(card.opacity));
          const covered = index < currentCards.length - 1 && storyCardPose(progress, Number(element.dataset.storyCard) + 1, phoneQuery.matches).y < 25;
          element.inert = enabled && (card.opacity < 0.1 || card.y > 35 || covered);
        });
        root.style.setProperty("--story-heading-opacity", String(pose.heading));
        if (enabled && track && arrow && track.height > 0) {
          presentation.current.platformNdcY = 1 - ((arrow.top + arrow.height / 2 - track.top) / track.height) * 2;
        } else presentation.current.platformNdcY = undefined;
      }
      if (process && processRoot) {
        processRoot.dataset.process = enabled ? "animated" : "static";
        if (enabled) {
          presentation.current.process = phoneQuery.matches
            ? stickyFrameProgress(process.top, process.height, processViewport - 72)
            : stickyProgress(process.top + 72, process.height, processViewport);
          setStage(processStage(presentation.current.process));
        }
      }
      wakeRef.current?.();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    const resizeObserver = new ResizeObserver(schedule);
    if (heroRef.current) resizeObserver.observe(heroRef.current);
    if (processRef.current) resizeObserver.observe(processRef.current);
    if (heroTrack) resizeObserver.observe(heroTrack);
    if (processTrack) resizeObserver.observe(processTrack);
    if (processScreen) resizeObserver.observe(processScreen);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { resizeObserver.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [enable3D, fallback, reducedMotion, heroTrack, processTrack]);

  const show3D = enable3D && canRender && !fallback;
  const selectProcessStage = (index: number) => {
    const root = processRef.current;
    if (!root) return;
    if (root.dataset.process === "animated") {
      const rect = root.getBoundingClientRect();
      const viewport = (root.querySelector<HTMLElement>(".process-screen")?.clientHeight ?? window.innerHeight - 72) + 72;
      const top = window.matchMedia("(max-width: 639px)").matches
        ? processStageFrameScrollTop(index, window.scrollY + rect.top, rect.height, viewport - 72)
        : processStageScrollTop(index, window.scrollY + rect.top, rect.height, viewport);
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      setStage(index);
    }
  };
  const processCanvasVisible = processVisible && (!reducedMotion || stage === 0);
  useEffect(() => {
    if (!show3D || heroReady || !heroVisible || !pageVisible) return;
    const timer = setTimeout(markFailed, 45000);
    return () => clearTimeout(timer);
  }, [show3D, heroReady, heroVisible, pageVisible, markFailed]);

  const retry = () => {
    setHeroReady(false);
    setProcessReady(false);
    setFallback(null);
    setAttempt(value => value + 1);
  };

  return (
    <>
      <section ref={heroRef} style={{ "--hero-accent": activeItem.palette.accent, "--hero-button": activeItem.palette.buttonBackground, "--hero-button-text": activeItem.palette.buttonText } as CSSProperties} className="showcase-hero hero-story relative -mt-18 border-b border-white/8">
        {orderedShowcase.map((item, index) => <div key={item.assetId} aria-hidden="true" className="pointer-events-none absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none" style={{ opacity: index === selected ? 1 : 0, background: `radial-gradient(ellipse at 50% 55%, ${item.palette.glow}35, transparent 65%), linear-gradient(${item.palette.background} 65%, #09080f)` }} />)}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-screen site-container relative pb-14 pt-24 text-center sm:pb-18 sm:pt-28">
          <p data-hero-intro className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            3D Tasarım · Tarama · Üretim
          </p>
          <div ref={setHeroTrack} role="group" aria-label="3D model seçkisi" aria-keyshortcuts="ArrowLeft ArrowRight" aria-describedby="hero-interaction-help" tabIndex={0}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget || (show3D && !heroReady)) return;
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                if (presentation.current.inspection > 0.2) { presentation.current.rotation += event.key === "ArrowRight" ? 0.25 : -0.25; wakeRef.current?.(); }
                else selectStep(motion.current.target + (event.key === "ArrowRight" ? 1 : -1));
              }
              if (event.key === "Home" && !event.ctrlKey && !event.metaKey && presentation.current.inspection > 0.2) {
                event.preventDefault();
                presentation.current.rotation = 0;
                wakeRef.current?.();
              }
            }}
            onPointerDown={(event) => { if (!event.isPrimary || event.button !== 0 || (show3D && !heroReady)) return; gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, start: Math.round(motion.current.target), horizontal: false, rotation: presentation.current.rotation }; }}
            onPointerMove={(event) => {
              const start = gesture.current;
              if (!start || start.id !== event.pointerId) {
                if (!reducedMotion && event.pointerType === "mouse") {
                  const rect = event.currentTarget.getBoundingClientRect();
                  presentation.current.pointerX = (event.clientX - rect.left) / rect.width * 2 - 1;
                  presentation.current.pointerY = (event.clientY - rect.top) / rect.height * 2 - 1;
                  wakeRef.current?.();
                }
                return;
              }
              const dx = event.clientX - start.x, dy = event.clientY - start.y;
              if (!start.horizontal && Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { gesture.current = null; return; }
              if (!start.horizontal && Math.abs(dx) > 8) { start.horizontal = true; event.currentTarget.setPointerCapture(event.pointerId); }
              if (start.horizontal) {
                if (presentation.current.inspection > 0.2) presentation.current.rotation = start.rotation + dx * 0.012;
                else { motion.current.dragging = true; motion.current.target = start.start - dx / event.currentTarget.clientWidth * 3; }
                wakeRef.current?.();
              }
            }}
            onPointerLeave={() => { presentation.current.pointerX = 0; presentation.current.pointerY = 0; wakeRef.current?.(); }}
            onPointerUp={(event) => finishGesture(event)} onPointerCancel={(event) => finishGesture(event, true)} onLostPointerCapture={(event) => finishGesture(event, true)}
            className="showcase-stage relative mx-auto mt-7 w-full touch-pan-y select-none overflow-hidden outline-offset-4 focus-visible:outline-2 focus-visible:outline-white sm:mt-10">
            <Image
              src={activeAsset.posterPath}
              alt={`${activeAsset.name} modelinin temsili stüdyo görseli`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 1152px"
              draggable={false}
              className={`showcase-poster pointer-events-none object-contain p-7 transition-opacity duration-300 motion-reduce:transition-none ${heroReady && show3D && heroVisible && pageVisible ? "opacity-0" : "opacity-100"}`}
            />
          </div>

          <p id="hero-interaction-help" className="sr-only">Başlangıçta yatay sürükleme ve yön tuşları model seçer. Kaydırmayla büyüyen yakın görünümde aynı kontroller modeli çevirir. Dikey kaydırma sayfa akışını sürdürür.</p>
          <div className="hero-controls">
          <div className="relative z-20 mx-auto -mt-16 flex max-w-xl items-center justify-between gap-4 text-sm text-zinc-300">
            <button type="button" aria-label="Önceki model" disabled={show3D && !heroReady} onClick={() => selectStep(motion.current.target - 1)} className="hero-control">←</button>
            <button type="button" aria-label="Sonraki model" disabled={show3D && !heroReady} onClick={() => selectStep(motion.current.target + 1)} className="hero-control">→</button>
          </div>
          {fallback && <div className="mx-auto mt-4 max-w-md text-sm text-zinc-300" role="status">
            <p>{fallback === "slow" ? "Daha akıcı bir deneyim için görseller gösteriliyor." : "3D görünüm açılamadı. Modelleri görselleriyle inceleyebilirsiniz."}</p>
            <button type="button" onClick={retry} className="mt-3 min-h-11 rounded-full border border-white/25 px-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">3D görünümü yeniden dene</button>
          </div>}
          <noscript><p className="mt-3 text-sm text-zinc-300">Etkileşimli model seçimi için JavaScript gerekir. Hizmetler ve mağaza bağlantıları kullanılabilir.</p></noscript>
          <span className="sr-only" role="status" aria-live="polite">{heroAssets[show3D ? settled : selected].name}</span>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <span className="hero-primary"><ButtonLink href="/iletisim">Projenizi Konuşalım</ButtonLink></span>
            <ButtonLink href={siteConfig.storeUrl} variant="secondary" external>
              Mağazaya Git
            </ButtonLink>
          </div>
          </div>
          <section id="neler-yapiyoruz" aria-labelledby="inspection-title" className="hero-cards">
            <div className="hero-cards-heading">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Neler yapıyoruz?</p>
              <h1 id="inspection-title" className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-[-0.04em] text-white">Fikri modele, modeli gerçeğe dönüştürüyoruz.</h1>
            </div>
            {children}
          </section>
        </div>
      </section>

      <section ref={processRef} id="taramadan-uretime" aria-labelledby="scan-process-title" className="border-y border-white/8 bg-white/[0.025] py-18 sm:py-24">
        <div className="site-container process-screen process-layout grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
              Taramadan Üretime
            </p>
            <h2 id="scan-process-title" className="mt-4 max-w-xl text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Fiziksel formdan dijital çalışmaya, oradan üretime.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">
              {scanProcess.description}
            </p>
            <div className="process-steps" data-active-stage={stage}>
              <ProcessStepControls stage={stage} selectStage={selectProcessStage}>{processSteps}</ProcessStepControls>
            </div>
          </div>
          <div className="process-sticky"><div id="process-model" ref={setProcessTrack} role="img" aria-label={`${scanProcess.steps[stage].title}: temsili süreç görünümü`} className="showcase-process process-stage relative overflow-hidden rounded-[2rem] border border-white/10 bg-violet-400/[0.035]">
            <Image
              src={scanProcess.steps[stage].posterPath}
              alt={scanProcess.steps[stage].posterAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-contain p-8 transition-opacity duration-300 motion-reduce:transition-none ${processReady && show3D && processCanvasVisible && pageVisible ? "opacity-0" : "opacity-100"}`}
            />
          </div>
          </div>
        </div>
      </section>

      {show3D && heroTrack && processTrack && (
        <SceneErrorBoundary key={attempt} onError={markFailed}>
          <SharedCanvas assets={heroAssets} heroTrack={heroTrack} processTrack={processTrack}
            presentation={presentation} heroVisible={heroVisible} processVisible={processCanvasVisible} pageVisible={pageVisible}
            motion={motion} reducedMotion={reducedMotion} accent={activeItem.palette.accent}
            onHeroReady={markHeroReady} onProcessReady={markProcessReady} onSettled={setSettled}
            onFailure={markFailed} onSlow={markSlow} pickRef={pickRef} wakeRef={wakeRef} />
        </SceneErrorBoundary>
      )}
    </>
  );
}
