# Orbiart Proje İlerlemesi

Son güncelleme: 2026-09-25

## Mevcut durum

- Aktif aşama: Faz 1 — İskelet ve marka sistemi
- Durum: Tamamlandı
- Sonraki aşama: Faz 2 — GLB ürün vitrini ve statik katalog

## Tamamlanan işler

- Proje kökü için `AGENTS.md` çalışma talimatları hazırlandı.
- Kalıcı proje kuralı `.cursor/rules/orbiart-core.mdc` altında tanımlandı.
- Mimari, yol haritası, güvenlik, içerik ve ilerleme belgeleri oluşturuldu.
- `.gitignore` ve güvenli `.env.example` hazırlandı.
- Kaynak kod ve medya için hedef klasör iskeleti oluşturuldu.
- Teknoloji/faz eşleştirmesi ve faz geçiş koşulları belgelendi.
- Next.js App Router, TypeScript, Tailwind CSS ve ESLint kuruldu.
- Ana sayfa, Hakkımızda, Hizmetlerimiz ve İletişim rotaları oluşturuldu.
- Ortak Navbar, mobil menü, Footer, CTA ve sayfa başlığı bileşenleri oluşturuldu.
- Koyu sinematik yüzey, Orbitart moru, responsive tipografi ve spacing sistemi uygulandı.
- Temel metadata, semantik yapı, skip link ve klavye focus durumları eklendi.
- Mağaza, Instagram ve opsiyonel WhatsApp hedefleri merkezi public yapılandırmaya alındı.
- Kullanıcı geri bildirimiyle tablet navbar bağlantıları hamburger yerine yatay sıraya alındı.
- Footer içindeki Keşfet ve Bağlantılar grupları telefon görünümünde de yan yana tutuldu.
- Footer konumu dışında kullanıcıya görünen Bodrum ifadeleri kaldırıldı.
- İletişim sayfasındaki uzun giriş alanı kaldırıldı; WhatsApp, Instagram ve mağaza kartları doğrudan görünür hale getirildi.
- İletişim kartlarında ek paket gerektirmeyen yerel SVG ikonları kullanıldı.
- WhatsApp numarası ve `wa.me` hedefi merkezi public yapılandırmaya eklendi.
- Footer bağlantılarına WhatsApp eklendi; Instagram ve WhatsApp kısayolları tüm sayfalarda sabit köşe butonları olarak yerleştirildi.
- Proje `main` dalına sahip yerel bir Git deposuna alındı.

## Doğrulamalar

- `npm run lint`: başarılı.
- `npm run typecheck`: başarılı.
- `npm run build`: başarılı; dört kullanıcı rotası statik olarak üretildi.
- Masaüstü ana sayfa görünümü tarayıcıda doğrulandı.
- 390 × 844 mobil görünümde dört rota doğrulandı; yatay taşma bulunmadı.
- Mobil menü açılma ve bağlantı görünürlüğü doğrulandı.
- Tarayıcı konsolunda hata veya uyarı bulunmadı.
- `npm audit`: 0 güvenlik açığı.
- Navbar 900 px, footer 390 px viewport ile yeniden doğrulandı.
- `.env.local` oluşturulmadı ve gerçek gizli değer eklenmedi.
- İletişim değişiklikleri sonrasında lint, typecheck ve production build yeniden başarılı oldu.
- İletişim kartları, sabit sosyal butonlar ve bağlantı hedefleri masaüstü tarayıcıda doğrulandı.

## Bilinen eksikler

- Resmî Orbitart logo dosyası henüz eklenmedi; geçici tipografik marka işareti kullanılıyor.
- Gerçek ürün fotoğrafları ve GLB modelleri henüz eklenmedi.
- Ürün adı, kategori, açıklama, mağaza ürün URL'si ve sahne seçimi henüz sağlanmadı.
- Vercel bağlantısı henüz kurulmadı.

## Sonraki görev

Faz 2 başlamadan önce kullanıcıdan en az bir ürün için gerçek fotoğraf, web için optimize GLB, ürün bilgileri, mağaza URL'si ve tercih edilen sahne alınacak. Resmî logo sağlanırsa geçici tipografik işaret değiştirilecek. Ardından ürün tipleri, statik katalog, sahne preset'leri ve lazy-loaded 3D görüntüleyici uygulanacak.

## Mimari kararlar

- İlk sürüm backend, CMS ve veritabanı içermez.
- Ürün yönetimi tip güvenli statik içerik dosyası üzerinden yapılır.
- Fotoğraf temel içerik, 3D görüntüleyici progressive enhancement olarak ele alınır.
- Yalnızca `published` ürünler sitede görünür.
- Üç merkezi sahne preset'i kullanılır.
- Production deploy kullanıcı onayı gerektirir.
