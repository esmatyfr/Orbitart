import Image from "next/image";
import { ProcessStepControl } from "@/components/ui/process-step-control";
import { scanProcess } from "@/content/scan-process";

/** Server-rendered: all five steps remain readable without JavaScript/WebGL. */
export function ScanProcessSteps() {
  return (
    <div className="site-container mt-12">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Taramadan üretime beş adım">
        {scanProcess.steps.map((step, index) => (
          <li key={step.id} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0e17]">
            <ProcessStepControl index={index} stepId={step.id} />
            <Image src={step.posterPath} alt={step.posterAlt} width={512} height={512}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" className="aspect-square w-full object-contain" />
            <div className="p-5">
              <p className="text-xs font-bold tracking-widest text-violet-300">0{index + 1}</p>
              <h3 id={`process-title-${step.id}`} className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p id={`process-description-${step.id}`} className="mt-3 text-sm leading-6 text-zinc-300">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
