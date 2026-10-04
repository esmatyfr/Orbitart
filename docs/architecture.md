# Orbiart Mimari Rehberi

Revizyon: 2026-10-04. Faz 2A–2E ve Faz 3 kod düzenini açıklar; doğrulama ve açık cihaz/kullanıcı kabulü [progress.md](progress.md) içindedir. Altılı hero, yakın inceleme, seçim/tema, kontrollü yükleme ve çalışan FDM yazıcılı beş aşamalı süreç animasyonu uygulandı.

## Sistem sınırı ve sayfa düzeni

Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber/Drei ve Framer Motion; hedef Vercel. Backend, CMS, veritabanı, ödeme ve sitede fotoğraftan 3D üretim yoktur. Faz 2'nin mevcut bölüm sırası [hero-design.md](hero-design.md) içindedir: hero → iki hizmet yönlendirmesi → Taramadan Üretime → 1+4 gerçek fotoğraf → çalışma süreci → iletişim. Faz 3'te iki yönlendirme seçili modelin “Neler Yapıyoruz” inceleme alanına taşındı; kartlar tek kopyadır. Beş tanıtım rotası korunur; model atıfları Hakkımızda'dan ayrı statik /model-kaynaklari sayfasına taşınmıştır. Hero bağlantıları ve Footer'daki küçük Model kaynakları bağlantısı bu sayfaya gider.

## İçerik ayrımı

- products.ts: Orbitart'ın gerçek ürün/fotoğraf kayıtları. ProductStatus draft/review/published; fotoğraf yayını GLB gerektirmez. Ürün satış yayını ve fotoğraf portföyü ayrı onaylardır.
- showcase.ts: onaylanan 30 fotoğrafın açık slug listesi. Yalnız temel fotoğraf alanları galeriye geçer; yeni taslak ürün otomatik gösterilmez.
- model-assets.ts: hero varlık kimliği, adı, model/poster yolu, kaynak, hak/teknik/yayın durumları. processPrinterAsset özgün, kullanıcı seçimi onaylı süreç aksesuarını ayrı kaydeder; altılı hero listesine eklenmez.
- Harici varlık yalnızca hizmet görselleştirmesidir; zorunlu productSlug/storeUrl taşımaz, gerçek ürüne uydurma fotoğraf eşleşmesi yapılmaz. Gerçek Orbitart varlığı isterse doğrulanmış productSlug referansı taşır; ortak medya kopyalanmaz.
- hero-showcase.ts: altı benzersiz assetId; üç teknik ve üç yaratıcı slot; hizmet etiketi, kısa açıklama, sıra ve elle belirlenmiş palet. Seçim yalnız hero katmanlarını, CTA ve 3D vurgu rengini değiştirir.
- scan-process.ts: sabit A1 teknik assetId, beş aşama metni ve statik posterler. İlk üç poster A1 geometrisinden; yazıcı/sonuç posterleri Blender kaynağından üretilir. Hero seçimi süreç modelini değiştirmez.
- scenes.ts: ortak kamera, nötr ana ışık, yatay hat/süreç görünümü ve model sunum dönüşümleri.
- service-paths.ts: iki hizmet yönlendirmesi ve Hizmetlerimiz içindeki aynı kimlikli anchor içerikleri.
- site-config.ts: public mağaza ve sosyal bağlantılar ile model kaynakları sayfasının dahili yolu. sourceKind ile ürün sahipliği, status ile yayın, teknik hazırlık ve lisans onayı birbirinden ayrı kararlardır.

Yayın filtresi server tarafındadır. Hero için publicationStatus published + rightsStatus approved + technicalStatus approved + geçerli model/poster + kullanıcı model seçimi gerekir. Altı farklı varlık ve 3+3 slot dağılımı doğrulanır. Kullanıcının teknik/yayın onayından sonra altı kayıt 2026-10-02'de production 3D filtresinden geçer; fallback yeteneği korunur. Bu filtre public dosyaları gizlemez. Aday model seçimi tek başına teknik/yayın onayı değildir.

## Hedef klasör sorumlulukları

- src/app: beş tanıtım rotası ve statik model kaynakları rotası, metadata ve Server Component metin/bağlantıları.
- src/components/layout: Navbar, Footer.
- src/components/ui: iki hizmet kartı, semantik süreç adımları, HTML kontroller, bağlantılar, hareketler.
- src/components/products: mevcut gerçek fotoğraf vitrinleri.
- src/components/three: ortak deneyim yöneticisi, Canvas, hero model hattı, süreç görünümleri ve yükleme/hata sınırları.
- src/content: products.ts, showcase.ts, site-config.ts, model-assets.ts, hero-showcase.ts, scan-process.ts, scenes.ts ve service-paths.ts.
- src/types: ürün, sahne ve model-asset tipleri; hero.ts gerekirse sonraki adımdadır.
- src/lib: seçim hesabı (hero-selection.ts), sınırlı yükleme ve performans örnekleme (model-loading.ts).
- public/images/products ve public/models/products: gerçek ürün varlıkları.
- public/images/showcase ve public/models/showcase: altı hero posteri, beş aktif süreç posteri, altı hero GLB'si ve yalnız süreçte kullanılan bir FDM yazıcı GLB'si.
- scripts/render-process-posters.mjs: A1 geometrisinden çevrimdışı deterministik poster üretimi; tarayıcıda çalışmaz, dış servis kullanmaz.
- tests/: seçim, kuyruk, model kaynakları ve veri testleri; build-smoke.mjs üretilen HTML içeriğini denetler, görsel/WebGL testinin yerine geçmez.
- docs/models.md: güncel model dosyaları, hak durumu ve teknik kabul kapısı. Eski aday/Blender kayıtları docs/archive altındadır.

Hedef dosyalar henüz mevcutmuş gibi raporlanmaz.

## Mevcut koddan geçiş — Faz 2A

PublishedProduct modeli GLB'yi isteğe bağlı tutar. Fotoğraf portföyü onaylı 30 slug'dan oluşur; ürünün mağaza yayını `draft` kalabilir. Model varlıkları ayrı kayıt ve yayın filtresine sahiptir.

1. Onaylı 30 fotoğrafı editoryal listede tut; ürünlerin satış durumunu topluca değiştirme.
2. Satış ürünü ve temsili GLB kaydını ayrı yönet; model için hak, teknik ve yayın filtrelerini koru.
3. Altı GLB'nin aktarım, üçgen, draw call ve doku belleği tahminini [models.md](models.md) içinde izle; gerçek cihaz ölçümü sahne kurulduktan sonra yapılır.
4. Hero paletini yalnız giriş bölümünde uygula. Hero sonrası mevcut koyu mor marka teması devam eder.

## Client/server ve 3D yaşam döngüsü

Yayın filtresi, hizmet kartları, fotoğraf seçkileri ve beş HTML süreç adımının poster/açıklamaları Server Component katmanındadır. Yalnız ProcessStepControl düğmeleri küçük client sınırıdır; HomeExperience içindeki ProcessStepControls context'i seçili aşamayı ve seçim callback'ini sağlar. Sunucudan callback geçirilmez. HomeExperience client sınırı hero metni/CTA'larını da sunucu HTML'sine işler; seçim, görünürlük ve dinamik SharedCanvas yüklemesini yönetir. Three/Drei yalnız dinamik sahne modüllerinde runtime import edilir. Diğer sayfalara 3D paketi taşınmaz.

Fotoğraf akışı: products → açık editoryal onay listesi → gerçek fotoğraf seçkisi. Satış ürün akışı ayrı `published` filtresini kullanır.
3D akışı: model-assets → yayın/lisans/teknik filtre → hero-showcase veya scan-process → poster/HTML → ortak Canvas görünümleri.

Sayfada bir Canvas ve bir renderer; hero/hizmet akışı ve süreç DOM alanları view/scissor yaklaşımıyla çizilir. Görünmeyen sahne durur. SharedCanvas yaşam süresince GLTF sahnelerini tutar; A1 hero/süreç arasında geometri ve dokuları paylaşır. Global useGLTF önbelleği yoktur. Bir bölüm kapanınca diğerinin kaynağı silinmez. Sayfa çıkışı, yeniden deneme veya poster fallback'inde istekler iptal edilir; sahip olunan geometri, materyal, doku ve ImageBitmap kaynakları temizlenir.

İlk poster/başlık/CTA 3D beklemez. Önce A1 yüklenir; hero yakın görünürlük alanındaysa kalan beş model en fazla iki eşzamanlı işlemle yüklenir. Yalnız süreç görünüyorsa A1 yeterlidir. Altı model hazır olmadan tam hat açılmaz. Dosya başına 25 sn, görünür hero hazırlığı için 45 sn bekleme sınırı vardır; HTTP/parse hatası, WebGL2 yokluğu veya context kaybında posterli seçim ve açık yeniden deneme sunulur.

Çizim normalde demand, kaydırmada View hizası için geçici always, iki alan görünmezken veya sekme gizliyken never'dır. Kesintisiz hareket sırasında 50 ms'yi aşan yavaş kareler izlenir: 30 örnekte DPR üst sınırı 1, ardından 90 örnekte poster fallback'i. Hızlı kareler sayacı azaltır; boşta geçen süre yavaş kare değildir. Bu eşikler başlangıç korumasıdır, cihaz FPS kabulü değildir. Dokunmada dikey hareket serbesttir; pointer-cancel/lost-capture/gizli sekme yatay hareketi güvenli seçime döndürür.

## Hareket ve responsive sınırları

Seçim model hattındaki konum, derinlik ve ölçeği yönetir; hedef indeks ref içinde, yerleşmiş duyuru ayrı state içindedir. Oklar, modele tıklama, yatay sürükleme ve odaklı klavye tek seçimi besler; numaralı seçiciler kaldırılmıştır. İlk hero sahnesinde tüm modellerin altında seçimden ve ekran boyutundan bağımsız sabit boyutlu tek parlak siyah platform ve modellerle arasında hava boşluğu vardır; hafif yüzey parıltısı, gerçek geometri/doku aynalaması yerine düşük maliyetli yansıma hissi sağlar. Platformdan yukarı vurgu ışığı verilir; süreç sahnesinde platform yoktur. Faz 3'te kaydırmayla büyüyen model inceleme alanı, model dönüşü, aynı alandaki bilgi + iki hizmet kartı ve süreç animasyonu uygulandı; açık kabul kontrolleri progress.md içindedir. Seçim, model dönüşü ve scroll aynı transform'a bağımsız yazmaz. Sabit hero CTA'ları /iletisim ve genel mağaza adresidir; stok model satış ürünü olarak bağlanmaz.

Mobilde dikey scroll korunur; yatay sürükleme hero seçer. Hero ve süreç mobilde de kaydırmaya bağlı sticky sunum kullanır; reduced-motion ve fallback normal belge akışına dönerek statik açıklamalara erişimi korur. Tarama gösterimi gerçek nokta bulutu ölçümü, parametrik CAD dönüşümü veya üretim doğrulaması değildir.

Eski her ürüne fotoğraf+GLB ikili görünüm, zorunlu üç stüdyo ve serbest zoom ilk sürüm kapsamı değildir. Mevcut SceneId değerleri kod geçişine kadar korunur.

## Faz 3 hareket sahipliği ve kaynaklar

ProcessCamera yalnız süreç View'inin en/boy oranı scenePresets.process.minimumViewAspect (1) altına düştüğünde bakış hedefinden orantılı uzaklaşır; 1024px gibi dar masaüstü kolonunda çark kesilmez. Hero kamerası, model ölçeği ve geniş süreç kadrajı değişmez.

motion.ts giriş mesafesi/süresi, paralaks, inceleme büyümesi ve 1800 nokta bütçesini; scroll-presentation.ts sınırlı bölüm ilerlemesini, beş aşama sınırlarını ve baskı pozunu merkezileştirir. HomeExperience scroll/parmak/klavye olaylarını ref değerlerine yazar; her kare React state güncellemez. SharedCanvas'ın renderer seviyesindeki wake ref'i hero görünmezken de süreç girişini çizdirir. İki DOM View aynı Canvas'ı kullanır; model yükleme kuyruğu hero görünürlüğünde devam eder.

AnimatedProcessModel A1'in tüm mesh dönüşümlerini geçici üçgen geometrisine uygular, MeshSurfaceSampler ile alan ağırlıklı yüzey örnekler; geçici geometrisini hemen temizler. Noktalar tek kuruluma aittir. Süreç kendi materyallerini klonlar; tel kafes/opacity hero materyallerini değiştirmez. AnimatedFdmPrinter aynı A1 kaynak geometrisini paylaşır; ayrı polimer materyali, clipping düzlemi ve bir kez hazırlanan dolu üst katman geometrisini sahiplenir. Yazıcı GLB'si yalnız süreç görünürlüğünde bir kez yüklenir; download abort/timeout ve disposal aynı sayfa sahibindedir. Kamera baskıda geri çekilir, sonuçta parçaya döner. Scroll baskı yüksekliğini, geçen süre yalnız temsili kafa hareketini yönetir; sürekli invalidate yalnız görünür/aktif baskı sırasında çalışır. Gizli View ve arka plan sekmesi çizilmez. Reduced-motion kamera/kafa hareketini kapatır; beş HTML adımı normal akışta kalır. Fallback/yeniden deneme/sayfa çıkışında tüm sahip olunan kaynaklar temizlenir.


### 2026-10-02 aynı sahne revizyonu

İlk Faz 3 inceleme View'i kaldırıldı. HomeExperience hero-story içindeki tek sticky hero-screen, mevcut heroTrack ve üç data-story-card katmanını yönetir. heroStoryPose, storyCardPose ve stickyProgress deterministik scroll aralıklarını verir. Aynı HeroScene modelin büyüme/yerleşme/dönüşünü, komşuların uzaklaşmasını ve ortak platformun çekilmesini yönetir; kopya model sahnesi yoktur. scenePresets.hero focusScale/mobileFocusScale/focusCenter/focusTargetY değerlerini merkezileştirir; uzun modellerin focusScale sınırı modelPresentation içinde tutulur. Masaüstü yakınlaşmada modelin bir kez ölçülen merkezi ekran hedefinden kamera düzlemine projekte edilir. Canvas görünürlüğü yine hero ve süreç View'iyle sınırlıdır. Reduced-motion, enable3D=false veya fallback'te dataset'ler statik moda döner; inert kartlar açılır. Kullanıcının bu revizyonu dar ekran scroll sunumunu da kapsar; önceki mobil düğme/normal sahne yaklaşımının yerini alır.

Süreçte kart tıklaması processStageScrollTop ile mevcut stickyProgress hesabının seçilen aralığına native smooth scroll yapar; ayrı ve scroll ile çelişen animasyon state'i yoktur. Enter/Space aynı düğme davranışını kullanır, aria-pressed scroll aşamasından gelir. Statik modda kart yalnız poster seçer; normal scroll bu seçimi sıfırlamaz. Reduced-motion örnekte statik 3D numuneyi gösterebilir; başka kart seçilince süreç View'i gizlenerek ilgili poster açılır. Beş poster/açıklama her modda HTML'de kalır. Model üzerindeki tekrar aşama etiketi kaldırılmıştır.

Kart yığını revizyonu: storyCardPose girişten sonra opacity=1 durumunu korur. CSS data-story-card indeksine göre z-index ve basamak konumunu belirler. HomeExperience örtülen veya henüz gelmeyen kartları inert yapar; statik modda tamamını açar. Sayfanın tek h1 başlığı hero-cards-heading içinde bulunur; başlangıç seçim kontrollerinde görünür model adı yoktur, canlı duyuru korunur.

Hero giriş hizası: HomeExperience scroll/resize güncellemesinde heroTrack ve seçim okunun bounding rect değerlerini ölçerek presentation.platformNdcY refine yazar. HeroScene yeniden DOM ölçümü yapmadan bu hedefi kamera üzerinden platform düzlemine projekte eder; aynı ofset ilk model hattını ve spot ışığını taşır. Mobil giriş ölçeği, başlangıç model kaldırması, platform ölçeği ve geniş ekran slot çarpanı scenePresets.hero içinde tutulur. Üçüncü View veya renderer eklenmez.

Alt bölüm girişleri: ProductShowcase server bileşenindeki scrollReveal prop'u ana sayfanın 1 büyük + 4 küçük fotoğrafını iki Reveal sınırına ayırır. Mevcut 12 kolonlu mozaikte büyük görsel 5, sağ grup 7 kolon kaplar; sağ grubun içi mevcut 3+4 kolon oranını korur. Nasıl Çalışıyoruz ve iletişim server içeriği fade yönündeki Reveal içine verilir. Reveal Framer Motion useInView / animation controls ile ilk girişte bir kez çalışır; süre/mesafe/easing motion.ts içindedir. initial=false ile SSR HTML görünür kalır, hazırlık yalnız hydration sonrasında yapılır; reduced-motion CSS'i görünürlük/transform'u güvenceye alır ve odak alınan içerik anında açılır. İlk üç onaylı 3D bölümün kod ve ayarları bu kapsamda değiştirilmez.

2026-10-03 alt sayfa kapsamı: /vitrin ve Hakkımızda grid seçkileri scrollReveal ile fotoğraf başına bir Reveal kullanır. Aspect oranı sarmalayıcıda, figure h-full içinde tutulur; Server Component fotoğrafları client sınırına children olarak verilir. staggerIndex, giriş anında parent grid'in gerçek kolon sayısına göre yalnız o satırın kısa gecikmesini hesaplar; sayfanın 30 fotoğrafı tek sıraya bağlanmaz. secondary motion profili mobilde daha küçük mesafe kullanır; ana sayfanın default değerleri korunur. Hover vurgusu yalnız bu grid dalındadır, 320px caption font/padding ve reduced-motion scale kuralı da bu opt-in dalıyla sınırlıdır. PageHero server bileşeni optional eyebrow, compact ve animated seçenekleriyle genişletildi; compact yalnız /vitrin kullanır, diğer giriş ölçüleri ve /iletisim varsayılanı aynı kalır. Hakkımızda yaklaşım/değerler ve hizmet kartları yalnız küçük Reveal sınırları ekler; anchor id ve semantik HTML korunur.
