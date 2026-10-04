# Orbiart Güvenlik ve Gizlilik Rehberi

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
