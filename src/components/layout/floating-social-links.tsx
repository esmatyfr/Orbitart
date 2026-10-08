import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/content/site-config";

const floatingLinkClass =
  "fixed bottom-4 z-40 hidden size-12 place-items-center rounded-full border shadow-[0_12px_35px_rgba(0,0,0,0.4)] transition duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 sm:bottom-6 sm:grid sm:size-13";

export function FloatingSocialLinks() {
  return (
    <>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Orbitart Instagram profilini aç"
        title="Instagram"
        className={`${floatingLinkClass} left-4 border-violet-300/30 bg-violet-600 text-white focus-visible:outline-violet-300 sm:left-6`}
      >
        <InstagramIcon className="size-5" />
      </a>

      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp üzerinden ${siteConfig.whatsappNumber} numarasına yaz`}
        title="WhatsApp"
        className={`${floatingLinkClass} right-4 border-emerald-200/40 bg-[#25d366] text-[#07130b] focus-visible:outline-emerald-300 sm:right-6`}
      >
        <WhatsAppIcon className="size-5" />
      </a>
    </>
  );
}
