# 3D model durumu — güncel kayıt

Geometri/bellek incelemesi: 2026-09-30. Entegrasyon kaydı: 2026-10-01. Bu belge aktif A1–A6 kararlarının tek kaynağıdır. Ayrıntılı eski denemeler [arşivdedir](archive/README.md); oradaki adaylar geçerli seçim sayılmaz.

2026-10-04 son kabul: kullanıcı tasarım ve mobil kullanımdan sonra Faz 3'ün kalan testlerinin tamamını yaptığını ve geçtiğini bildirerek fazı kapattı. Aşağıdaki daha eski açık cihaz/hata kabulü notları bu beyanla kapanmıştır; agent tarafından yeni nicel cihaz ölçümü yapılmış olduğu iddia edilmez. Güncel kapanış kaydı [progress.md](progress.md) içindedir. Dosya, hak ve atıf kayıtları değişmez.

## Dosyalar ve yayın durumu

| Slot | Model | Yerel GLB | Proje `public/models/showcase/` | Kaynak / hak | Şu anki durum |
| --- | --- | ---: | --- | --- | --- |
| A1 | Orbit Gear | 22.464 üçgen; 402.104 B | `a1-orbit-gear.glb` | Özgün Blender üretimi | Kullanıcı teknik/yayın onaylı; `published` |
| A2 | Tide Five | 16.476 üçgen; 260.176 B | `a2-tide-five.glb` | Özgün Blender üretimi | Kullanıcı teknik/yayın onaylı; `published` |
| A3 | ModuShell | 10.584 üçgen; 281.288 B | `a3-modushell.glb` | Özgün Blender üretimi | Kullanıcı teknik/yayın onaylı; `published` |
| A4 | Blade of Chaos | 59.602 üçgen; 6.658.368 B | `a4-blade-of-chaos.glb` | [DeLeon / Sketchfab](https://sketchfab.com/3d-models/blade-of-chaos-god-of-war-1c23158349954342ad74bc002d01007e), sayfada CC BY 4.0 | Kullanıcı teknik/yayın onaylı; `published`; üçüncü taraf hak notu korunur |
| A5 | Orbit Vase | 21.888 üçgen; 395.192 B | `a5-twin-orbit-vase.glb` | Özgün Blender üretimi | Kullanıcı teknik/yayın onaylı; `published` |
| A6 | Stone Guardian | 28.488 üçgen; 3.659.244 B | `a6-astral-lion.glb` | [CC0 tarama türevi](https://zenodo.org/records/10324226); sıcak kumtaşı düzenlemesi | Kullanıcı teknik/yayın onaylı; `published` |

`public/` dosyası doğrudan URL ile indirilebilir; yayın kararı ayrıca kayıtla yönetilir. Kullanıcı 2026-10-02'de altı varlığın teknik ve yayın onayını verdi; kayıtlar `approved`/`published` durumuna alındı. Production build'de desteklenen tarayıcıda 3D sahne açılır; WebGL/yükleme/performans sorununda poster fallback'i korunur. GLB toplamı 11.656.372 byte'tır. Bu sayı mobil performans onayı değildir. `/vitrin` galerisi 30 fotoğrafı içerir ve GLB seçkisinden bağımsızdır.

## Faz 2A teknik inceleme

GLB içindeki glTF erişicileri, mesh/node örnekleri ve gömülü görseller 2026-09-30'da incelendi. Aşağıdaki draw call sayısı, görünür her mesh primitive'i için taban tahmindir; gerçek sahne, gölge ve materyal geçişleri bunu artırabilir. Doku belleği, her gömülü görselin RGBA açılmış hâli ve yaklaşık mipmap maliyetidir; geometri, render hedefi ve tarayıcı yükü dahil değildir.

| Model | Üçgen | Taban draw call | Materyal | Gömülü görsel | Yaklaşık doku belleği |
| --- | ---: | ---: | ---: | ---: | ---: |
| A1 Orbit Gear | 22.464 | 19 | 3 | 0 | 0 MiB |
| A2 Tide Five | 16.476 | 7 | 2 | 0 | 0 MiB |
| A3 ModuShell | 10.584 | 17 | 3 | 0 | 0 MiB |
| A4 Blade of Chaos | 59.602 | 32 | 9 | 17 × 1024² | ~90,7 MiB |
| A5 Orbit Vase | 21.888 | 1 | 1 | 0 | 0 MiB |
| A6 Stone Guardian | 28.488 | 1 | 1 | 2 × 1024² | ~10,7 MiB |
| **Altı model** | **159.502** | **77** | **19 tanım** | **19** | **~101,4 MiB** |

Altı GLB'nin 11,66 MB aktarımı, başlangıçtaki yaklaşık 12 MB dosya hedefinin altında kalır; bu sonuç açılmış GPU belleğini veya yükleme hızını kanıtlamaz. A4 tek başına yaklaşık 6,66 MB ve toplam tahmini doku belleğinin 90,7 MiB'ını kullanır; mobil için ilk performans riski buradadır. Gömülü görseller ve buffer'larda harici URI bulunmadı. A4'ün görsel seçimi kullanıcı tarafından kabul edildi; telefon/masaüstü FPS, WebGL bellek ve sahne testleri Faz 2B–2D'de gerçek render kurulunca yapılabilir. Gerekirse A4 dokuları yeniden küçültülür veya atlaslanır; görünüm tekrar kullanıcıyla kontrol edilir.

Bu ölçümler tek başına fiziksel cihaz performansını kanıtlamaz. Kullanıcının sonraki açık teknik/yayın onayıyla altı kayıt 2026-10-02'de `technicalStatus=approved`, `publicationStatus=published` durumuna alındı. Üretim sayfasındaki `publishedModelAssets` filtresi korunur; dosyanın public klasörde olması tek başına yayın kapısını açmaz.

Faz 2C–2E entegrasyonu: seçim ve hero paletleri, sınırlandırılmış GLB yüklemesi ve aynı A1'den dört statik süreç posteri eklendi. Kaynak/üretici/lisans/değişiklik atıfları, 2026-10-03 kullanıcı revizyonuyla Hakkımızda'dan `/model-kaynaklari` sayfasına taşındı; hero'dan ve Footer'daki küçük bağlantıdan erişilir. Atıf ve değişiklik metinleri korunur. GLB dosyaları bu turda değiştirilmedi. Birim/HTML testleri başarılı; yeni yükleme düzeninde tarayıcı ve gerçek cihaz kabulü [progress.md](progress.md) listesinden tamamlanacak. Önceki dosya metrikleri canlı FPS/bellek ölçümü değildir.

## Süreç aksesuarı — markasız FDM yazıcı (2026-10-02)

Kullanıcı dijital modelden sonra çalışan yazıcı, ardından üretim sonucu istedi ve markasız, sade FDM seçti. `process-fdm-printer.glb` bu istek için özgün prosedürel Blender üretimidir; harici geometri/marka tasarımı kullanılmadı. Hero A1–A6 listesine veya gerçek ürün kayıtlarına eklenmez. `model-assets.ts` içindeki `processPrinterAsset` kaynak/sahiplik/teknik kaydıdır. Kullanıcı ana sayfanın ilk üç bölümünü, süreç görünümü dahil, onayladı; fiziksel cihaz performans ve hata kabulü açık kalır. Güncel denetim [progress.md](progress.md) içindedir.

GLB: 198.064 B, 2.920 üçgen, 26 mesh/draw call tabanı, 7 materyal, gömülü görsel/harici URI/decoder gereksinimi yok. Ayrı `print-head` ve `print-gantry` düğümleri ile `print-bed` geometrisi kontrol edildi. Altı hero GLB'si + bu aksesuar toplamı 11.854.436 B'dır. Tarayıcıda baskı görünümünde A1 dahil 46 draw call / 31.384 üçgen gözlendi; bu değer dolu katman geometrisini de içerir, gerçek telefon FPS sonucu değildir.

Kaynak, `.blend`, üretim betiği, metrikler ve iki poster `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart\process-fdm-printer\` altında. Web yalnız yazıcı GLB'sini, `process-printing.webp` ve `process-result.webp` posterlerini kullanır. Posterlerdeki çark aynı özgün A1'den alınır. Hareket gerçek makine/toolpath simülasyonu, üretilmiş parçanın fotoğrafı veya üretilebilirlik kanıtı sayılmaz.

## A4 kararı ve atıf

- Kullanıcı A4 olarak **Blade of Chaos** modelini ve projede kullanımını onayladı. Eski karakter/büst seçenekleri aktif değildir. Kaynağın renkleri değiştirilmedi; 2.992.328 üçgenlik GLB yerel Blender prototipinde 59.602 üçgene indirildi ve geri içe alma kontrolünden geçti. Bıçak kenarında ayrıntı kaybı var. Optimize GLB ve poster `public/` klasörüne eklendi.
- Sketchfab sayfasında CC BY 4.0 görünür. Model yazarı başka *God of War* konsept sanatçılarına dayandığını ve bu haklardan emin olmadığını belirtir. Kaynak sayfası, lisans bağlantısı ve değişiklik notu görünür atıfta yer almalı. Kullanıcı proje kullanımı için onay verdiğinden kayıt `userApproved=true`, `rightsStatus=approved` durumundadır; bu karar bağımsız hak garantisi değildir. Kullanıcının 2026-10-02 teknik/yayın onayıyla `technicalStatus=approved`, `publicationStatus=published` yapıldı; üçüncü taraf hak belirsizliği kayıttan çıkarılmadı.
- Kullanıcının proje kullanımına ilişkin onayı kaydedildi; CC BY atfı hero/erişilebilir kaynak alanında gösterilmeli. Sanatçının konsept kaynaklarına ilişkin kendi notu da kayıtlı tutulur. Bu not, kullanıcının hak onayı yerine geçirilmez; hukuki hak garantisi iddia edilmez.
- Kaynak, `.blend`, optimize GLB, poster, betik ve metrikler ikincil `Blender/Orbiart/a4-blade-of-chaos/` klasöründedir. Eski A4 çalışma klasörleri oradaki `_recovery/superseded-a4-sources/`, eski web GLB'leri ve eski A4 posteri `_recovery/superseded-a4-web-glbs/` altındadır. Eski Cyber Samurai `.blend` ve `.blend1` Geri Dönüşüm Kutusu'na taşınmıştır.
- Haklar netleşmezse aynı yaratıcı slot için hakları temiz başka model gerekir. A4'ü Orbitart ürünü, taraması veya satış ürünü gibi gösterme.

## Siteye alma kontrolü

1. Kaynak/sahiplik ve ticari kullanım yanında indirilebilir GLB dağıtım hakkını doğrula; gerekiyorsa görünür üretici–lisans–değişiklik atfı ekle.
2. GLB, poster, yön/pivot, materyal, üçgen, draw call, açılmış doku belleği ve dosya boyutunu kaydet. Gerçek telefon ve masaüstünde yükleme/FPS testini yap.
3. Varlık ve hero metaverileri `src/content/model-assets.ts` ile `src/content/hero-showcase.ts` içindedir. Her modelin kısa açıklaması ve başlangıç paleti Faz 2A içeriğidir; seçili modele göre paletin sayfa/ışık vurgularına canlı geçişi Faz 2C uygulamasıdır. Gerçek ürünleri `products.ts` içinde ayrı tut.
4. Hero ve poster fallback'i çalışmadan ve kullanıcı görsel onayı gelmeden modele `published` verme. A4 için görünür CC BY 4.0 atfını tamamla; kaynak notunu şeffaf biçimde koru.

Blender'ın düzenlenebilir kaynakları ana kod deposunda değil, ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart` klasöründedir. Bu repo yalnız web için uygun kopyaları tutar.
