# Altı modelin seçimi, teslimi ve kabulü — tarihsel kayıt

Revizyon: 2026-09-30. A1/A2/A3/A5 özgün Blender varlıklarıdır. A4 için kullanıcı bütün önceki figür yönlerini iptal ederek DeLeon'un Blade of Chaos - God of War modelini seçti. Optimize yerel prototip hazırdır; üçüncü taraf hakları belirsiz olduğundan web yayınına kapalıdır. A6, CC0 taş aslan taramasından türetilmiş sıcak kumtaşı renkli temsili muhafızdır. Hero etkileşimi ve gerçek cihaz kabulü ayrıca yapılacak.

## Seçim sırası

Bu kayıt 2026-09-30 tarihli ayrıntılı anlık görüntüdür. Eski internet adayları [arşivdedir](model-candidates-history.md); A1–A6'nın güncel kabul durumu [models.md](../models.md) içindedir.

Slotlar: teknik bağlantı parçası, marin parçası, prototip/muhafaza; yaratıcı/fantastik obje, dekoratif obje, heykel/taranmış sanatsal obje. İlk açılış teknik bağlantı parçasıdır. Taramadan Üretime için aynı teknik varlık sabit örnek olarak kullanılır; yeni yedinci dosya zorunlu değildir. A4 hakları çözülemezse aynı slota özgün ve hakları temiz bir alternatif gerekir.

## Teslim koşulları

- Sahip olunan ürün: GLB, gerçek fotoğraf, ürün eşleşmesi ve yayın hakkı.
- Harici model: kaynak sayfa, üretici, lisans/sürüm ve resmi indirme paketi. Gerçek Orbitart fotoğrafı gerekmez; lisans izin veriyorsa modelden render poster üretiriz.
- glTF + bin + dokular veya desteklenen başka kaynak biçimi GLB'ye dönüştürülebilir; yalnızca uzantı değiştirmek dönüşüm değildir. Doğrudan GLB indirmesi doğrulanmamışsa açıkça belirtilir.
- Kullanıcı girişini, satın almayı veya lisans kabulünü gerektiren adımda engel raporlanır; kimlik bilgisi istenmez, indirme kısıtı aşılmaz.
- Kaynaklar proje public alanına doğrudan konmaz. Orijinaller korunur; yalnızca optimize gösterim türevleri yayınlanır.

## Kabul kaydı — her varlık için

- Aday numarası/assetId, slot, kullanıcı seçim tarihi.
- Kaynak URL, üretici, lisans adı/sürümü/URL, doğrulama tarihi ve saklanan kanıt.
- Ticari kullanım, değiştirme ve tarayıcıdan indirilebilir dosya dağıtımı uygunluğu.
- Atıf metni, yapılmış değişiklikler; sourceKind ve temsili kullanım açıklaması.
- Gerçek indirme biçimi, tam paket/doku kontrolü, kaynak ve optimize boyut.
- Ön yön, bounding box, pivot, taban, materyal, üçgen, draw call, doku boyutu ve açılmış GPU bellek tahmini.
- Fotoğraf veya modelden üretilen poster, alt metin; site önizlemesinin lisansı otomatik olarak model lisansı sayılmaz.
- Teknik kontrol, rightsStatus, yayın status'u ayrı tutulur.

## Mevcut teslim durumu

1. A1 Orbit Gear: kullanıcı onayıyla gri materyale çevrildi. `.blend`, betik, kaynak `.glb`, `.webp` poster ve ölçüm kaydı ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart\a1-orbit-gear` klasöründedir. İlk koyu/mor sürüm `_recovery/initial-dark-violet/` içinde korunur. Web GLB kopyası `public/models/showcase/a1-orbit-gear.glb`: 22.464 üçgen, 19 mesh, üç materyal, yaklaşık 402 KB. GLB geri içe alındı; sitede yayın/cihaz testi bekleniyor.
2. A2 Tide Five: kullanıcı onayıyla beyaz beş kanatlı özgün pervane üretildi. `.blend`, betik, kaynak `.glb`, `.webp` poster ve ölçüm kaydı ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart\a2-tide-five` klasöründedir. Web GLB kopyası `public/models/showcase/a2-tide-five.glb`: 16.476 üçgen, 7 mesh, iki materyal, yaklaşık 260 KB. GLB geri içe alındı; sitede yayın/cihaz testi bekleniyor.
3. A3 ModuShell: amber sarısı gövde/kapak, koyu grafit stand ve kısa mor durum çizgisiyle özgün Blender sahnesi üretildi. Ayrı kapak, içi boş gövde, dokuz gerçek havalandırma açıklığı, iki ön bağlantı noktası, menteşeler ve eğimli stand bulunur. Kaynaklar ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart\a3-modushell` klasöründedir. Web GLB kopyası `public/models/showcase/a3-modushell.glb`: 10.584 üçgen, 17 mesh, üç materyal, yaklaşık 281 KB. GLB geri içe alındı ve Blender uygulamasında açıldı; sitede yayın/cihaz testi bekleniyor.
4. A4 Blade of Chaos: kullanıcı [DeLeon'un Sketchfab modelini](https://sketchfab.com/3d-models/blade-of-chaos-god-of-war-1c23158349954342ad74bc002d01007e) tek geçerli A4 yönü olarak seçti. Sketchfab sayfasında CC BY 4.0 görünür; ancak sanatçı yorumunda God of War için başka sanatçıların konseptini kopyaladığını ve kullanım haklarından emin olmadığını açıkça belirtiyor. `rightsStatus=blocked/pending`: bu kayıt ticari Orbitart sitesinde kullanıma yetki kanıtı değildir. Sketchfab'dan indirilen 1K GLB doğrudan kaynak alınarak renkleri değiştirilmeden Blender'da 2.992.328 → 59.602 üçgene indirildi. Kaynak 130.865.008 byte; prototip GLB 6.658.368 byte (~6,35 MiB). Blender'a geri alma kontrolü: 32 mesh, 11 materyal, 18 görüntü. Düzenlenebilir `.blend`, kaynak, betik, poster, ölçüm ve prototip GLB ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart\a4-blade-of-chaos` klasöründe. Bıçak kenarlarında kaynak modele kıyasla görsel ayrıntı kaybı vardır; telefon performansı ölçülmedi. **Ana projenin `public/` dizinine konmadı, hero/published bağlantısı yapılmadı.** Eski Cyber Samurai `.blend` ve `.blend1` Geri Dönüşüm Kutusu'na taşındı; önceki üç A4 kaynak klasörü `_recovery/superseded-a4-sources/`, eski Cyber Samurai ve Orbit Warden web GLB'leri `_recovery/superseded-a4-web-glbs/` altına alındı. Haklar netleşse bile kaynak, sanatçı, lisans ve yapılan değişiklikler görünür atıf gerektirir. Bu obje Orbitart üretimi/taraması veya satılan ürünü gibi sunulamaz.
5. A5 Orbit Vase: son kullanıcı geri bildirimiyle tek, modern petrol turkuazı vazoya dönüştürüldü. Dolgun yuvarlak gövdesi, dar boynu, dışa açılan ağzı ve gerçek derin iç boşluğu vardır; ikinci vazo, halka veya kemer yoktur. Kaynaklar ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart\a5-twin-orbit-vase` klasöründedir; önceki sürümler `_recovery/first-loop-sculpture/` ve `_recovery/two-arch-vases/` içinde korunur. Dosya adı mevcut varlık yolunun kararlılığı için korunmuştur. Web GLB kopyası `public/models/showcase/a5-twin-orbit-vase.glb`: 21.888 üçgen, 1 mesh, tek dokusuz PBR materyal, yaklaşık 395 KB. GLB geri içe alındı; iç boşluk ve gövde ışın testiyle doğrulandı. Sitede yayın/cihaz testi bekleniyor; sıvı tutma veya üretilebilirlik onayı değildir.
6. A6 Stone Guardian: kullanıcının reddettiği özgün/stilize sürümler ikincil `_recovery` altında korunur. Temel kaynak [Lion Statue - optimized](https://zenodo.org/records/10324226), nebulousflynn; kayıt açıklamasına göre [Löwe](https://sketchfab.com/3d-models/lowe-4522a4cdc1c14190bf1a8811fa27da32) / noe-3d.at taramasının optimize türevidir. Zenodo kaydı CC0 1.0 Universal lisansı gösterir; indirilen GLB MD5 `77f9da14228246a2758105c2368be79f` ile eşleşti. Kullanıcının son örneğine göre büyük gösterim kaidesi ve bronz kaide parçaları kaldırıldı; taramadaki küçük özgün altlık korundu. Albedo dokusuna sıcak kumtaşı/eskitilmiş altın rengi doğrudan işlendi; doku Blender ve GLB'de aynı görünür. İkincil klasörde `a6-warm-sandstone-cc0-draft.blend/.glb/.webp`, `a6-warm-sandstone-cc0-draft-albedo.png` ve metrikler bulunur: 1 mesh, 28.488 üçgen, GLB 3.659.244 byte (~3,49 MiB). Geri içe alma ile 1 mesh, 28.488 üçgen ve sıcak albedo doğrulandı. `public/models/showcase/a6-astral-lion.glb` bu sürümle güncellendi; poster `public/images/showcase/a6-astral-lion.webp` olarak eklendi. Eski web dosyası ikincil `_recovery/stylized-guardian` içinde korunur. Kaynak tarama olduğu açıkça belirtilecek; Orbitart'ın kendi taraması, sıfırdan sculpt'u veya üretime hazır geometri olarak tanıtılmayacaktır. Hero, lisans, mobil bellek ve gerçek cihaz kabulü ayrıca doğrulanacak.

Sketchfab A4 sayfasındaki yaklaşık 3 milyon üçgen bilgisi yerel kaynakta 2.992.328 olarak doğrulandı. Altı varlığın ortak bellek/aktarım maliyeti ve posterleri ayrıca incelenir. Malzeme dayanımı, gerçek tarayıcı hassasiyeti veya Orbitart'ın metal parça üretimi bu modellerden çıkarılmaz.

## Uygulama sırası

Model üretimi/lisans kontrolü → GLB/poster teknik kontrolü → veri ayrımı/yayın filtresi → tek model ışık/kamera → iki model geçiş → altılı sahne → statik süreç iskeleti → Faz 3 dört aşamalı hareket → cihaz/fallback testleri.

Tek/iki modelli prototip son altılı düzenin yerine geçmez. Gerçek tarama öncesi/sonrası içeriği gelirse yalnızca ilgili içerik değiştirilir; son sayfa düzeni korunur.
