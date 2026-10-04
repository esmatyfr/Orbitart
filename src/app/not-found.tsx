import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="site-container py-20 sm:py-28">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">404</p>
      <h1 id="not-found-title" className="mt-5 text-4xl font-semibold tracking-tight text-white">Bu sayfa bulunamadı.</h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">Bağlantı değişmiş olabilir. Ana sayfadan çalışmalarımıza ulaşabilir veya projenizi bizimle paylaşabilirsiniz.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Ana sayfaya dön</ButtonLink>
        <ButtonLink href="/iletisim" variant="secondary">İletişime geç</ButtonLink>
      </div>
    </section>
  );
}
