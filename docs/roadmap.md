# Orbiart Uygulama Yol Haritası

## Faz çalışma kuralı

**Güncel durum (2026-10-05): Faz 1–5 tamamlandı; [orbitartt.com](https://orbitartt.com) canlıdır.** Açık production/alan adı onayı, yayın ve son kontroller [progress.md](progress.md) içinde kayıtlıdır. Aşağıdaki eski tarihli durum notları kendi dönemini anlatır.

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

## Faz 2 — Dengeli hizmet anlatımı ve altı GLB'li ana sayfa

### Amaç ve kapsam

2026-10-01 revizyonu: üç teknik + üç yaratıcı modelle yatay sergi hattı; ardından iki hizmet yönlendirmesi, Taramadan Üretime, mevcut 1+4 gerçek fotoğraf, çalışma süreci ve iletişim. Kesin kompozisyon ve hareket kuralları [hero-design.md](hero-design.md) içindedir.

Mevcut Hakkımızda seçkisi ve /vitrin galerisi korunur. Her ürüne GLB, ikili fotoğraf/3D görünüm, üç ayrı stüdyo veya serbest zoom zorunlu değildir. Stok modeller gerçek Orbitart ürünlerinden ayrı tutulur.

### Faz 2A — Model hazırlığı, medya incelemesi ve veri geçişi

- A1/A2/A3/A5 özgün Blender üretimleridir; A4 Blade of Chaos kullanıcı tarafından seçilmiş harici modeldir, proje GLB/poster kopyası ve atıf kaydı vardır. A6 CC0 taş aslan türevidir. Güncel dosya, kaynak notu ve teknik durum [models.md](models.md) içindedir; eski adaylar arşivdedir.
- Düzenlenebilir `.blend` kaynakları ikincil Blender klasöründe kalır; yalnız hakları uygun web GLB'leri projeye alınır. Materyal, yön, pivot, geometri, doku, aktarım ve açılmış GPU bellek maliyeti incelenir.
- products.ts gerçek ürünleri; hedef model-assets.ts sahip olunan/harici 3D varlıkları, hakları ve teknik hazırlığı yönetir. Harici modele satış ürünü/fotoğraf eşleşmesi uydurulmaz.
- Fotoğraf portföyü, ürünün mağaza `published` durumundan ayrılır. Kullanıcının onayladığı 30 fotoğraf açık editoryal listeyle gösterilir; ürünlerin satış durumu topluca değiştirilmez.
- hero-showcase.ts altı benzersiz varlığı, 3+3 slotu, paletleri ve teknik ilk seçimi; scan-process.ts aynı teknik modelle dört aşamayı tanımlar.
- Paletler yalnız hero bölümüne uygulanır. Hero altındaki geçiş koyu mor ana temaya döner; sonraki bölümler model seçiminden etkilenmez.

Çıkış: altı dosyanın kaynak ve teknik kaydı, posterleri ve ortak bütçesi doğrulanmış; fotoğraf onay listesi ve model yayın filtresi ayrılmış olmalıdır. Görünür atıf ile gerçek cihaz performansı, sahne kurulduktan sonra Faz 2B–2D kabulünde doğrulanır.

### Faz 2B — Ortak renderer ve sahne prototipi

- Dikey başlık–sahne–kontrol–iki CTA kompozisyonu kurulur.
- Hero ve süreç alanları için sayfa seviyesinde tek paylaşılan Canvas/renderer ve görünürlük bazlı view/scissor sınırı kurulur.
- Faz 2 statik görünümünde ilk hero 3D alanının koyu panel/çerçevesi kaldırılır; saydam sahne hero zeminiyle birleşir. Altı modelin altında tek ince ortak platform ve görünür hava boşluğu bulunur. Süreç sahnesinde platform bulunmaz.
- Önce bir modelle hiza/ışık/fallback; iki modelle geçiş; ardından altı gerçek modelle yatay merkez/yan düzen doğrulanır. Farklı nesne biçimlerine uygun ayrı sunum dönüşümleri uygulanır.
- Kaynak geometry/texture sahipliği paylaşılır; görünmeyen hat çizilmez. Bölüm kapanması diğerinin kaynağını dispose etmez.
- Masaüstü/mobil oranlar, materyal doğruluğu, merkez/yan perspektif ve platform çakışmaları kontrol edilir.

Çıkış: tek/iki model prototipi değil, altı modelin normal sahnesi ve fallback'i; ortak renderer yaşam döngüsü doğrulanmış olmalıdır.

### Faz 2C — Seçim ve tema

- İleri/geri, yan modele tıklama, yatay sürükleme ve odaklı klavye seçimi ortak hedef kullanır.
- İndeks çevrimi, en yakın konuma yerleşme ve hızlı girişlerde son hedef yönetilir.
- TS paletleri CSS değişkenlerini ve 3D vurguları besler; model adı, hizmet etiketi ve renk tutarlıdır.
- Projenizi Konuşalım → /iletisim ve Mağazaya Git → genel mağaza sabit HTML hedefleridir. Temsili model için ürün satın alma bağlantısı türetilmez.
- Sürekli autoplay ve serbest OrbitControls varsayılan değildir.

Çıkış: altı varlığa desteklenen kontrollerle erişilir; yanlış etiket/atıf, kuyruk birikmesi veya dikey scroll engeli yoktur.

### Faz 2D — Yükleme, hata ve temel erişilebilirlik

- İlk poster/başlık/CTA 3D beklemez. İlk model öncelikli; diğerleri sınırlı eşzamanlı yüklenir. Tam hat altı model hazır olduğunda açılır.
- Eksik GLB, WebGL yokluğu, context kaybı ve düşük performansta posterli seçim çalışır. Gerçek ürün fotoğrafı ile temsili model render'ı karıştırılmaz.
- Hero/süreç görünürlüğüne göre yükleme önceliği ve çizim ayarlanır; arka plan sekmesinde durur, sayfa dönüşünde bellek sızıntısı olmaz.
- Klavye, odak, aktif seçim duyurusu, kontrast ve reduced-motion bu fazda çalışır; Faz 3'e ertelenmez.

### Faz 2E — Son sayfa sırası ve statik süreç anlatımı

- Eski ana sayfa hizmet kartları Teknik Çözümler / Yaratıcı Üretim yönlendirmelerine dönüşür. Hizmetlerimiz içinde #teknik-cozumler ve #yaratici-uretim hedefleri oluşturulur; hizmetlerin ayrıntıları kaybolmaz.
- Taramadan Üretime için dört semantik HTML adımı ve statik posterler eklenir: numune, tarama verisi, dijital model, üretim sonucu. Aynı teknik GLB sonraki animasyonun kaynağıdır.
- Temsili gösterim etiketi konur; gerçek tarama sonucu, CAD onarımı, ölçü toleransı veya metal üretimi iddiası yapılmaz. Mevcut doğrulanmamış sayısal iddialar içerik kontrolüne alınır.
- Mevcut 1+4 fotoğraf seçkisi korunur. Ardından müşterinin talep/değerlendirme/teslim süreci gelir; teknik dört aşama tekrarlanmaz.
- Hakkımızda #model-kaynaklari atıf bölümü ve hero'dan erişimi hazırlanır. Hakkımızda seçkisi ve /vitrin galerisi korunur.

Çıkış: son sayfa sırası, doğru bağlantılar, görünen atıflar ve JS/3D olmadan anlaşılır süreç hazırdır. Scroll'a bağlı dört aşamalı 3D animasyon Faz 3 işidir; Faz 2'de bitmiş sayılmaz.

2026-10-01 uygulama notu: kullanıcı Faz 2C/2D/2E'nin birlikte yürütülmesini onayladı. Kod ve yerel kontroller uygulandı; yeni yükleme düzeninin tarayıcı/gerçek cihaz kabulü açık. Aşağıdaki genel çıkış kriterleri kaldırılmadı; güncel kanıt ve eksikler [progress.md](progress.md) içindedir.

### Etkilenecek alanlar ve teknoloji

src/app/page.tsx, hizmetler/hakkımızda anchor'ları, src/components/products, three, ui; src/content, types, lib, styles ve izinli public medya. Next.js, TypeScript, Tailwind, React Three Fiber/Drei, Next Image ve Framer Motion.

### Testler ve tamamlanma kriteri

- Ürün yayın filtresi; asset hak/teknik/yayın durumu; altı benzersiz kayıt ve 3+3 slot.
- Altı model toplam aktarım, ilk model/tam hat süresi, draw call, FPS ve bellek.
- Yavaş ağ, hızlı seçim, başarısız dosya, WebGL/context kaybı ve sayfa dönüşü.
- Ortak renderer viewport hizası, hero/süreç birlikte görünürlük, cache/dispose davranışı.
- Gerçek telefon ve masaüstü; dokunma, klavye, reduced-motion, statik süreç ve atıflar.
- İlgili lint, typecheck, test ve production build.

Normal altılı hero, fallback, statik son düzen ve kontrollü yayın filtresi çalışır; fotoğraf galerileri korunur; sonuçlar cihaz bilgisiyle kaydedilirse Faz 2 tamamlanır.

### Geçiş koşulu

Kullanıcı altı modelli sonuç ve statik sayfa akışını onaylar; Faz 3 hareketlerine sonra geçilir.

## Faz 3 — Taramadan Üretime animasyonu ve hareket dili

**2026-10-04 son durum: tamamlandı.** Kullanıcı tasarım ve mobil kullanımdan sonra kalan testlerin tümünü başarıyla tamamladığını bildirip Faz 3'ün kapatılmasını onayladı. Agent'in son yerel kod/üretim kontrolleri ile kullanıcı tarafından bildirilen son teknik kabul [progress.md](progress.md) içinde ayrı kayıtlıdır; önceki açık test notları tarihsel kalır. Sonraki kullanıcı onayıyla Faz 4 uygulandı ve Preview yayınlandı; ayrıntı aşağıdaki Faz 4 bölümündedir. Production başlamadı.

2026-10-02 son kullanıcı düzeltmesi: ilk uygulama görsel olarak kabul edilmedi. Aynı ana sahnede büyüyen model, alttan yükselen kartlar ve belirgin çark efektleri sözleşmesi [hero-design.md](hero-design.md) içindedir; bu revizyon eski ayrı inceleme/mobil düğme sunumundan önceliklidir.

2026-10-02: kullanıcı geçişi ve uygulamayı onayladı. Kod uygulandı; güncel yerel doğrulamalar ve açık fiziksel cihaz/kullanıcı kabulü [progress.md](progress.md) içindedir. Önceki fazın açık ölçümleri silinmedi; Faz 4 onayı verilmedi.

2026-10-04 kapanış denetimi: istenen Faz 3 tasarım/hareketleri ve yerel lint/typecheck/test/build kontrolleri geçti. İlk üç ana sayfa bölümünün kullanıcı görsel kabulü tamam; güncel gerçek cihaz performansı, canlı reduced-motion/ekran okuyucu ve zor koşullardaki yaşam döngüsü kabulü açık. Faz 3 henüz tamamen kapanmadı; Faz 4 başlamadı. Ayrıntı ve yerel telefon adresi [progress.md](progress.md) içindedir.

2026-10-04 son kullanıcı kabulü: mobil optimizasyon ve kadraj düzenlemesinden sonra kullanıcı mobil testte sorun kalmadığını ve tasarımın tamam olduğunu onayladı. Tasarım ve telefondaki kullanım kabulü kapandı. Sayısal/uzun oturum performans ölçümleri, canlı erişilebilirlik ve zor koşul kontrollerinin açık kısımları [progress.md](progress.md) içinde korunur; bu onay tüm teknik testlerin yapılmış olduğu anlamına gelmez. Faz 4 henüz başlatılmadı.

### Amaç

Referanslardaki akıcılık hissini marka diline uyarlamak; doğal scroll, okunurluk ve performansı korumak. Birebir görsel/performans eşitliği önceden garanti edilmez.

### Yapılacak işler

- Faz 2'nin saydam hero sahnesi ve tek ortak platformunu korumak; ilk yatay seçimden aşağı kaydırıldığında aynı seçili modeli büyütüp çevrilebilir inceleme durumuna geçirmek; ayrı sahne/kopya model eklememek. Scroll seçim indeksini değiştirmez; model dönüşü yalnız inceleme durumundadır.
- “Neler Yapıyoruz” alanında önce seçili modelin adı ve temsil ettiği hizmetin kısa kartını, sonra mevcut Teknik Çözümler ve Yaratıcı Üretim kartlarını sırayla göstermek. Kartların ikinci kopyasını bırakmamak; hizmet bağlantılarını korumak.
- Model uzaklaşırken hero paletinden ana koyu mor temaya geçmek ve Taramadan Üretime alanını doğal akışta başlatmak. Masaüstü ve mobilde sticky sunum; scroll kilidi yok.
- Kullanıcının 2026-10-02 revizyonuyla beş görünüm üretmek: A1 yüzeyi → yüzey örneklerinden noktalar/tarama bandı → tel kafes → çalışan markasız FDM yazıcıda katmanlı baskı → ayrı öne çıkan tamamlanmış çark. Özgün yazıcı yalnız süreç aksesuarıdır; hero altılıdır.
- Çark için aynı A1 geometrisini paylaşmak, özgün yazıcıyı yalnız süreçte bir kez yüklemek; noktaları her kare yeniden üretmemek. Temsili gösterim etiketini korumak.
- Masaüstü ve mobilde sticky süreç uygulamak; scroll kilitlememek. JS/WebGL yokluğu ve reduced-motion için beş statik adımı normal akışta korumak.
- Fareyle küçük kamera paralaksı, hero çıkışında küçük geri çekilme ve zemin geçişi; kamera/model hattı/scroll sahipliğini ayırmak.
- İki hizmet kartı ve fotoğraf vitrininde kısa girişler; müşteri çalışma süreci ve iletişimde sakin vurgu.
- Ortak renderer görünürlük, DPR, doku, LOD, örnek nokta ve gölge maliyetini ölçerek ayarlamak. Ek scroll motoru veya ücretli servis zorunlu değildir.

### Etkilenecek alanlar ve teknoloji

src/components/ui, three, ilgili sayfalar/stiller ve scan-process.ts. Framer Motion, CSS, React Three Fiber/Drei; gerekli teknik kullanımda Three.js. Yeni paket ancak mevcut yığın yetersizliği doğrulanırsa değerlendirilir.

### Testler

- Fare + seçim + scroll birlikte; beş aşama ileri/geri ve hızlı kaydırma, dururken çalışan baskı kafası, yazıcı yükleme hatası ve poster dönüşü.
- Statik/animasyonlu metin eşleşmesi, klavye, odak, kontrast ve reduced-motion.
- Gerçek mobil/masaüstünde FPS, uzun takılma, bellek, context kaybı ve görünmeyen sahnede çizimin durması.
- İlgili lint/typecheck/build; layout shift, yatay taşma ve sabit sosyal butonlarla çakışma.

### Tamamlanma ve geçiş koşulu

Beş aşama anlaşılır, temsili olduğu açıktır; doğal scroll ve fallback çalışır; cihaz sonuçları kaydedilir. Kullanıcı hareketli sonucu onayladıktan sonra Faz 4'e geçilir.

## Faz 4 — Bağlantılar, kalite kontrolü ve Vercel hazırlığı

**Durum (2026-10-04): tamamlandı.** Kullanıcı HTTPS Preview'ı açıp sorunsuz çalıştığını onayladı ve GitHub/Vercel bağlantı adımlarını yetkilendirdi. Bağlantı/WhatsApp, metadata/canonical, sitemap/robots, marka ikonları/paylaşım görseli, 404 ve yayın kapısı hazır. Tanıtım adresi `https://orbitartt.com`, mağaza `https://orbitart.com.tr` olarak ayrıdır. Git otomasyonu yalnız `codex/*` Preview dallarına açılır; main production yayını ayrı onaya bağlıdır. Kanıtlar [progress.md](progress.md), yayın kuralları [deployment.md](deployment.md) içindedir. Aktif faz Faz 5 güvenlik/yayın hazırlığıdır.

### Başlangıç planı

1. **Bağlantılar:** merkezi mağaza/Instagram/WhatsApp hedeflerini tüm CTA'larda doğrula; hizmet ve kaynak anchor'larını kontrol et. WhatsApp hazır mesajını ortak yardımcıyla güvenli URL-encode et; yeni servis ekleme.
2. **Arama ve paylaşım:** tanıtım sitesi adresini mağaza adresinden ayır; sayfa başlık/açıklama ve canonical adreslerini, sitemap/robots, favicon ve Open Graph/Twitter görselini tamamla. Kesin site adresi doğrulanana kadar production adresi uydurma.
3. **Yerel kalite:** lint/typecheck/test/build, üretim HTML, responsive kullanıcı akışları, 404/bozuk medya ve fallback senaryolarını kontrol et. Önceki tasarım/3D kabulünü koru; bulunan kusurları dar kapsamda düzelt.
4. **Preview hazırlığı:** Vercel projesi/hesabı, GitHub bağlantısı, build ayarları ve Preview/Production ortam ayrımını netleştir. Dış kurulum/deploy öncesinde kullanıcı onayı al; onaylı Preview'da HTTPS, medya, bağlantı, metadata ve gerçek cihaz smoke testini kaydet.
5. **Faz 4 kabulü:** Preview sonuçlarını kullanıcıya sun. Kullanıcı kabulünden sonra Faz 5 güvenlik kapısına geç; production deploy için ayrı açık onay al.

Başlangıçta eksik olan hazır mesaj, sitemap/robots, favicon ve paylaşım görseli tamamlandı; metadataBase mağaza adresinden ayrıldı. Önceki tasarım/3D sözleşmesi korunarak Preview ve kullanıcı kabulü tamamlandı. Geliştirme bağımlılığı audit bulgusu ve alan adı sahipliği Faz 5 kaydına taşındı.

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

- Tüm CTA hedefleri, hizmet/atıf anchor'ları ve URL encoding
- 404 ve bozuk medya senaryoları
- Sitemap/robots/metadata kontrolleri
- Production build ve Preview smoke test

### Tamamlanma kriteri

Tüm bağlantılar doğru hedefe gider, Preview ortamı doğrulanır ve production yayını dışında teknik engel kalmaz.

### Geçiş koşulu

Kullanıcı Preview sonucunu onaylar; Production öncesi Faz 5 güvenlik kapısı uygulanır.

## Faz 5 — Güvenlik, gizlilik ve yayın kapısı

**Durum (2026-10-05): tamamlandı.** Kullanıcı “Canlıya al” ile production/alan adı geçişini açıkça onayladı. Güvenlik dalı main/GitHub'a alındı, gerçek Production READY oldu, iki domain yeni projeye taşındı ve www → apex 308 ayarlandı. Herkese açık HTTPS, altı rota/medya/SEO/güvenlik, masaüstü/mobil 3D, erişilebilir menü ve poster fallback kontrolleri geçti. Eski proje geri dönüş için korunur. Geliştirme bağımlılığı upstream takibi bakım maddesidir; kanıt ve sınırlar [progress.md](progress.md) içinde kayıtlıdır.

### Amaç

Gizli bilgi sızıntısını önlemek, tarayıcı güvenlik politikalarını doğrulamak ve kontrollü production yayını yapmak.

### Yapılacak işler

- Ortam değişkenlerinin kapsamını ve Vercel ortam ayrımını denetlemek.
- CSP ve diğer güvenlik başlıklarını production ihtiyaçlarına göre etkinleştirmek.
- Git geçmişi, dosyalar, loglar ve client bundle üzerinde secret taraması yapmak.
- Harici origin, iframe, font, görsel ve bağlantı izinlerini minimuma indirmek.
- Yayınlanacak model/poster haklarını, atıfları, temsili kullanım açıklamasını ve public dosya dağıtım iznini son kez kontrol etmek.
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
