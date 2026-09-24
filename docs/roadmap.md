# Orbiart Uygulama Yol Haritası

## Faz çalışma kuralı

Fazlar sırayla uygulanır. Aktif faz tamamlanmadan sonraki fazın uygulama koduna başlanmaz. Her faz sonunda ilgili kontroller çalıştırılır, sonuç `docs/progress.md` içine yazılır ve sonraki faz için kullanıcı onayı beklenir.

## Faz 1 — İskelet ve marka sistemi

### Amaç

Gezilebilir, responsive ve marka kimliği tanımlanmış Next.js iskeletini oluşturmak.

### Yapılacak işler

- Next.js App Router, TypeScript, Tailwind CSS ve ESLint kurulumunu yapmak.
- `/`, `/hakkimizda`, `/hizmetlerimiz`, `/iletisim` rotalarını oluşturmak.
- Navbar, Footer, mobil menü ve ortak CTA bileşenlerini hazırlamak.
- Koyu sinematik yüzeyler, Orbitart moru, tipografi ve spacing token'larını tanımlamak.
- Temel metadata, semantik HTML ve erişilebilir focus durumlarını eklemek.

### Etkilenecek alanlar

`src/app`, `src/components/layout`, `src/components/ui`, `src/styles`, temel yapılandırma dosyaları.

### Teknoloji

Next.js App Router, TypeScript, Tailwind CSS.

### Testler

- Lint ve typecheck
- Production build
- Dört rotada manuel smoke test
- Mobil menü ve klavye navigasyonu

### Tamamlanma kriteri

Dört sayfa navigasyonla erişilebilir, ortak layout tutarlı, mobil taşma yok ve production build başarılıdır.

### Geçiş koşulu

Faz 1 sonucu kullanıcı tarafından onaylanır; ürün veri modeli ve 3D entegrasyonu Faz 2'de başlar.

## Faz 2 — GLB ürün vitrini ve statik katalog

### Amaç

Gerçek fotoğraf ile hazır GLB modelini birlikte sunan, kod üzerinden yönetilen ürün vitrini oluşturmak.

### Yapılacak işler

- `Product`, `SceneId` ve `ProductStatus` tiplerini oluşturmak.
- Statik ürün kataloğu ve yalnızca `published` filtrelemesini eklemek.
- Koyu Stüdyo, Mor Galeri ve Beyaz Stüdyo preset'lerini tanımlamak.
- Fotoğraf + 3D ikili masaüstü düzenini ve sıralı mobil düzeni geliştirmek.
- OrbitControls ile sınırlı döndürme/zoom, lazy loading ve hata fallback'i eklemek.
- Mağaza CTA'sını ürün kaydındaki doğrulanmış URL'ye bağlamak.

### Etkilenecek alanlar

`src/types`, `src/content`, `src/components/products`, `src/components/three`, `public/images/products`, `public/models/products`.

### Teknoloji

TypeScript, React Three Fiber, Drei, Next Image.

### Testler

- Ürün şeması ve yayın filtresi testleri
- Geçerli/geçersiz sahne seçimi
- GLB başarı, loading ve hata durumları
- WebGL olmayan cihaz fallback'i
- Mobil dokunma/kaydırma davranışı
- Production build ve temel performans ölçümü

### Tamamlanma kriteri

Yayınlanan ürünler doğru sahne ve bağlantıyla görünür; taslaklar görünmez; 3D desteklenmediğinde fotoğraf deneyimi eksiksizdir.

### Geçiş koşulu

En az bir gerçek fotoğraf/GLB çifti masaüstü ve mobilde kullanıcı tarafından onaylanır.

## Faz 3 — Animasyon, erişilebilirlik ve performans

### Amaç

Premium hareket hissini erişilebilirlik ve mobil performansı bozmadan tamamlamak.

### Yapılacak işler

- Ölçülü sayfa/bölüm girişleri ve CTA hover animasyonları eklemek.
- `prefers-reduced-motion` davranışını uygulamak.
- Görsel ve 3D yükleme stratejisini optimize etmek.
- Mobil DPR, ışık, gölge ve kontrol maliyetini sınırlandırmak.
- Klavye odağı, kontrast, başlık sırası ve alt metinleri denetlemek.

### Etkilenecek alanlar

`src/components/ui`, `src/components/three`, sayfa bileşenleri ve global stiller.

### Teknoloji

Framer Motion, React Three Fiber, Next Image ve tarayıcı performans API'leri.

### Testler

- Reduced motion açık/kapalı senaryoları
- Klavye navigasyonu ve focus görünürlüğü
- Mobil ve masaüstü performans kontrolü
- Layout shift ve yatay taşma kontrolü

### Tamamlanma kriteri

Animasyonlar içerik erişimini engellemez; mobil deneyim akıcıdır; reduced-motion modunda gereksiz hareket yoktur.

### Geçiş koşulu

Erişilebilirlik ve performans kontrolleri belgelenir ve kullanıcı görsel akışı onaylar.

## Faz 4 — Bağlantılar, kalite kontrolü ve Vercel hazırlığı

### Amaç

Tüm dönüşüm bağlantılarını doğrulamak ve tekrarlanabilir bir Preview/Production yayın süreci hazırlamak.

### Yapılacak işler

- Mağaza, WhatsApp ve Instagram bağlantılarını merkezi yapılandırmak.
- WhatsApp için güvenli, URL-encoded hazır mesaj oluşturmak.
- Metadata, sitemap, robots ve sosyal paylaşım görsellerini tamamlamak.
- Production build ve tam responsive smoke test yapmak.
- Vercel Preview kurulumunu hazırlamak; production deploy için onay kapısı koymak.

### Etkilenecek alanlar

`src/content/site-config.ts`, `src/lib/links.ts`, metadata dosyaları ve Vercel ayarları.

### Teknoloji

Next.js metadata API, Vercel ve HTTPS dış bağlantıları.

### Testler

- Tüm CTA hedefleri ve URL encoding
- 404 ve bozuk medya senaryoları
- Sitemap/robots/metadata kontrolleri
- Production build ve Preview smoke test

### Tamamlanma kriteri

Tüm bağlantılar doğru hedefe gider, Preview ortamı doğrulanır ve production yayını dışında teknik engel kalmaz.

### Geçiş koşulu

Kullanıcı Preview sonucunu onaylar; Production öncesi Faz 5 güvenlik kapısı uygulanır.

## Faz 5 — Güvenlik, gizlilik ve yayın kapısı

### Amaç

Gizli bilgi sızıntısını önlemek, tarayıcı güvenlik politikalarını doğrulamak ve kontrollü production yayını yapmak.

### Yapılacak işler

- Ortam değişkenlerinin kapsamını ve Vercel ortam ayrımını denetlemek.
- CSP ve diğer güvenlik başlıklarını production ihtiyaçlarına göre etkinleştirmek.
- Git geçmişi, dosyalar, loglar ve client bundle üzerinde secret taraması yapmak.
- Harici origin, iframe, font, görsel ve bağlantı izinlerini minimuma indirmek.
- Güvenlik kontrol listesini tamamlamak ve kullanıcıdan production onayı almak.

### Etkilenecek alanlar

`next.config.ts`, `.env.example`, Vercel ayarları ve `docs/security.md`.

### Teknoloji

Next.js security headers, Vercel Environment Variables ve Git güvenlik kontrolleri.

### Testler

- Response header kontrolü
- CSP ihlal ve dış kaynak kontrolleri
- Secret scan
- Preview/Production ortam değişkeni ayrımı
- Son production build ve temel kullanıcı akışı

### Tamamlanma kriteri

Gizli bilgi sızıntısı bulunmaz, güvenlik başlıkları aktiftir, kontroller belgelenmiştir ve kullanıcı production yayınını açıkça onaylamıştır.

### Geçiş koşulu

Production deploy gerçekleştirilir ve yayın sonrası smoke test tamamlanır.
