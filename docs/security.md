# Orbiart Güvenlik ve Gizlilik Rehberi

## Revizyon yayını denetimi (2026-10-09)

Açık kullanıcı isteğiyle e56ab2f kaynakları mevcut Production projesinde yayınlandı. Ortam kapsamları, deployment koruması ve güvenlik başlıkları değiştirilmedi. Canlı HTTPS/CSP/rota/medya kontrolleri geçti; Gitleaks Git geçmişi, kaynak, son client çıktısı ve yeni build logunda sıfır bulgu verdi. Kanıtlar Git/upload dışındaki output/release-2026-10-09 içindedir.

Güncel npm audit toplam **8 high**, runtime filtresi **3 high** (next, sharp, source-map-js) bildirir; önceki sıfır runtime kaydı tarihsel sonuçtur. Bağımlılık bakımı açıktır; bu görsel revizyon yayını sürüm yükseltmesi içermez. Etkin koşullar kaynak ve advisory ile değerlendirildi:

- [Next.js Image Optimization SSRF](https://github.com/vercel/next.js/security/advisories/GHSA-cjq9-62q9-8jv4): remotePatterns gerektirir; bu projede tanımlı değildir.
- [SSG/ISR cache poisoning](https://github.com/vercel/next.js/security/advisories/GHSA-4jqv-mc3x-m676): self-hosted Pages Router kapsamındadır; advisory Vercel'i etkilenmeyen olarak belirtir. Bu proje Vercel App Router kullanır. [Diğer cache poisoning](https://github.com/vercel/next.js/security/advisories/GHSA-mcj8-r9mp-w47p) kök catch-all gerektirir; projede yoktur. Draft Mode/use cache ve dinamik metadata resmi rotaları da kullanılmaz. Dev MCP bulgusu Production sunucusu değildir; yerel geliştirme için sürüm bakımı yine gereklidir.
- [sharp/librsvg](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w) SVG decode koşuluyla ilgilidir. Sitede kullanıcı dosya yüklemesi/uzak görsel yok; SVG optimizasyonunu açan dangerouslyAllowSVG tanımlı değil, marka SVG doğrudan gösterilir. Bu koşul değerlendirmesi paketin yamalı olduğu anlamına gelmez.
- [source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) güvenilmeyen indexed source-map işlenmesine ilişkindir; site ziyaretçiden source-map almaz. Build girdileri izlenen kaynak/kilit dosyasıdır. Beş geliştirme zinciri bulgusu da sürer.

Next.js ≥16.3.8, sharp ≥0.35.5 ve source-map-js ≥1.2.2 adayları ayrı bakımda mevcut uyumluluk/testlerle değerlendirilmelidir. npm audit fix --force ile sürüm düşürme yapılmadı; sıfır açık veya mutlak etkilenmeme garantisi verilmez.

## Canlı yayın kabulü (2026-10-05)

Kullanıcı “Canlıya al” ile Production ve domain taşımasını açıkça onayladı. **Faz 5 tamamlandı; https://orbitartt.com canlıdır.** `PRODUCTION_RELEASE_APPROVED=true` yalnız Production ortamında gizli olmayan Config olarak tanımlandı. Preview/Development kapsamına eklenmedi; kod kapısı ve main'in otomatik Git production kapatması korunur. Önceki tarihli “env boş/onay yok” kayıtları hazırlık anını anlatır. Bu sürüm onayı gelecek production yayınlarına sınırsız yetki vermez.

Yeni Production READY ve herkese açık HTTPS yanıtlarında production CSP, nosniff/DENY/Referrer/Permissions doğrulandı; Preview Toolbar dış origin'leri production'da yoktur. Gömülü GLB dokuları için connect-src blob: gerekir ve korunur. Gerçek tarayıcıda altı model/yazıcı, mobil süreç, menü odağı ve WebGL/JS yokluğu fallback'i geçti. Altı rota, üç beklenen 404, robots/sitemap, görsel ve HTTPS/www yönü kontrolleri tamamlandı. Eski proje silinmedi; geri dönüş kaydı [deployment.md](deployment.md) içinde.

Bu turdaki Gitleaks Git geçmişi, son client çıktısı ve Production build loglarında sıfır bulgu verdi; raporlar yüzde 100 redaksiyonlu ve Git dışında. Kaynak içerikleri önceki kabulden beri değişmedi; önceki tam kaynak taraması kaydı korunur. Runtime npm audit 0; dev braces zinciri 5 high ile upstream takip maddesi olarak sürer. Force downgrade uygulanmadı. Kanıtlar ve emüle tarayıcı/gerçek telefon ayrımı [progress.md](progress.md) içinde.

## 1. Tehdit modeli

İlk sürüm statik bir tanıtım sitesidir. Kullanıcı hesabı, ödeme, form gönderimi, veritabanı veya özel API olmadığı için ana riskler şunlardır:

- Yanlışlıkla kaynak koda veya Git'e gizli değer eklenmesi
- Güvensiz harici bağlantı veya içerik kaynağı
- Aşırı geniş Content Security Policy
- Üçüncü taraf scriptleri üzerinden takip veya tedarik zinciri riski
- Hatalı GLB/görsel dosyasının performans ya da görüntüleme sorununa yol açması
- Preview ile Production ortamlarının karışması

## 2. Herkese açık ve gizli değerler

Herkese açık değerler:

- Mağaza URL'si
- Instagram profil URL'si
- Ziyaretçinin tıklayacağı WhatsApp URL'si/numarası
- Ürün fotoğrafı ve GLB yolları
- Site adı, açıklaması ve sosyal medya metadata'sı

Gizli değerler:

- API anahtarları
- E-posta servis anahtarları
- Ödeme veya webhook sırları
- Vercel erişim token'ları
- Yönetici parolaları
- Özel depolama imzalama anahtarları

İlk sürüm gizli değer gerektirmemelidir. İleride gizli değer gerektiğinde yalnızca sunucu tarafında kullanılacaktır.

## 3. Ortam değişkenleri

- Yerel değerler `.env.local` içinde tutulur ve Git'e eklenmez.
- Repoda sadece örnek anahtarları içeren `.env.example` bulunur.
- `NEXT_PUBLIC_*` değişkenleri derleme sırasında tarayıcı paketine girer; burada yalnızca gerçekten herkese açık değerler bulunabilir.
- Gizli değişkenler Vercel Dashboard üzerinden Development, Preview ve Production kapsamları ayrılarak tanımlanır.
- Gizli değerler dokümana, ekran görüntüsüne, test fixture'ına veya hata loguna yazılmaz.
- Bir değerin sızdığından şüphe edilirse dosyadan silmek yeterli değildir; değer iptal edilir, yenilenir ve Git geçmişi incelenir.

## 4. Tarayıcı güvenliği

Production için minimum başlık hedefleri:

- `Content-Security-Policy`: script, style, image, font, connect ve media kaynaklarını gereken origin'lerle sınırlar.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `X-Content-Type-Options: nosniff`.
- `Permissions-Policy`: kamera, mikrofon, konum ve kullanılmayan özellikleri kapatır.
- `frame-ancestors 'none'` veya eşdeğer clickjacking koruması.
- HTTPS üzerinden yayın ve güvensiz içerik karışımının engellenmesi.

CSP, geliştirme ve production gereksinimleri ayrılarak hazırlanır. `unsafe-eval` veya geniş wildcard yalnızca belgelenmiş teknik zorunluluk varsa değerlendirilir; production varsayılanı değildir.

## 5. Harici bağlantılar ve kaynaklar

- Kullanıcı tarafından yönetilen URL'ler yalnızca `https:` protokolüne izin verecek şekilde doğrulanır.
- Yeni sekmede açılan bağlantılar `rel="noopener noreferrer"` kullanır.
- WhatsApp mesajı `encodeURIComponent` eşdeğeriyle güvenli biçimde kodlanır.
- Görsel, font ve GLB dosyaları mümkün olduğunca proje içinde barındırılır.
- Üçüncü taraf analytics, chat widget veya script kullanıcı onayı olmadan eklenmez.
- Harici alan adları CSP'ye tek tek eklenir; `*` kullanılmaz.

## 6. GLB ve medya güvenliği

- Sadece güvenilen kaynaktan gelen GLB dosyaları repoya eklenir.
- Dosya uzantısı, boyutu ve tarayıcıda yüklenme davranışı kontrol edilir.
- Modelde gereksiz yüksek çözünürlüklü texture, animasyon veya gömülü veri bırakılmaz.
- Dosya adları kullanıcı girdisinden doğrudan üretilmez; küçük harf, ASCII ve tire kullanılır.
- Model hatası sayfayı çökertmemeli; gerçek ürün için fotoğraf, temsili varlık için aynı modelden üretilmiş render poster fallback'i görünmelidir.
- Tarayıcıya sunulan GLB indirilebilir; env veya dosya adını gizlemek erişim koruması değildir. Üretim ana dosyaları yerine gösterim türevleri yayınlanır.
- GLB içindeki URI, metadata ve harici doku referansları incelenir; beklenmeyen dış istek yapılmaz.
- Seçilen decoder'lar ve varsa HDR ortamları yerelde barındırılır; varsayılan CDN çağrıları ağ kontrolünde doğrulanır. Worker/WASM ihtiyaçları gerçek gereksinim görüldüğünde dar CSP kurallarıyla karşılanır.
- İçerik yayın durumu server tarafında filtrelenir; CSS ile gizlemek taslak veriyi korumaz. public altındaki dosya draft işaretiyle gizlenmez.
- Hero paletleri sabit public yapılandırmadır; sır veya env değişkeni değildir.
- Harici modelin üreticisi, kaynak sayfası, lisans/sürüm, gereken atıf ve değişiklikler kaydedilir. Ticari kullanım kadar public GLB'nin indirilebilir dağıtımı ve optimizasyon izni de denetlenir; sadece “ücretsiz” etiketi yeterli değildir.
- NC/ND/editorial veya çelişkili lisanslı adaylar ayrıca çözülmeden kabul edilmez. Atıf gereken modellerde kaynak/üretici/lisans/değişiklik bilgisi erişilebilir olmalıdır.
- A4 Blade of Chaos kullanıcı tarafından proje kullanımı için onaylandı ve GLB/poster proje `public/` klasöründedir. Kaynak sayfasındaki CC BY 4.0 bilgisi ve sanatçının üçüncü taraf *God of War* konseptlerine ilişkin notu [model kaydında](models.md) ve atıfta şeffaf biçimde korunmalıdır. Kullanıcı onayı hak sahipliğine dair bağımsız hukuki garanti değildir; varlık Orbitart özgün üretimi gibi sunulmaz ve görünür atıf olmadan sayfada yayımlanmaz.
- Kaynak sitenin önizleme fotoğrafı, model lisansıyla otomatik lisanslanmış sayılmaz; izinli modelden kendi render posterini üret.
- Harici modeller ve sentetik tarama aşamaları temsili olarak belirtilir; Orbitart müşteri işi, gerçek tarama çıktısı veya teknik üretim garantisi gibi sunulmaz.
- Müşteri taraması gizli geometri, kişisel veri veya üretim sırrı içerebilir; açık yayın izni olmadan public klasörüne veya dış model servisine yüklenmez.
- Kaynak paketleri incelenmeden otomatik betik/makro çalıştırılmaz. Kaynak dosya, web türevi, lisans belgesi ve yayın kararı ayrı tutulur.

## 7. Secret tarama ve yayın kontrolü

Production öncesi:

1. `.env.local` ve Vercel yerel dosyalarının Git dışında olduğu doğrulanır.
2. İzlenen dosyalarda token, parola, private key ve şüpheli yüksek entropili değer taranır.
3. Git geçmişi, son diff ve build logları incelenir.
4. Client bundle'da gizli değer bulunmadığı doğrulanır.
5. Preview ve Production ortam değişkenleri karşılaştırılır.
6. Güvenlik başlıkları gerçek Preview response'u üzerinden kontrol edilir.
7. Dış bağlantıların HTTPS ve doğru domaine gittiği test edilir.
8. Yayındaki her model/poster için hak kaydı, gereken atıf ve temsili kullanım bilgisi doğrulanır; draft veya gizli kaynak dosyası public çıktıda bulunmaz.
9. Kullanıcı açıkça onaylamadan Production deploy yapılmaz.

## 8. Gelecekte form veya API eklenirse

Bu değişiklik ayrı mimari onay gerektirir. Minimum gereksinimler:

- Sunucu tarafı şema doğrulaması
- İstek boyutu ve oran sınırlaması
- Spam/bot koruması
- Güvenli hata mesajları ve log redaksiyonu
- CSRF/origin değerlendirmesi
- Gizli servis anahtarlarının yalnızca server runtime'da tutulması
- Veri minimizasyonu, saklama süresi ve silme politikası
- KVKK kapsamında açık bilgilendirme ve gerekliyse onay yönetimi

## 9. Faz 5 güvenlik politikası (2026-10-04)

`security-headers.ts` production CSP'sini tüm yanıtlara uygular: self kaynaklar, object/frame/worker/form-action ve frame-ancestors none; eval/wildcard yoktur. Image ve connect blob izinleri gömülü GLB dokuları içindir; ImageBitmapLoader blob URL'ye fetch yapar. Dış decoder, worker, font, analytics veya form servisi eklenmedi.

Statik App Router bootstrap ve Motion stilleri için script/style unsafe-inline istisnası gerekir. Nonce kadar güçlü değildir; statik render korunarak [Next.js nonce'sız CSP yaklaşımı](https://nextjs.org/docs/app/guides/content-security-policy) kullanılır. Kullanıcı içeriği/API eklenirse politika yeniden ele alınmalı. Dev'de HMR için CSP verilmez; Vercel HTTPS build'lerinde upgrade-insecure-requests, yerel HTTP/LAN'da HTTPS zorlaması yoktur. Alan adı geçişi öncesi HSTS preload eklenmedi.

Yalnız Preview'da [resmî Toolbar izinleri](https://vercel.com/docs/vercel-toolbar/managing-toolbar#using-a-content-security-policy) vardır: vercel.live, connect ws-us3.pusher.com, img vercel.com ve font assets.vercel.com. Production bu dış origin'leri içermez. Authentication ve production build kapısı korunur.

Checksum doğrulamalı Gitleaks 8.30.1 ile tüm erişilebilir Git geçmişi, ignore dışı kaynak kopyası ve son .next/static taramasında sıfır bulgu; raporlar yüzde 100 redaksiyonla Git dışı output içinde. Git'te yalnız public örnekli .env.example var; .env.local/.vercel, Blender kaynakları ve yerel kanıtlar izlenmiyor. Vercel env listesi boş; production onayı yok. Örüntü taraması mutlak güvence değildir; kimlik dosyaları dışa gönderilmedi. Build logları/uzak Preview başlık kabulü son kayıtta ayrıca belirtilir.

Runtime audit sıfır; braces geliştirme zincirinin beş high bulgusu ve upstream çözümü açık. Güvenilen repo/lockfile girdileri kullanılır; force downgrade yapılmaz. Hak denetimi mevcut kaynak/atıf kayıtlarını ve kullanıcı kararını korur; bağımsız hak garantisi iddia edilmez.

## 10. Faz 4 Preview sınırı (2026-10-04)

Kullanıcı `esmatyfr/orbitartt` oluşturulmasını ve Preview yayını onayladı; production/alan adı taşıma onayı verilmedi. Authentication koruması açık, Preview noindex ve boş sitemap kullanır. Yayın kapısı Vercel production ortamında ayrı `PRODUCTION_RELEASE_APPROVED=true` olmadan derlemeyi durdurur. İlk yüklemenin beklenmedik production hedefi bu kapıyla durduruldu; sonraki gerçek Preview READY oldu.

`.env.local`/`.vercel` ve yerel kanıt dosyalarının Git ve upload dışında olduğu doğrulandı. CLI kimlik bilgileri/otomasyon erişim anahtarı okunup koda/loglara yazılmadı. Public bağlantılarda HTTPS, yeni sekme rel ve WhatsApp kodlaması test edildi. Bu dar denetim, Faz 5 tam Git geçmişi/client bundle secret taraması veya CSP kabulü değildir.

Audit geliştirme bağımlılığında `braces` üzerinden beş high kaydı gösterdi; çalışma zamanı taraması sıfır bulgu verdi. Yayın öncesi güncel upstream çözümü ve build'e güvenilmeyen pattern girişi değerlendirilmelidir; sürüm düşüren `audit fix --force` uygulanmadı. Alan adı mevcut eski projeye bağlı olduğundan DNS/sahiplik ve geçiş de Faz 5 maddesidir. Kanıtlar ve yayın yöntemi [deployment.md](deployment.md) içinde kayıtlıdır.
