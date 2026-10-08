import Image from "next/image";

export function HeroLoading({ progress, ready }: { progress: number; ready: boolean }) {
  return (
    <div className="hero-loading" data-ready={ready} aria-hidden={ready}>
      <div className="hero-loading-brand" aria-hidden="true">
        <Image src="/images/brand/orbitart-orbital-logo.svg" alt="" width={1300} height={256} unoptimized priority />
        <span className="hero-loading-fill" style={{ clipPath: `inset(0 ${100 - Math.max(0, Math.min(100, progress))}% 0 0)` }} />
      </div>
      <div className="hero-loading-percent" role="progressbar" aria-label="3D sahne yükleniyor" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`%${progress}, modeller hazırlanıyor`}>
        <span aria-hidden="true">{progress}<span className="ml-3 text-zinc-500">%</span></span>
        <span className="sr-only">3D sahne hazırlanıyor</span>
      </div>
    </div>
  );
}
