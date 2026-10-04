# Ana sayfa 3D tasarım sözleşmesi

Karar tarihi: 2026-09-28; yatay sergi hattı ve tek platform revizyonu: 2026-10-01. Kullanıcı dairesel modeli kaldırıp Ciao Energy referansındaki merkez/yan model düzenini seçti. Faz 2'de tek ortak platform ve hero zeminiyle bütünleşik sahne uygulanır; son tarayıcı/cihaz kabulü [progress.md](progress.md) içindedir. Kaydırmayla büyüyen model, bilgi kartları ve süreç animasyonu 2026-10-02 Faz 3 onayıyla uygulandı; yerel kanıt ve açık kullanıcı/cihaz kabulü progress.md içindedir.

## Amaç ve referanslar

Kullanıcının çizimi kompozisyonun ana kaynağıdır. Moto'nun başlık–ürün–buton sırası, Ciao Energy'nin merkez/yan model seçimi, Red Bull'un ürüne bağlı renk hissi ve Lusion örneğindeki bölüm geçişleri görsel referanstır. Referansların kodu, modeli veya görselleri kopyalanmaz.

- https://www.moto-card.com/
- https://www.redbull.com/tr-tr/energydrink/products/red-bull-energy-drink
- https://lusion.co/
- https://www.ciaoenergy.com/

## Sabit sayfa sırası ve marka dengesi

Orbitart; tarama, tersine mühendislik, teknik parça üretimi ve yaratıcı üretimi birlikte anlatır. Faz 2'de çalışan statik sayfa sırası:

1. Mevcut Navbar.
2. Ortalanmış başlık ve altı modelli yatay sergi hattı.
3. Teknik Çözümler ve Yaratıcı Üretim yönlendirmeleri.
4. Taramadan Üretime: beş aşamalı görsel anlatım; dijital modelden sonra çalışan FDM yazıcı, ardından tamamlanan parça.
5. Mevcut 1 büyük + 4 küçük gerçek fotoğraf vitrini.
6. Çalışma süreci: proje ihtiyacı, değerlendirme/onay, teslim.
7. İletişim çağrısı ve ortak Footer.

Eski üç hizmet kartı ana sayfada iki yönlendirmeye dönüştü; ayrıntılar Hizmetlerimiz sayfasında kaldı. Teknik Çözümler /hizmetlerimiz#teknik-cozumler, Yaratıcı Üretim /hizmetlerimiz#yaratici-uretim hedeflerini kullanır; bu anchor'lar Faz 2E'de eklendi ve üretim HTML'inde doğrulandı. Hakkımızda seçkisi ve /vitrin fotoğrafları korunur; boş teknik portföy veya uydurma müşteri işi eklenmez.

Altı slot: teknik bağlantı parçası, marin parçası, prototip/muhafaza, yaratıcı/fantastik obje, dekoratif obje ve heykel/taranmış sanatsal obje. A4, kullanıcının onayladığı Blade of Chaos modelidir; kaynak/lisans atfı model kaydında tutulur ve arayüzde görünür olmalıdır. 2026-10-02 kullanıcı teknik/yayın onayıyla altı model production filtresinden geçer; A4 atfı ve üçüncü taraf hak notu korunur. Tarama bir obje kategorisi değil yöntemdir; teknik ve yaratıcı nesnelere uygulanabilir. Seçim sırası hero-showcase.ts `order` alanından gelir; ilk seçim teknik bağlantı parçasıdır.

Düzen sabittir. Model değiştirmek slotun dosya/palet ayarıdır; sayfa mimarisini yeniden açmaz. Yeni bölümler veya farklı model sayısı açık kapsam değişikliği olarak ele alınır.

## Kompozisyon

1. Mevcut logo, menü ve Mağazaya Git bağlantısı korunur. Çizimde menünün gösterilmemesi menüyü kaldırma kararı değildir.
2. Navbar altında ince vurgu çizgisi ve aşağı doğru sönen hafif renk yayılımı bulunur. Hero dışına çıkıldığında navbar normal marka görünümüne döner.
3. Üstte ortalanmış kısa başlık, gerekirse tek satırlık açıklama bulunur. Mevcut marka metni başlangıç varsayılanıdır; yeni slogan kesinleşmiş değildir.
4. Altında geniş 3D alan: merkezde büyük aktif model, iki yanda giderek küçülüp gerileyen komşular. Karşı sıradaki model çizilmez; sahnede dairesel iz yoktur.
5. Koyu kutu/çerçeve yoktur; modeller hero bölümünün kendi renkli zemini üzerinde görünür. Altı modelin altında yalnız hero sahnesinde, seçili modele yaklaşık görsel genişlikte küçük, parlak siyah ortak platform vardır; boyutu model değişimi ve ekran genişliğiyle değişmez. Alçak katmanlı kaide, ince renkli kenar ve hafif yüzey parıltısı sergi hissi verir; gerçek zamanlı model aynalaması kullanılmaz. Platformdan yukarı ölçülü vurgu ışığı yükselir. GLB tabanları platforma değmez; arada küçük ama görünür boşluk kalır. Süreç sahnesinde bu platform yoktur; kaynak modelin kendi kaidesi değiştirilmez.
6. Aktif model adı, hizmet etiketi ve önceki/sonraki HTML kontrolleri sahnenin altında yer alır. Sahne köşe etiketi, 01/06 sıra metni ve altı numaralı yuvarlak seçici gösterilmez. Ekran okuyucu duyurusu, klavye, yatay sürükleme ve yan modele tıklama korunur. Harici model için görünür “Temsili hizmet görselleştirmesi” bilgisi ve atıf bağlantısı bulunur.
7. Sabit iki HTML CTA: birincil Projenizi Konuşalım → /iletisim; ikincil Mağazaya Git → merkezi mağaza URL'si. Genel mağaza bağlantısı temsili modelin satıldığı izlenimini vermemelidir; modelden otomatik ürün satın alma hedefi türetilmez.

Kısa ekranlarda başlık/sahne/buton zorla tek ekrana sıkıştırılmaz. Başlık veya butonun Canvas üzerine binmesi kabul edilmez. Mobilde aynı dikey sıra korunur; sahne alanı merkez ve yakın komşulara odaklanır.

## Yatay sergi hattı ve etkileşim

- Normal deneyimde tek Canvas içinde altı gerçek GLB bulunur; seçime göre konumlar tek yatay eksen üzerinde hesaplanır. Canvas teknik renderer olarak kalır, kullanıcıya ayrı bir koyu panel gibi görünmez.
- Merkez model en önde ve en büyüktür. Komşular daha geniş aralıkla iki yana açılır, uzaklaştıkça küçülür ve geriye çekilir; karşı uç görünmez. Modeller önceki statik düzene göre biraz büyüktür. Altı modelin aynı anda eksiksiz görünmesi şart değildir.
- Her modelin hattaki konumu ve sunum yönü ayrı hesaplanır; merkezdeki ürün kullanıcıya dönük olur. Yerleşim düzeltmeleri kaynak modelin üretim ölçülerini değiştirmez.
- İleri/geri HTML butonları, odaktayken yön tuşları, yan modele tıklama ve yatay sürükleme aynı hedef seçimine bağlanır. Bırakıldığında en yakın ürün konumuna yerleşir.
- Varsayılan sürekli autoplay yoktur. İlk giriş ve seçim hareketlidir. Autoplay daha sonra eklenirse duraklatma ve etkileşimde durma zorunludur.
- Başlangıç seçim geçişi hedefi 0,7–1 saniyedir; gerçek modellerle ayarlanır.
- Hızlı girişlerde sınırsız animasyon kuyruğu oluşmaz: son hedef tutulur, hareket kontrollü yeniden hedeflenir. İndeks çevrimi 6'dan 1'e ve ters yönde test edilir.
- Yerleşmiş aktif ürün ile hareket hedefi ayrı tutulur. Metin, renk ve bağlantı tek seçim akışından türetilir; yanlış ürüne ait CTA gösterilmez.
- Faz 2 hero'sunda sürükleme ürün seçer; serbest OrbitControls aynı harekete bağlanmaz. Yakın inceleme ve modelin kendi ekseninde çevrilmesi yalnız Faz 3'te, ayrı etkileşim durumunda uygulanır.

## Renk sözleşmesi

Her varlığa elle belirlenen palet atanır. Tarayıcıda otomatik renk çıkarımı yapılmaz. hero-showcase.ts assetId, hizmet etiketi, kısa açıklama, sıra ve başlangıç paletlerini tutar; model adı, medya ve kaynak bilgileri model-assets.ts kaydından gelir. Harici modeller products.ts içine sahte satış ürünü olarak eklenmez.

Palet alanları: `background`, `accent`, `glow`, `buttonBackground`, `buttonText`. Değerler doğrulanmış sabit renklerdir; env/gizli değer değildir. CSS değişkenleri hero arka planı, çizgi, seçim göstergesi ve butonu besler; aynı palet 3D vurgulara aktarılır. Aynı renkler CSS ve TS içinde ayrı ayrı çoğaltılmaz.

Palet etkisi yalnız ana sayfanın hero `<section>` sınırındadır. Model değişince hero zemini, vurgu ve sahne ışığı değişir; `:root`, `body`, navbar ve sonraki bölümlerin marka renkleri değiştirilmez. Hero'nun alt kenarında seçili model rengi koyu mor ana zemine kısa bir geçişle söner. Aşağı kaydırılan bölüm ve geri kalan sayfa her seçimde mevcut Orbitart mor temasını kullanır; yukarı dönüldüğünde seçili modelin paleti hero'da korunur. Bu etkileşim Faz 2C'de uygulandı.

İki arka plan gradyan katmanının saydamlık geçişi başlangıç yaklaşımıdır. Büyük sürekli blur animasyonları ve zorunlu post-processing kullanılmaz. Ana ışık nötrdür; gerçek materyal rengi korunur. Her paletin normal/hover/focus kontrastı doğrulanır.

## Hareket sahipliği

- Ürün seçimi: yatay konum, uzaklığa bağlı ölçek/derinlik ve model yönleri.
- Fare: küçük kamera paralaksı; yalnızca uygun işaretçi cihazında, sürükleme sırasında azaltılır.
- Scroll: hero'dan çıkış ve sonraki bölümler; seçilen modeli değiştirmez.
- Tema: arka plan katmanları ve vurgu ışığı; seçimle eşzamanlıdır.

Frame bazlı 3D güncellemeler React state'i her kare yeniden render ettirmeden yürütülür. HTML arayüzü seçim gibi anlamlı olaylarda güncellenir. Telefon için fare paralaksı veya sensör izni istenmez; dikey dokunma doğal sayfa kaydırmasıdır.

## Yükleme ve hata durumları

1. Server çıktısı başlık, ilk modelin posteri, sabit boyutlu sahne alanı ve kullanılabilir mağaza bağlantısını gösterir.
2. Dinamik 3D paketi yalnızca ana sayfa deneyim sınırında yüklenir. İlk model önceliklidir, kalan beş model sınırlı eşzamanlı yüklenir.
3. İlk model gösterilebilir; tam hat altı model de hazır olduğunda açılır. Hazır olmayan ürünü boş 3D alanla seçtirme.
4. Bir model yüklenemezse altı ürün arasında HTML kontrollerle gezilen poster fallback'i sun; sonsuz spinner bırakma. Yeniden deneme açık kullanıcı eylemiyle yapılabilir.
5. WebGL yokluğu, context kaybı veya kalıcı düşük performansta aynı poster deneyimi kullanılır. Model başarısızlığı bütün sayfayı çökertmez.
6. Hero görünmezken veya sekme arka plandayken çizim durur. Geri dönüşte seçili ürün korunur; sayfa ayrılışında kaynaklar kontrollü temizlenir.

Fallback dışında normal altı modelli tasarım tek aktif modele sessizce indirgenmez. Posterli sürümde de isim, seçim ve mağaza bağlantısı çalışır.

## Taramadan Üretime sözleşmesi

Faz 2E'de hazırlanan dört adım, kullanıcının 2026-10-02 FDM yazıcı seçimiyle Faz 3'te beş adıma genişletildi. Güncel adımlar:

1. Fiziksel parça / numune: nesnenin normal yüzeyi.
2. Tarama verisi: yüzeyden örneklenmiş nokta görünümü ve sınırlı tarama bandı.
3. Dijital model: aşama boyunca tel kafes, ölçü değerlendirmesinin metinsel açıklaması.
4. 3D baskı: markasız FDM yazıcı, hareketli baskı kafası/ray ve tabla üzerinde dolu katmanlarla oluşan çark.
5. Üretim sonucu: yazıcı çekilir; aynı çark lavanta polimer yüzeyi ve katman izleriyle büyüyerek ayrı gösterilir.

Çarkın görünümleri aynı A1 GLB'den türetilir. Yalnız süreç için özgün, markasız yazıcı aksesuarı eklenir; hero altılı kalır. Yazıcıya yakın görünürlükte tek yükleme yapılır. Bu bölüm “Sürecin temsili gösterimi” olarak sunulur. Mesh'ten türetilen noktalar cihazdan alınmış nokta bulutu değildir; wireframe açılması tersine mühendislik veya CAD onarımı yapmaz. Render malzemesi doğrulanmış üretilmiş parçanın fotoğrafı, kafa hareketi çalıştırılabilir makine yolu değildir.

Model vertex yoğunluğunu doğrudan noktaya çevirmek yerine yüzeyden sınırlı sayıda örnek alınır; her kare yeniden üretilmez. Raster/PBR yüzey, tel kafes ve noktalar kontrollü geçişle görünür; gereksiz tam model kopyaları ve sürekli ağır shader kullanılmaz.

Masaüstü ve mobilde doğal scroll içinde sticky sunum kullanılır; scroll yakalama/kilitleme veya kendiliğinden kaydırma yoktur. Kullanıcının kartı tıklaması ya da Enter/Space ile seçmesi, o aşamanın iç konumuna native smooth scroll yapar; animasyon ve aktif kart mevcut scroll kaynağından türetilir. Sonraki doğal kaydırma aynı akışta devam eder. Reduced-motion, WebGL yokluğu, JS yüklenmemesi veya hata halinde beş açıklama ve statik posterler normal belge akışında erişilebilir kalır; JavaScript varsa kart seçimi ilgili posteri hareket olmadan gösterir.

Tek paylaşılan Canvas/renderer hero ve süreç alanlarına görünürlük bazlı view/scissor uygular. Sayfa ömürlü asset sahipliği GLB indirmesini tekrar etmez; görünmeyen yatay hat render edilmez. İki alan aynı anda görünürse sınırlı çizim ve kalite bütçesi uygulanır. Paylaşılan geometry/texture, diğer bölüm kullanırken dispose edilmez; sahiplik sayfa seviyesindedir. Bir bölümün yükleme hatası HTML akışı engellemez.

Gerçek tolerans, su/UV dayanımı veya yük taşıma garantisi afişten genellenmez. Metal görünümlü marin model, firmanın metal/sertifikalı güvenlik parçası ürettiği iddiası değildir. Müşterinin doğruladığı bilgiler hizmet metnine alınır.

## Performans ve kabul ölçümleri

Dosyaların varlığı performans sonucu veya garanti değildir. Aşağıdakiler prototip hedefidir; cihaz/bağlantı ölçümleri `models.md` ve `progress.md` içine yazılır.

- İlk altı modelin toplam aktarımı için başlangıç hedefi en fazla yaklaşık 12 MB; aşılırsa optimizasyon ve yeniden ölçüm yapılır. Bu toplam 3D paket/HDR/decoder maliyetini içermez; onlar ayrıca raporlanır.
- Bütçe hero ve süreçte kullanılan tüm benzersiz 3D varlıkları kapsar; aynı varlık tekrar indirilmez. Kullanıcının 2026-10-02 isteğiyle yedinci varlık yalnız süreçteki 198.064 B'lık yazıcı aksesuarıdır; hero seçimine eklenmez.
- Hero/süreç ortak renderer, yükleme sırası, posterler, görünürlük değişimi ve kaynak paylaşımı birlikte test edilir.
- Model başına MB tek başına kabul ölçütü değildir. Altı modelin toplam üçgeni, draw call, materyal sayısı ve açılmış doku belleği kaydedilir. Arkada örtülen modelin maliyeti sıfır sayılmaz.
- Başlangıç dokuları genellikle 1K–2K; daha yüksek çözünürlük görsel ihtiyaçla gerekçelendirilir. Uzak modellerde LOD, düşük mobil DPR ve sade gölge değerlendirilir.
- Test edilen orta sınıf telefonda yaklaşık 30 FPS, uygun masaüstünde 60 FPS hedeflenir. Geçişlerde uzun takılmalar ve artan bellek kullanımı ayrıca ölçülür.
- Soğuk yüklemede poster/metin GLB beklemeden görünmeli. İlk model ve tam yatay hattın hazır olma süreleri ayrı kaydedilmeli.
- Mobil ağ/CPU yavaşlatma, hızlı 20 seçim, sayfadan çıkış/dönüş, arka plan sekmesi, eksik/bozuk GLB ve WebGL yokluğu denenmeli.
- Klavye kontrolü, görünür odak, aktif ürün duyurusu, reduced-motion ve 320/390/768/1024/1440 px yerleşimleri kontrol edilmeli. Otomasyon gerçek telefon testinin yerine geçmez.

Reduced-motion modunda sürekli hareket ve fare paralaksı kapalıdır; seçim anlık veya kısa fade ile yapılır. Kare başına ekran okuyucu duyurusu yapılmaz. Canvas tek erişim yolu olamaz.

## Faz 3 bölüm geçişleri — 2026-10-02 kullanıcı düzeltmesi

Kullanıcı ilk uygulamadaki ayrı inceleme alanını reddetti. Güncel sözleşme: ana 3D seçim sahnesi ekranda kalır; aşağı kaydırırken aynı seçili model büyür, yan modeller ve ortak platform çekilir. Seçim indeksi scroll ile değişmez. Ayrı model kutusu, kopya model veya üçüncü View yoktur.

- Başlık/seçim/CTA katmanı ilk kaydırmada çekilir. Aynı model sahnesinin çevresinde “Neler Yapıyoruz” başlığı ve sırasıyla seçili model bilgisi, Teknik Çözümler, Yaratıcı Üretim kartları aşağıdan yukarı gelir. Kartlar geldikten sonra kaybolmaz; sonraki kart öncekinin üzerine, masaüstünde 24px ve dar ekranda 16px basamakla yerleşir. Üç kartın kenarı görünür kalır. Örtülen bağlantılar animasyon modunda inert olur; geri kaydırmada yeniden açılır. İnceleme dönüşü aynı sahnede yalnız yakınlaşma durumunda yatay sürükleme/yön tuşlarıyla çalışır.
- Masaüstünde model solda ve kart sağda; dar ekranda model üstte ve kart alttadır. Native scroll sürer, scroll yakalama/kilidi yoktur. Hero uzunluğu masaüstünde 420svh, dar ekranda 360svh başlangıç ayarıdır; kullanıcı görsel kabulüne göre ayarlanabilir.
- İnceleme çıkışında model küçülüp uzaklaşır, palet ana koyu mor temaya söner. Taramadan Üretime aynı renderer'daki ikinci View ile başlar. Güncel beş aşama yüzey, parlak örnek noktalar/tarama bandı, tel kafes, çalışan FDM yazıcı ve tamamlanan parçadır. Hero platformu bu alana taşınmaz.
- Süreç sunumu masaüstünde 580svh, dar ekranda 520svh kullanır. Her aşamada metin ve aktif adım eşleşir. Beş kart masaüstü/mobilde tıklanabilir; ayrıca ayrı mobil düğme satırı yoktur. 320px ekranlarda sahne kalan yüksekliği kullanır ve alttaki sosyal bağlantılar için pay bırakılır. Model üzerinde numaralı aşama şeridi gösterilmez; aktif düğmenin aria-pressed durumu ve sahnenin erişilebilir adı aşamayı bildirir.
- JS yokluğu, WebGL/hata/düşük performans ve reduced-motion için sticky/kart hareketleri bırakılır; poster, model bilgisi, iki hizmet kartı ve beş süreç açıklaması normal HTML akışında kalır. Görünmeyen hareketli kartlar focus sırasından inert ile çıkarılır; statik modda hepsi geri alınır.
- Fotoğraf seçkisi, müşteri süreci ve iletişim kapsamı korunur. 3D varlıklar/haklar/galeriler değiştirilmez.

[Ciao Energy](https://www.ciaoenergy.com/) sahnede kalan seçili nesne ve çevresindeki içerik geçişi için incelendi; kodu, modelleri ve marka varlıkları kopyalanmaz. Yerel görsel doğrulama ve açık fiziksel cihaz/kullanıcı kabulü [progress.md](progress.md) içindedir.

## Faz 3 başlık ve kart yığını — 2026-10-02

Kullanıcının yeni revizyonuyla başlangıçtaki büyük başlık kaldırıldı. “Fikri modele, modeli gerçeğe dönüştürüyoruz.” sayfanın tek h1 başlığı olarak Neler Yapıyoruz içindeki “Fikirden fiziksel forma.” yerine taşındı. Seçim oklarının arasındaki model adı kaldırıldı; model bilgi kartı ve canlı erişilebilir duyuru adı korur. İlk 3D alan, başlığın boşalttığı yere doğru genişletildi; büyüyen inceleme kadrajı korunur. Kartlar opak katmanlarla aynı yerde birikir, kenarlardaki küçük yatay/dikey basamak yığılmayı gösterir. Fallback/reduced-motion/JS yokluğunda kartlar ayrı normal belge akışında kalır.

## İlk hero kadrajı — platform/ok hizası (2026-10-02)

Kullanıcı platformu oklarla aynı seviyeye indirmeyi, model hattını ortalamayı, seçili modeli biraz büyütmeyi ve tam ekran yan boşluklarını azaltmayı istedi. HomeExperience ok merkezini mevcut sahne alanına göre ölçer; HeroScene bu ekran koordinatını kamera düzlemine dönüştürür. Model hattı bu yer değişimini girişte izler, model ile platform arasında görünür boşluk kalır. Geniş ekranda yalnız 3D alan içerik kolonunun dışına açılır ve yatay slot aralığı sınırlı büyür. İnceleme/kart kolonları ve sonraki bölümler aynı düzende kalır. Ok satırında platform için dikey pay vardır; açıklama ve CTA aşağıda ayrı durur. Yakınlaşmada giriş yerleşimi mevcut hedefe yumuşak döner. Sahne değerleri scenes.ts içindedir; mobil giriş ölçeği ayrı tutulur.

## Neler Yapıyoruz kadrajı ve kartla aşama seçimi (2026-10-02)

2026-10-04 dar ekran kadraj düzeltmesi: hareketli hero View'i 1023px ve altında girişte ek 3rem alt çizim payı taşır. Ok merkezine hizalanan platformun tamamı scissor sınırları içinde kalır; bu ek pay yakınlaşmada sıfırlanır ve önceki tam inceleme kadrajı korunur. Oklar ve CTA'lar aynı yerde kalır.

Yakın incelemede modelin geometrik merkezi masaüstü sahnesinin yatay %28, dikey %50 noktasına projekte edilir. Böylece geniş ekranda sol kolona ortalanır, kartlara doğru kaymaz; ilk hero platform/hat yerleşimi ve model ölçekleri korunur. Hedef scenePresets.hero.focusCenter içinde, modelin ölçülen merkezi HeroScene içinde tutulur. Model dönüşü aynı noktada sürer. Süreç kartlarının seçimi mevcut sticky ilerlemenin beş aralığına bağlanır; aşama sınırına değil aralığın %60 noktasına iner. Sonuç kartı tamamlanan parçayı, baskı kartı devam eden baskıyı gösterir. Düğme ve seçili kart renkleri yumuşak değişir; tercih azaltılmış harekette geçiş kapalıdır.

## Onaylanan ilk üç bölüm ve alt bölüm girişleri (2026-10-02)

Kullanıcı ana hero, Neler Yapıyoruz ve Taramadan Üretime tasarımlarını onayladı; bu revizyonda yerleşimleri ve hareketleri değiştirilmez. Yeni kapsam yalnız Üretim Vitrini, Nasıl Çalışıyoruz ve iletişim çağrısının küçük giriş hareketleridir.

Ana sayfa vitrini mevcut 1 büyük + 4 küçük fotoğraf kompozisyonunu korur. Büyük görsel 40px soldan, dört fotoğraf tek grup olarak 40px sağdan 0.8 saniyede gelir. Dar ekranda mevcut büyük görsel üstte / dört fotoğraf altta düzeni sürer; grup hareketlerinin yönleri aynıdır. Bölüm yatay taşmayı kırpar. Hakkımızda seçkisi ve /vitrin galerisine bu hareket eklenmez. Nasıl Çalışıyoruz ve iletişim çağrısı konum değiştirmeden 1.05 saniyede belirir. Girişler ilk görünürlükte bir kez çalışır; yeniden kaydırmada içerik geri kaybolmaz.

Server HTML görünürdür; JavaScript çalışmazsa fotoğraflar, açıklamalar ve bağlantılar normal akışta kalır. Azaltılmış harekette transform ve soluk başlangıç kaldırılır. Klavye odağı verilen içerik anında görünür olur. Uygulama Framer Motion Reveal sınırları ve motion.ts ayarlarıyla yapılır; yeni scroll motoru, bağımlılık veya Canvas yoktur. Güncel doğrulama [progress.md](progress.md) içindedir.

## Alt sayfalara hareket dilinin taşınması (2026-10-03)

Kullanıcı mevcut Vitrin, Hakkımızda ve Hizmetlerimiz düzenlerini koruyarak planlanan hafif geçişlerin tamamının uygulanmasını ve Vitrin girişinin kısaltılmasını onayladı. /vitrin girişindeki küçük Vitrin etiketi ve galeri yanındaki eski 3D açıklaması kaldırılır; menü bağlantısı ve ana tanıtım metni kalır. Yalnız bu sayfanın hero/galeri üst boşlukları azaltılır. Ana sayfanın onaylanan 3D kompozisyonu değişmez.

Alt sayfa başlıkları 0,9 saniyede belirir. Galeri fotoğrafları satır bazında 70ms aralıkla 0,75 saniyede hafifçe yükselir; gecikme dört/iki kolonlu gerçek responsive satırlarda yeniden başlar. Fotoğraflarda küçük hover büyümesi ve mor çerçeve/ışık vurgusu vardır. Hakkımızda yaklaşım metinleri fade, üç değer kartı kısa sıralı giriş, dört fotoğraf seçkisi galeri hareketi kullanır. Hizmetlerimiz iki ana kartı karşı yönlerden, üç detay bloğunu hafif yükselerek açar; kartlarda hover kenarlık/zemin vurgusu vardır. Dikey/yatay hareket mesafeleri masaüstünde 18px/28px, dar mobilde 12px/14px'tir. Girişler bir kez çalışır, hızlı kaydırma tek bir uzun animasyon kuyruğunu beklemez. SSR, odak ve reduced-motion görünürlüğü korunur. Bu sözleşme önceki tarihte Hakkımızda ve /vitrin hareketini kapsam dışında bırakan kararın kullanıcı onaylı genişlemesidir.

## İşaretlenen metinlerin sadeleştirilmesi (2026-10-03)

Kullanıcının sekiz tarayıcı notuyla ana sayfa, Hakkımızda ve Vitrin fotoğraf seçkilerinin altındaki “Gerçek ürün fotoğrafları” etiketi kaldırıldı. Ana sayfa/Hakkımızda'daki sağa hizalı “Tüm vitrini gör” bağlantısı kalır; /vitrin'de boş bir alt satır bırakılmaz. Yalnız /vitrin'in galeri alt padding'i 16px azaltılır: mobilde 64px, sm ve üzerinde 96px. Fotoğraflar, bölüm sırası ve giriş/hover hareketleri aynıdır.

Hakkımızda giriş etiketi yalnız “Hakkımızda” olur. “Üretim yaklaşımımızı sonuçlarda görün.” başlığı yan açıklama kaldırıldıktan sonra tam genişlik kullanır; alan yeterliyse tek satırdır ve dar ekranda doğal kırılır. Hero CTA altındaki temsili kullanım/atıf satırı ve beş süreç kartının altındaki tekrar açıklama kaldırılır. Neler Yapıyoruz model kartındaki temsili kullanım bilgisi/kaynak bağlantısı, Footer'daki Model kaynakları bağlantısı ve ayrı /model-kaynaklari atıf sayfası korunur. Süreç giriş açıklaması ve anlamlı poster alt metinleri kalır. Bu revizyon önceki hero CTA altı açıklama satırının yerini alır; sahne ayarları, ortak Canvas, model seçim/scroll ve süreç animasyonu değiştirilmez.

## Telefon akışı — 2026-10-04 kullanıcı düzeltmesi

Redmi Note 10S / Chrome'daki akıcılık ve bölüm geçişi şikâyetiyle yalnız 639px ve altındaki hero/süreç uzunlukları 260/360svh olur. Önceki 360/520svh tablet değerleri, geniş masaüstü 420/580svh ve masaüstü soldaki model/sağdaki kart kompozisyonu korunur. Mobil modelin merkezi üstteki kompakt View'e projekte edilir; başlık ve kart yığını birbirine yaklaştırılır. Kart girişleri scroll eşiğinden sonra kendi kısa geçişini tamamlar; parmak bırakıldığında kart yarıda kalmaz. Kartlar birikir, geri kaydırmada çekilir, örtülen bağlantılar inert kalır. Mobil çıkışta son model/kartlar native sticky alanla birlikte çıkar; ayrı küçülme/fade ile boş ekran bırakılmaz. Kaydırma kilidi veya otomatik kaydırma yoktur.

Telefon sticky ilerlemesi ve beş aşama tıklama hedefi gerçek sabit alan yüksekliğiyle hesaplanır. Süreç sahnesi metin/düğmelerden kalan yüksekliğe uyar, alt sosyal düğmeler için pay ayrılır; kısa ekranlarda yazı ölçüsü küçülür. Telefon DPR bütçesi 1'dir. Her iki View'in güncel aspect değeri kamera hesabından önce uygulanır; ortak şeffaf kare View'lerden önce temizlenir. Renderer, varlık, atıf ve fallback sözleşmeleri aynıdır. Bu revizyon önceki telefon süre/yerleşim kararını günceller; fiziksel performans kabulü [progress.md](progress.md) içinde izlenir.

Kullanıcının sonraki kadraj isteğiyle yalnız 639px ve altındaki Fiziksel Numune, Tarama Verisi ve Dijital Model ortak grubu phoneSampleLift=0.3 kadar yukarı taşınır. Noktalar/tarama bandı yüzeyle birlikte hareket eder; 3D Baskı ve Üretim Sonucu grubu, kamera ve tüm geniş ekran konumları korunur.
