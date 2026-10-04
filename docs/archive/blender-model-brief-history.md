# Orbitart için altı Blender vitrin modeli — tarihsel kayıt

Karar tarihi: 2026-09-28; son A4 revizyonu: 2026-09-30. Bu uzun brief tarihsel kayıttır; güncel kaynaklar ve kabul durumu [models.md](../models.md) içindedir.

Bu belge bir tasarım ve üretim brief'idir. Modeller gerçek mühendislik hesabı veya üretim sertifikası olarak sunulmaz. A4 ve A6 harici kaynaklıdır; Orbitart üretimi veya taraması gibi gösterilmez.

## Ortak üretim sözleşmesi

- Blender ana kaynak dosyası her model için ayrı `.blend` olarak saklanır.
- Düzenlenebilir kaynaklar ve üretim posterleri ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart` klasöründe model başına ayrı `a1-orbit-gear/`, `a2-tide-five/` vb. dizinlerde tutulur; web GLB kopyaları ana projenin `public/models/showcase/` klasörüne alınır.
- Web çıktısı `.glb`, görsel fallback çıktısı aynı sahneden alınmış `.webp` poster olur.
- Ölçek metre tabanlı ve tutarlı tutulur; dönüş, ölçek ve konum dışa aktarmadan önce uygulanır.
- Nesne merkezi, dönüş platformunda doğal dönecek şekilde dünya merkezine alınır; taban `Z=0` düzlemine oturur.
- Ön yön `-Z`, yukarı yön `+Y` glTF düzenine göre dışa aktarımda kontrol edilir.
- Materyaller Principled BSDF tabanlıdır. Gereksiz shader düğümü, 4K/8K doku ve görünmeyen iç geometri kullanılmaz.
- Her model mümkün olduğunca tek ana materyal ve en fazla iki yardımcı materyal kullanır.
- Bevel, Auto Smooth/normal düzeni ve gölge hataları gerçek zamanlı görüntüleyicide kontrol edilir.
- Modifier'lar kaynak `.blend` içinde düzenlenebilir korunabilir; web kopyasında gerekli olanlar uygulanır.
- Yayınlanacak özgün varlıklarda telifli karakter, marka, logo, araç parçası veya başka sanatçının tasarımı kopyalanmaz. A4'teki üçüncü taraf IP içeren kaynak yalnızca hak incelemesi bekleyen yerel prototiptir.
- Altı model aynı anda ekranda tutulmayacak; aktif model yüksek detaylı, komşu modeller kontrollü/lazy-loaded olacaktır.

## Teknik hedefler

| Kimlik | Kategori | Önerilen üçgen bütçesi | Materyal | Hero rolü |
| --- | --- | ---: | --- | --- |
| A1 | Endüstriyel dişli | 15–25 bin | Gri çelik + koyu gri merkez | İlk açılış ve tarama süreci |
| A2 | Beş kanatlı marin pervanesi | En fazla 45 bin | Saten beyaz + inci beyazı | Marin / mekanik üretim |
| A3 | Modüler elektronik muhafaza | En fazla 35 bin | Amber sarısı polimer + koyu grafit | Prototip / özel parça |
| A4 | Blade of Chaos fantastik obje (yerel prototip) | 59.602 (ölçülen) | Kaynağın özgün koyu metal, bronz ve lav dokuları | Yaratıcı detay; yayın hakkı bekliyor |
| A5 | Tek modern seramik vazo | 12–25 bin | Mat-saten petrol turkuazı seramik | Dekoratif tasarım |
| A6 | Özgün aslan muhafız heykeli | 35–60 bin | Eskitilmiş taş | Organik detay / heykel |

Üçgen bütçeleri sert hedef değil, kabul aralığıdır. Son karar mobil cihaz FPS, yükleme boyutu, silüet ve yüzey kalitesi birlikte görülerek verilir.

## A1 — Orbit Gear / endüstriyel dişli

### Görsel tanım

Kalın gövdeli, 18 düz dişli, merkezinde altı kollu yapısal boşaltma bulunan özgün bir endüstriyel dişli. Dış çember gri çelik, iç merkez koyu gri; iki küçük işaret gümüş tonundadır. Mor vurgu yalnızca sahne ışığı ve arka planda kalır. Kenarlar üretim hissi verecek kadar bevel'lı fakat keskinliğini kaybetmeyecek. Silüet her açıdan okunur olacak.

### Neden seçiliyor?

Dişli, ölçü, mekanik geometri ve tersine mühendislik anlatısını tek bakışta kurar. Simetrik yapısı hero döngüsünde güçlü görünür ve aynı dosya Taramadan Üretime animasyonunda nokta bulutu → tel kafes → yüzey → ürün aşamalarına dönüştürülebilir.

### Blender üretim yolu

1. Parametrik olarak tek diş oluştur; merkezden 18 kez radyal çoğalt.
2. Gövde diskini ve merkez deliğini ayrı kontrollü mesh/boolean işlemleriyle oluştur.
3. Altı kollu boşaltmayı simetrik yerleştir; boolean sonrası topolojiyi temizle.
4. Bevel ve weighted normal uygula; gereksiz iç yüzleri kaldır.
5. Dönüş pivotunu tam merkeze, tabanı `Z=0` düzlemine yerleştir.

### Blender görev promptu

> Blender'da Orbitart web hero sahnesi için sıfırdan özgün bir endüstriyel düz dişli üret. Model 18 dişli, kalın gövdeli, merkez delikli ve altı kollu yapısal boşaltmalı olsun. Silüet uzaktan net okunsun; köşelerde küçük ve kontrollü bevel kullan. Gri çelik ana materyal, koyu gri merkez ve yalnızca iki küçük oyukta gümüş işaret kullan. Mor tonu model materyaline katma; sahne ışığı ve arka plan markayı taşıyabilir. Marka, yazı ve gerçek üretici parçası kopyalama. Modeli dünya merkezinde, tabanı Z=0'da ve dönüş pivotu geometrik merkezde hazırla. Web GLB için 15–25 bin üçgen aralığını, temiz normal yönlerini, az draw call ve 2K'dan büyük olmayan dokuları hedefle. Düzenlenebilir `.blend`, optimize `.glb` ve aynı kameradan şeffaf olmayan `.webp` poster üret.

## A2 — Tide Five / beş kanatlı marin pervanesi

### Görsel tanım

Merkezi yuvarlatılmış göbeğe bağlanan, aynı yönde kıvrılan beş geniş kanatlı özgün marin pervanesi. Kanatlar kökten kalın başlayıp uca doğru incelir; hafif geriye yatık ve burulmuş bir profile sahiptir. Saten beyaz ve inci beyazı yüzey, koyu mor-lacivert sahnede güçlü kontrast oluşturur.

### Neden seçiliyor?

Orbitart'ın tekne/marin müşterilerine hitap eden uygulama alanını doğrudan gösterir. Dairesel hareket hero sistemine uygundur. Bununla birlikte görsel model, güvenlik kritik gerçek pervane hesabı veya üretim garantisi olarak sunulmaz.

### Blender üretim yolu

1. Bir kanadı düşük yoğunluklu kontrollü quad yüzey olarak kur; kök, orta ve uç profillerini döndürerek burulma ver.
2. Solidify veya elle kalınlık ekle; kökte göbeğe yumuşak geçiş oluştur.
3. Kanadı beş kez radyal çoğalt; merkez göbeği özgün ve sade biçimlendir.
4. Yakın plan gölge hatalarını, yüzey normallerini ve arka yüzleri kontrol et.
5. Görsel kaliteyi bozmadan 45 bin üçgenin altında tut; gereksiz geometri ekleme.

### Blender görev promptu

> Blender'da Orbitart için sıfırdan özgün, beş kanatlı dekoratif bir marin pervanesi modelle. Beş kanat aynı yönde akıcı biçimde kıvrılsın; kökte kalın, uçta daha ince, hafif geriye yatık ve kontrollü burulmuş olsun. Merkez göbek kompakt, yuvarlatılmış ve güçlü bir silüete sahip olsun. Saten beyaz ve inci beyazı PBR materyaller kullan; logo, yazı, marka ve gerçek bir mühendislik parçasının birebir ölçülerini kullanma. Bu varlık yalnızca hizmet temsili olacak, üretime hazır pervane gibi sunulmayacak. Modeli merkezde dengeli dönecek, taban/eksen yönü doğru olacak şekilde hazırla. 45 bin üçgen üst sınırı, temiz normal, en fazla iki materyal, 2K doku üst sınırı ve optimize GLB hedefle. Kaynak `.blend`, optimize `.glb` ve poster `.webp` teslim et.

## A3 — ModuShell / modüler elektronik muhafaza

### Görsel tanım

Yuvarlatılmış köşeli dikdörtgen bir elektronik muhafaza; ayrılabilir üst kapak, havalandırma yarıkları, iki bağlantı noktası ve açılı masa standı içerir. Gövde ve kapak amber sarısı polimer, stand ve bağlantılar koyu grafit, kısa ve ince durum çizgisi mor olur. A1'in gri ve A2'nin beyaz modelinden renk olarak ayrılır. Gerçek ürün kopyası değil, özgün endüstriyel tasarım dili taşır.

### Neden seçiliyor?

Özel parça, prototip, muhafaza ve işlevsel 3D baskı hizmetlerini figürlerden bağımsız anlatır. Ayrık kapak ve stand daha sonra kontrollü mikro animasyon veya exploded-view için kullanılabilir.

### Blender üretim yolu

1. Ana gövdeyi bevel'lı box modelleme ile oluştur; duvar kalınlığını gerçekçi ama görsel amaçlı tut.
2. Kapak çizgisini ve vida yuvalarını ayrı geometrik detaylar olarak kur.
3. Havalandırma yarıklarını tekrar eden array/boolean düzeniyle üret.
4. Standı ayrı nesne yap; menteşe eksenini mantıklı pivotla tanımla.
5. Kapalı sunum durumunda parçalar çakışmadan birleşsin.

### Blender görev promptu

> Blender'da Orbitart web vitrini için sıfırdan özgün bir modüler elektronik muhafaza tasarla. Yuvarlatılmış köşeli kompakt dikdörtgen gövde, ayrılabilir üst kapak, düzenli havalandırma yarıkları, iki bağlantı portu detayı ve açılı masa standı içersin. Tasarım gerçek bir ticari ürünü kopyalamasın; logosuz ve üretici bağımsız olsun. Gövde ve kapakta mat amber sarısı polimer, stand ve bağlantılarda koyu grafit kullan; yalnızca kısa bir durum çizgisi Orbitart moru olsun. Kapak, gövde ve stand ayrı adlandırılmış nesneler olarak kalsın; ileride exploded-view mümkün olsun. 35 bin üçgen üst sınırı, temiz bevel/normal, en fazla üç materyal ve 2K doku üst sınırıyla web GLB hazırla. Kaynak `.blend`, optimize `.glb` ve poster `.webp` üret.

## A4 — Blade of Chaos / fantastik obje prototipi

Önceki Cyber Samurai ve bütün karakter/büst yönleri kullanıcı tarafından iptal edildi. Güncel tek A4 adayı [DeLeon'un Blade of Chaos - God of War modeli](https://sketchfab.com/3d-models/blade-of-chaos-god-of-war-1c23158349954342ad74bc002d01007e). Sketchfab sayfasında CC BY gösterilse de sanatçı yorumunda başka God of War konsept sanatçılarının çalışmalarını kullandığını ve kullanım hakkından emin olmadığını belirtir. Bu nedenle atıf tek başına ticari yayın izni sayılmayacak; hak durumu açıklığa kavuşana kadar yalnızca yerel prototip olarak tutulacaktır.

### Uygulanan Blender işlemi

1. Sketchfab'dan indirilen 1K GLB ve kaynak dokular ikincil `a4-blade-of-chaos/` klasöründe korundu; ana projeye kopyalanmadı.
2. Kaynak renkleri değiştirilmedi. Bıçak, zincir, sap ve orta parçaya farklı geometri bütçeleri verilerek yaklaşık 2.992.328 üçgen 59.602 üçgene indirildi; dokular JPEG kalite 88 olarak GLB içine paketlendi. Prototip GLB 6.658.368 byte (~6,35 MiB).
3. Optimize GLB Blender'a yeniden alınarak 32 mesh, 11 materyal ve 18 gömülü görüntü doğrulandı. Poster görsel olarak incelendi; bıçak kenarlarında kaynak modele göre ayrıntı kaybı vardır. Mobil FPS ve açılmış doku belleği henüz ölçülmedi.
4. `rightsStatus=blocked/pending`: üçüncü taraf fikri mülkiyet belirsizliği çözülmeden `public/`, hero veya `published` kullanılmaz. Model Orbitart'ın üretimi, taraması ya da satılan ürünü olarak sunulmaz.

## A5 — Orbit Vase / tek modern vazo

### Görsel tanım

Tek, sade ve ilk bakışta vazo olarak okunan bir form vardır: dengeli taban, dolgun yuvarlak gövde, daralan boyun, dışa açılan ağız ve gerçek iç boşluk. Kemer, halka ve ikinci obje bulunmaz. A2'nin beyazından ayrılması için mat-saten petrol turkuazı seramik yüzey seçildi. Önceki iki tasarım A5 kaynak klasörünün _recovery dizininde korunur.

### Neden seçiliyor?

Dekoratif tasarım ve ev objesi üretimini sade bir silüetle temsil eder. Teknik modellerin sert geometrisini dengeler. Dokuya bağımlı olmadığı için çok hafif bir GLB olabilir.

### Blender üretim yolu

1. Tek gövdeyi yumuşak dönel kesitlerle oluştur: dengeli taban, dolgun karın, dar boyun ve dışa açılan ağız.
2. Ağızdan gövdeye inen gerçek iç duvar ve iç taban oluştur; üstünü kapatma.
3. Kemer, halka, ikinci vazo veya dekoratif platform ekleme.
4. Materyali petrol turkuazında tut; silüeti sade ve vazo olarak anlaşılır bırak.
5. Dokusuz, tek mat-saten petrol turkuazı PBR materyali tercih et.

### Blender görev promptu

> Blender'da Orbitart için sıfırdan özgün “Orbit Vase” adlı tek modern vazo modelle. Dolgun yuvarlak gövde, dar boyun, dışa açılan belirgin ağız ve derin gerçek iç boşluk olsun. Kemer, halka, ikinci nesne veya platform bulunmasın. Form sade ve premium; yüzey mat-saten petrol turkuazı seramik olsun. Logo, yazı ve başka bir tasarımın kopyası olmasın. Taban Z=0'a otursun; 12–25 bin üçgen, tek materyal ve dokusuz yüzeyle `.blend`, optimize `.glb` ve poster `.webp` hazırla. Sıvı tutma veya üretime hazır olma iddiası ekleme.

## A6 — Astral Lion / özgün taş muhafız heykeli

> Tarihsel ilk brief: aşağıdaki sıfırdan modelleme yönü denenmiş, gerçekçilik hedefini karşılamadığı için reddedilmiştir. Güncel A6 yönü CC0 lisanslı gerçek taş aslan taramasından türetilen Blender taslağıdır; ayrıntılar ve kaynak [models.md](../models.md) içindedir. Aşağıdaki “özgün”, “gerçek tarama değil” ve “tarihî eserin kopyası değildir” ifadeleri güncel A6'ya uygulanmaz.

### Görsel tanım

Oturur pozisyonda, gövdesi geometrik olarak sadeleştirilmiş özgün aslan muhafız heykeli. Yelesi doğal saç telleri yerine büyük katmanlı taş plakalarından oluşur. Göğüste küçük dairesel yörünge rölyefi, kaidede kırık taş kenarları bulunur. Tarihi bir eserin veya mevcut taramanın kopyası değildir.

### Neden seçiliyor?

Organik form, heykel ve yüzey detayını göstermek için teknik nesnelerden farklı bir sınav sunar. Taş yüzey, tarama hizmetinin yakalayabildiği detay fikrini anlatabilir; ancak model gerçek tarama olarak etiketlenmez.

### Blender üretim yolu

1. Oturan aslanın kafa, göğüs, ön bacak ve kaide büyük formlarını basit hacimlerle kur.
2. Yeleyi az sayıda büyük, üst üste binen taş plakası şeklinde tasarla.
3. Sculpt ile orta ölçekli taş aşınması ekle; mikro noise'u normal haritasına bırak.
4. Retopoloji/decimate sonrası silüet ve yüz korunacak biçimde 35–60 bin üçgen hedefle.
5. Kaideyi ve aslanı tek görsel grup olarak, dengeli pivotla hazırla.

### Blender görev promptu

> Blender'da Orbitart için sıfırdan özgün “Astral Lion” adlı taş muhafız heykeli üret. Aslan oturur pozisyonda, güçlü göğüslü ve sadeleştirilmiş anatomide olsun; yele doğal kıl yerine büyük katmanlı taş plakalarından oluşsun. Göğüste küçük soyut yörünge rölyefi, kaidede kontrollü kırık taş kenarları yer alsın. Tarihi bir heykeli, müze taramasını, marka maskotunu veya başka sanatçının eserini kopyalama. Eskitilmiş koyu taş ana materyal ve çok hafif mor ışık yansıması kullan; modelin kendisinde parlak neon yüzey olmasın. Sculpt sonrası temiz retopoloji/optimizasyon yap, 35–60 bin üçgen ve 2K doku üst sınırı hedefle. Modeli Z=0 tabanlı ve merkez pivotlu `.blend`, optimize `.glb` ve poster `.webp` olarak hazırla. Bunun gerçek 3D tarama olmadığı metadata ve içerik kaydında açıkça yazılsın.

## Uygulama sırası

1. A1 Gear ile Blender → GLB üretimini doğrula; web görüntüleyici entegrasyonu sonraki Faz 2 adımıdır.
2. A2 Propeller ile kıvrımlı yüzey, beyaz materyal ve optimizasyonu doğrula.
3. A3 Enclosure ile çok parçalı nesne, isimlendirme ve olası exploded-view yapısını test et.
4. A5 Vase ile hafif organik geometri ve materyal kalitesini doğrula.
5. A6 Astral Lion ile yoğun organik model ve normal haritası bütçesini tamamla.
6. A4 Blade of Chaos prototipini en son görsel, mobil performans ve hak incelemesinden geçir; önceki figür/büst planlarını uygulama.
7. Altı model tek tek teknik kabul aldıktan sonra hero seçkisine bağla.

Bu sıra kullanıcı tarafından A2, A3, A5, A6 ve en son A4 olacak şekilde güncellendi. A4 artık seçilen fantastik objenin yerel optimizasyonudur; eski sculpt/figür planı geçersizdir.

## Onaylanan tasarım yönleri

- A1'in düz dişli ve altı kollu yapısı.
- A2'nin beş kanatlı beyaz pervane olması.
- A3'ün standlı elektronik muhafaza biçimi ve amber sarısı ana rengi.
- A4 yalnızca DeLeon'un Blade of Chaos modeli; özgün renkleri korunur. Kullanıcı görsel kabulü ve hak incelemesi bekler.
- A5'in tek, modern, açık ağızlı ve petrol turkuazı vazo olması; önceki halka ve çift-vazo sürümleri kullanıcı geri bildirimiyle yedeklendi.
- A6'nın oturan taş aslan muhafız olması.
- A1'de model işaretleri gümüştür; mor yalnızca hafif poster kenar ışığı ve arka plandadır. A2 modeli beyazdır; diğer modellerde vurgu miktarı kendi görsel incelemelerinde belirlenecek.

Bu satır tarihsel teslim anını anlatır. Güncel varlık ve hak durumunu [models.md](../models.md) kaydından doğrula; ortak mobil performans, poster/fallback, haklar ve kullanıcı görsel kabulü tamamlanmadan hero entegrasyonu yapılmaz.
