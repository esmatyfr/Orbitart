export function httpsUrl(value: string): string {
  let url: URL;
  try { url = new URL(value); } catch { throw new Error("Herkese açık bağlantı geçerli bir HTTPS adresi olmalı."); }
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("Herkese açık bağlantı kimlik bilgisi içermeyen bir HTTPS adresi olmalı.");
  }
  return url.href;
}

export function whatsappLink(value: string, message: string): { href: string; number: string } {
  const url = new URL(httpsUrl(value));
  const number = url.pathname.slice(1);
  if (url.hostname !== "wa.me" || url.port || !/^[1-9]\d{7,14}$/.test(number)) {
    throw new Error("WhatsApp hedefi uluslararası numara içeren bir wa.me adresi olmalı.");
  }
  url.search = "";
  url.hash = "";
  url.searchParams.set("text", message);
  return { href: url.href, number };
}
