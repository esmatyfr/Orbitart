# Orbiart Proje İlerlemesi — tarihsel kayıt

Son güncelleme: 2026-09-30

## Mevcut durum

- Aktif aşama: Faz 2A — altı GLB'nin teknik/görsel kabulü
- Durum: Altı slotun yerel GLB prototipi var. A4'te önceki tüm figür kararları iptal edildi; yalnızca DeLeon'un Blade of Chaos modelinin renkleri korunmuş optimize prototipi geçerli. Kaynak hakları belirsiz olduğu için A4, `public/` ve hero dışında tutuluyor. Diğer beş slotun mevcut web varlıkları değişmedi.
- Sonraki adım: A4 için hak sahibi yetkisi/alternatif özgün varlık kararı ve kullanıcı görsel onayı; ardından altı modelin ortak renk/silüet, mobil performans ve poster/fallback kontrolü. Haklar ve onay olmadan A4 hero yayınına geçilmez.

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
- Hakkımızda ve Hizmetlerimiz sayfalarının metinleri güncel kurumsal içerikle değiştirildi.
- İç sayfa hero alanlarının navbar sonrasındaki üst boşluğu bir kademe azaltıldı.
- Resmî Orbitart SVG logosu marka varlıklarına eklendi ve navbar'daki geçici işaretle değiştirildi.
- Sağlanan 30 ürün fotoğrafı içeriklerine göre yeniden adlandırıldı, WebP'ye dönüştürüldü ve web için boyutlandırıldı.
- `Product`, `ProductStatus` ve `SceneId` tipleri ile 30 kayıtlık statik taslak ürün kataloğu oluşturuldu.
- Önceki tip sözleşmesinde published kayıt için GLB zorunluluğu eklendi. Yeni hedefte yayın ve model hazırlığı ayrılacak; kod geçişi henüz yapılmadı.
- Ana sayfaya bir büyük ve dört küçük karttan oluşan responsive fotoğraf mozaiği eklendi.
- Hakkımızda sayfasına dört çalışmadan oluşan üretim detay vitrini eklendi.
- Fotoğraf vitrini merkezi ürün kayıtlarından beslenen, 3D katalog yayın durumunu değiştirmeyen ayrı bir editoryal katman olarak oluşturuldu.
- `/vitrin` rotasında 30 çalışmanın tamamını gösteren ayrı fotoğraf galerisi oluşturuldu.
- Vitrin bağlantısı masaüstü/mobil navbar ve Footer içindeki Keşfet grubuna eklendi.
- Ana sayfa ve Hakkımızda seçkileri “Tüm vitrini gör” bağlantısıyla yeni galeriye bağlandı.
- Tüm vitrin fotoğraflarının kart içindeki odak konumu merkeze sabitlendi.

## Doğrulamalar

- 2026-09-30 A4 Blade of Chaos: Sketchfab'dan indirilen 1K GLB 130.865.008 byte ve Blender'da 2.992.328 üçgen olarak ölçüldü. Renkler değiştirilmeden hedefli decimate ve doku sıkıştırma sonrası prototip 59.602 üçgen, 6.658.368 byte (~6,35 MiB) oldu. Geri içe alma: 32 mesh, 11 materyal, 18 görüntü. Poster görsel olarak incelendi ve `.blend` Blender 5.2'de açıldı. Bıçak kenarında ayrıntı kaybı var; gerçek mobil FPS/GPU bellek testi, hak ve yayın kabulü yapılmadı. Önceki Cyber Samurai `.blend` ve `.blend1` Geri Dönüşüm Kutusu'na, eski iki A4 web GLB'si ikincil arşive taşındı. Dosya yolları ve `git diff --check` doğrulandı. Uygulama kodu değişmedi; bu turda site lint/typecheck/build çalıştırılmadı.
- 2026-09-30 A4 Cyber Samurai: Leadwerks kaynak kopyası Blender'da 1 mesh/115.412 üçgen olarak ölçüldü; optimize GLB yeniden içe alındığında 1 mesh/60.014 üçgen, gömülü dokular, renk ve Z=0 tabanı doğrulandı. Dosya 17.382.336 byte'tan 4.384.456 byte'a indi (~%74,8 aktarım azalması). Yerel `.blend` Blender 5.2.2 arayüzünde açılarak kırmızı–altın–siyah görünüm kontrol edildi. Web kopyasının SHA-256'sı optimize kaynakla eşleşti. Hero entegrasyonu, gerçek cihaz testi ve site lint/typecheck/build bu yalnız medya/belge turunda yapılmadı.
- Yeni A4 inceleme GLB'si Blender'a geri alındı: 86 mesh, 72.795 üçgen, 10 içe aktarılan materyal ve 2.349.440 byte. Lisanslı maskenin 27.795 üçgenlik kısmı dosyada mevcut. Render görsel olarak incelendi; kalite kabulü verilmedi. Uygulama kodu ve web varlıkları değiştirilmedi, bu turda site lint/typecheck/build ve mobil test çalıştırılmadı.
- A4 GLB Blender'a geri alındı: 27 mesh, 35.192 üçgen, üç materyal; kaynak metrikleriyle eşleşti. Poster görsel olarak incelendi; ilk yuvarlak omuz/düz maske sürümü düzeltilip nihai kaynak yeniden üretildi. Bu turda uygulama kodu değiştirilmedi; site build ve gerçek telefon performans testi yapılmadı.

Aşağıdaki uygulama testleri önceki kod çalışmalarına aittir; 2026-09-28 doküman güncellemesinin test sonucu değildir.

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
- Kurumsal metin güncellemesi sonrasında lint, typecheck ve production build başarılı oldu.
- Hakkımızda ve Hizmetlerimiz giriş alanları ile güncel içerik sırası masaüstü tarayıcıda doğrulandı.
- Ürün kataloğundaki 30 görsel yolunun tamamı doğrulandı; eksik dosya bulunmadı.
- Ürün fotoğrafları için 30 optimize WebP üretildi; kaynak fotoğraflar değiştirilmedi.
- Resmî SVG logo çalıştırılabilir betik veya harici kaynak referansı içermediği kontrol edilerek eklendi.
- Logo ve mevcut navbar yerleşimi masaüstü tarayıcıda görsel olarak doğrulandı.
- Ürün medyası ve katalog eklemesi sonrasında lint, typecheck ve production build yeniden başarılı oldu.
- Fotoğraf vitrinleri sonrasında lint, typecheck ve production build başarılı oldu; tüm kullanıcı rotaları statik üretildi.
- Ana sayfa ve Hakkımızda vitrinleri masaüstü tarayıcıda görsel ve erişilebilirlik ağacında doğrulandı.
- Her iki vitrin 390 × 844 mobil içerik alanında doğrulandı; yatay taşma veya okunabilirlik sorunu bulunmadı.
- `/vitrin` sayfasında 30 görsel ve alternatif metnin tamamı tarayıcı erişilebilirlik ağacında doğrulandı.
- Beş bağlantılı navbar masaüstünde, Vitrin galerisi 390 × 844 mobil içerik alanında doğrulandı.
- Yeni rota sonrasında lint, typecheck ve production build başarılı oldu; `/vitrin` statik olarak üretildi.

## Bilinen eksikler

- Gerçek ürünlere ait GLB'ler henüz eklenmedi; altı temsili hizmet GLB'si ürün kayıtlarından ayrıdır. Ürün kayıtları hâlâ `draft` durumundadır.
- A4'ün kaynağı God of War konsept sanatına dayanır; model yazarı da kullanım hakkından emin olmadığını belirtiyor. CC BY atfı bu üçüncü taraf hakkını çözmez. A4 yerel prototip olarak kalacak; haklar netleşmeden hero/published statüsüne alınmayacak.
- Mevcut fotoğraf seçkisi draft kayıtları da gösteriyor; published filtresi henüz uygulanmamış. Faz 2A'da kontrollü içerik onayı, tip ve filtre geçişi birlikte yapılacak.
- Görsellerden çıkarılan ürün adları ve açıklamalar kullanıcı tarafından henüz onaylanmadı.
- Ürünlere özel mağaza URL'leri henüz sağlanmadı; geçici olarak ana mağaza bağlantısı kullanılıyor.
- Vercel bağlantısı henüz kurulmadı.

## Sonraki görev

A4 Blade of Chaos için ticari site kullanım hakkı kanıtlanırsa kullanıcı görsel onayı, görünür atıf, ortak performans ve yayın filtresi tamamlanacak. Haklar sağlanamazsa A4 slotuna hakları temiz alternatif seçilecek. Ardından Faz 2B–2E'de altılı hero ve statik süreç; Faz 3'te dört aşamalı hareket geliştirilecek.

## 2026-09-30 A4 Blade of Chaos — güncel karar

- Kullanıcı önceki bütün A4 figür kararlarını iptal ederek yalnız [DeLeon'un Blade of Chaos - God of War modelini](https://sketchfab.com/3d-models/blade-of-chaos-god-of-war-1c23158349954342ad74bc002d01007e) seçti. Kaynak sayfası CC BY gösteriyor; ancak yazarın üçüncü taraf konsept sanatına dayandığı ve haklardan emin olmadığı yönündeki yorumu nedeniyle ticari yayın engelli.
- İkincil `Blender\Orbiart\a4-blade-of-chaos` içinde kaynak GLB, düzenlenebilir `.blend`, betik, poster, metrik ve optimize prototip GLB bulunur. Renkler korunarak 2.992.328 → 59.602 üçgen ve 130.865.008 → 6.658.368 byte dönüşümü yapıldı.
- Önceki Cyber Samurai Blender kaynak ve yedeği Geri Dönüşüm Kutusu'na taşındı. Önceki üç A4 çalışma klasörü ikincil `_recovery/superseded-a4-sources/` altında; eski Cyber Samurai ve Orbit Warden web GLB'leri `_recovery/superseded-a4-web-glbs/` arşivindedir. Yeni GLB ana projeye aktarılmadı; site kodu, commit, push ve deploy değişmedi.

## 2026-09-30 A4 Cyber Samurai — geçmişte kalan karar

- Kullanıcı önceki A4 büst, maske ve karakter adaylarını iptal edip [KhoaMinh'in Cyber Samurai modelini](https://sketchfab.com/3d-models/cyber-samurai-26ccafaddb2745ceb56ae5cfc65bfed5) seçti. Kaynak sayfa CC BY 4.0 gösteriyor; kullanılan GLB, aynı kaynağa atıf yapan [Leadwerks belge örneğinin](https://www.leadwerks.com/learn/LoadModel) GitHub kopyasıdır, Sketchfab'dan doğrudan indirilmemiştir.
- Bu tarihte ikincil `Blender\Orbiart\a4-cyber-samurai` içinde kaynak, Blender dosyası, betik, poster ve metrikler tutulmuştu; Blender kaynak dosyası ve yedeği yukarıdaki yeni kararla Geri Dönüşüm Kutusu'na taşındı. O tarihte 115.412 → 60.014 üçgen ve 4.384.456 byte (~4,18 MiB) sonucu alınmıştı.
- O tarihte ana projeye `public/models/showcase/a4-cyber-samurai.glb` aktarılmıştı; yeni kararla bu kopya `a4-orbit-warden.glb` ile birlikte ikincil arşive taşındı. Seçili/yayında varlık değildir.
- Kaynak harici bir sanatçıya aittir: Orbitart tasarımı, taraması veya ürün fotoğrafının üç boyutlu karşılığı gibi sunulamaz. Yayından önce sanatçı, bağlantı, lisans ve değişiklik notu görünür olacak.

## 2026-09-29 A1 Orbit Gear üretimi

- Kurulu Blender 5.2.2 LTS ile özgün 18 dişli, altı kollu model üretildi.
- Düzenlenebilir kaynak `.blend`, web `.glb`, 1100 × 1100 poster `.webp`, yeniden üretim betiği ve ölçüm kaydı `blender/` altında tutuldu.
- GLB Blender'a yeniden alındı: 19 mesh, 22.464 üçgen, üç materyal; eksen sınırları yaklaşık X ±1,535 m, Y ±1,547 m, Z 0–0,367 m.
- GLB yaklaşık 402 KB; poster yaklaşık 19 KB. Blender renderı ve geri içe alma başarılı.
- Poster görsel olarak incelendi. Site kodu, `public/` varlıkları, ürün kayıtları ve deploy değiştirilmedi; masaüstü/mobil web testi henüz yapılmadı.

## 2026-09-29 A1 dosya yerleşimi düzeltmesi

- Kullanıcının ikincil Blender klasörü `C:\Users\esmat\OneDrive\Belgeler\Blender` olarak doğrulandı.
- A1'in `.blend`, üretim betiği, kaynak GLB, poster ve ölçüm dosyaları `Blender\Orbiart` altına taşındı. Önceki varsayılan küp `.blend1` yedeği oradaki `_recovery` klasöründe saklandı.
- Ana projeye yalnızca `public/models/showcase/a1-orbit-gear.glb` kopyalandı; kaynak ve hedef GLB SHA-256 karşılaştırmasından geçti.
- `.blend` yeni konumundan Blender arayüzünde açıldı; 18 dişli model ve parça listesi ekranda doğrulandı.
- Kaynak Blender klasörü ana Git deposunun dışında olduğundan `.blend`, poster ve betik bu deponun Git geçmişine dahil değildir.
- Son kontrol: yeni konumdaki `.blend` 19 mesh/23 nesne ile açıldı; iki GLB'nin SHA-256 özeti aynı. `git diff --check`, lint, typecheck ve production build başarılı. Web sayfasında GLB henüz kullanılmadığı için 3D web görünümü test edilmedi.

## 2026-09-29 A1 renk ve A2 üretim revizyonu

- Kullanıcı onayıyla üretim sırası A1 → A2 → A5 → A3 → A4 → A6 oldu. A1 gri çelik/koyu gri/gümüş materyale çevrildi; mor model yüzeyinden çıkarıldı. A2 beş kanatlı, saten beyaz/ince beyaz materyalli özgün pervane olarak üretildi. Her iki posterin sahnesinde koyu mor marka arka planı korundu.
- İkincil Blender klasörü `a1-orbit-gear/` ve `a2-tide-five/` olarak düzenlendi. İlk A1 koyu/mor sürümü A1 altındaki `_recovery/initial-dark-violet/` klasöründe saklandı; varsayılan küp yedeği de A1 `_recovery/` altına taşındı.
- A1: 22.464 üçgen, 19 mesh, üç materyal, yaklaşık 402 KB GLB. A2: 16.476 üçgen, 7 mesh, iki materyal, yaklaşık 260 KB GLB. İkisi de Blender GLB geri içe alma kontrolünden geçti; Z alt sınırı 0. Posterleri görsel olarak incelendi.
- Ana projeye yalnızca `public/models/showcase/a1-orbit-gear.glb` ve `public/models/showcase/a2-tide-five.glb` kopyalandı; kaynak kopyalarla SHA-256 eşleşti. `.blend`, betik, poster ve ölçümler ana Git deposu dışındadır.
- A2 Blender uygulamasında yeni klasöründen açıldı. Henüz ana sayfa 3D görünümü, mobil cihaz performansı veya poster fallback davranışı test edilmedi.
- Son doğrulama: iki kaynak GLB ile ana proje kopyalarının SHA-256 değerleri eşleşti. Geçici üretim klasörü ve ana projede `blender/` klasörü kalmadı. `git diff --check`, lint, typecheck ve production build başarılı.

## 2026-09-29 A3 ModuShell üretimi

- Kullanıcının güncel isteğiyle A3, A5'ten önce üretildi; güncel sıra A1 → A2 → A3 → A5 → A4 → A6. A3, A1 gri ve A2 beyazdan ayrılan amber sarısı gövde/kapak, koyu grafit stand ve tek kısa mor durum çizgisi taşır.
- Özgün sahne; ayrılabilir kapak, içi boş gövde, dokuz gerçek havalandırma açıklığı, iki ön bağlantı noktası, menteşeler ve 20° eğimli stand içerir. Kapak, gövde ve stand ayrı adlandırılmış GLB parçalarıdır; gerçek ürün, tarama veya mühendislik onaylı tasarım değildir.
- `.blend`, üretim betiği, kaynak `.glb`, `.webp` poster ve ölçüm raporu ikincil `Blender\Orbiart\a3-modushell` klasörüne yerleştirildi. Ana projeye yalnızca `public/models/showcase/a3-modushell.glb` kopyalandı; SHA-256 eşleşti.
- GLB Blender'a geri alındı: 17 mesh, 10.584 üçgen, üç materyal; Z alt sınırı 0 ve dosya yaklaşık 281 KB. Poster görsel olarak incelendi ve kaynak `.blend` Blender uygulamasında açıldı.
- Son doğrulama: kaynak ve web GLB SHA-256 özetleri eşleşti; geçici üretim klasörü ve ana projede `blender/` klasörü kalmadı. `git diff --check`, lint, typecheck ve production build başarılı.
- Ana sayfa 3D sahnesi, mobil cihaz performansı ve poster fallback davranışı henüz uygulanmadı veya test edilmedi.

## 2026-09-29 A5 Twin Orbit Vase ilk üretimi — sonradan değiştirildi

- Kullanıcının isteğiyle A5, A3'ün ardından üretildi; A4 sona bırakıldı. Kalan üretim sırası A6 → A4. A2'nin beyazından ayrılmak için brief'teki kırık beyaz yerine mat-saten petrol turkuazı seçildi.
- Uzun ince sol halka, kısa geniş sağ halka ve tek alçak taban ile özgün, açık negatif alanlı heykelsi form üretildi. Sıvı tutma veya üretilebilirlik onayı bulunmayan görsel konsepttir.
- `.blend`, üretim ve GLB doğrulama betikleri, kaynak `.glb`, `.webp` poster ve ölçüm raporu ikincil `Blender\Orbiart\a5-twin-orbit-vase` klasörüne yerleştirildi. Ana projeye yalnızca `public/models/showcase/a5-twin-orbit-vase.glb` kopyalandı.
- GLB Blender'a geri alındı: üç adlandırılmış mesh, 18.128 üçgen, tek dokusuz PBR materyal; Z alt sınırı 0 ve dosya yaklaşık 278 KB. Poster görsel olarak incelendi.
- Kaynak `.blend` Blender uygulamasında açıldı ve materyal görünümünde doğrulandı. Kaynak/web GLB SHA-256 özetleri eşleşti; ana projede geçici üretim veya `blender/` klasörü kalmadı. `git diff --check`, lint, typecheck ve production build başarılı.
- Ana sayfa 3D sahnesi, mobil cihaz performansı ve poster fallback davranışı henüz uygulanmadı veya test edilmedi.

## 2026-09-29 A5 çift-vazo revizyonu

- Kullanıcı ilk A5'in vazo gibi okunmadığını bildirdi. İlk `.blend`, GLB, poster, üretim/doğrulama betikleri, ölçümler ve README ikincil A5 klasöründeki `_recovery/first-loop-sculpture/` altına kopyalandı; ana projenin web GLB'si güncellenmeden önce ilk sürümle eşleştiği doğrulandı.
- Güncel A5, ortak tabandaki iki kapalı halka yerine bağımsız duran uzun ön ve kısa arka vazo olarak yeniden modellendi. Her iki formun üstünde gerçek ağız ve sığ iç boşluk, altında önden arkaya geçen yuvarlak kemer vardır. Petrol turkuazı tek dokusuz PBR materyal korundu.
- Render poster görsel olarak incelendi. GLB geri içe alındı: 2 mesh, 18.348 üçgen, tek materyal, Z alt sınırı 0, yaklaşık 420 KB. Her iki vazoda ağız altına inen boşluk ve önden arkaya açık kemer ışın testiyle doğrulandı.
- Yenilenen GLB `public/models/showcase/a5-twin-orbit-vase.glb` dosyasına kopyalandı; kaynak ve web GLB SHA-256 özeti eşleşti. Bu görsel konsept sıvı tutma veya üretilebilirlik testi değildir; web sahnesi ve mobil performans hâlâ test edilmedi.
- Güncel `.blend` Blender uygulamasında kamera ve materyal görünümünde yeniden açıldı. Bu revizyonda lint, typecheck ve production build başarılı; yerel diff kontrolü de tamamlandı.

## 2026-09-29 A5 tek modern vazo revizyonu

- Kullanıcı iki kemerli vazoyu da reddedip tek ve açıkça vazo olarak görünen modern form istedi. Çift-vazo sürümü ikincil A5 klasöründeki `_recovery/two-arch-vases/` altına bütün kaynaklarıyla yedeklendi; ilk halka sürümü de korunuyor.
- A5 tek petrol turkuazı seramik gövdeye yeniden modellendi: dolgun yuvarlak karın, dar boyun, dışa açılan ağız ve gerçek derin iç boşluk. Kemer, ikinci vazo ve platform kaldırıldı. Dosya adı mevcut web varlık yolunu bozmamak için korundu.
- Poster görsel olarak incelendi ve güncel `.blend` Blender uygulamasında açıldı. GLB geri içe alındı: 1 mesh, 21.888 üçgen, tek dokusuz materyal, Z alt sınırı 0, yaklaşık 395 KB. Merkezden ışın testi iç tabanı Z=0,28'de, gövde testini dolu olarak doğruladı.
- Kaynak ve `public/models/showcase/a5-twin-orbit-vase.glb` SHA-256 özetleri eşleşti. Lint, typecheck ve production build başarılı. Hero entegrasyonu, mobil performans ve poster fallback hâlâ uygulanmadı/test edilmedi.

## 2026-09-29 A6 Astral Lion ilk üretimi

- Onaylı brief'e göre oturan, özgün taş aslan muhafız modellendi. Katmanlı taş yele, güçlü göğüs, ön pençeler, kıvrılan kuyruk, bazalt kaide ve küçük yaşlı bronz yörünge rölyefi eklendi. Gövde sıcak eskitilmiş kireçtaşı, yele kumtaşı tonlarında; model neon içermez.
- İlk render fazla oyuncak/mascot göründüğü için `_recovery/initial-blockout/` içinde yedeklendi. Yele ve yüz oranları, taş tonları ikinci görsel turda düzeltildi. Güncel poster incelendi; model Blender uygulamasında kamera/materyal görünümünde açıldı.
- Düzenlenebilir kaynak sahne 89 ayrı parçayı korur. Web GLB'si aynı materyaldeki parçaları birleştirerek 7 mesh ve 7 materyale iner; 39.556 üçgen ve yaklaşık 1,27 MB. GLB geri içe alma ve Z=0 taban/boyut/bütçe kontrolleri geçti. Kaynak/web SHA-256 eşleşti.
- Bu özgün görsel konsept gerçek 3D tarama, tarihî eser kopyası veya üretime hazır geometri değildir. Kullanıcı görsel kabulü, hero bağlama ve gerçek cihaz performans testi beklenir.

## 2026-09-29 A6 gerçekçi taş muhafız revizyonu — taslak

- Önceki A6 görseli kullanıcı tarafından çocukça bulunup reddedildi. Daha birleşik geometriyle hazırlanan v2/v3 özgün taslakları da gerçekçilik eşiğini karşılamadığı için ana web GLB'sine aktarılmadı. Eski sürüm `_recovery/stylized-guardian/` içinde ayrıca korunur.
- Kullanıcı, lisansı doğrulanmış gerçekçi bir temel modelin Blender'da muhafız heykeline dönüştürülmesini seçti. Bu karar A6'nın önceki “tamamen sıfırdan özgün” brief'ini değiştirir; A1/A2/A3/A5 ve A4'ün özgün üretim yönünü değiştirmez.
- Kaynak: [Lion Statue - optimized](https://zenodo.org/records/10324226), nebulousflynn; kaydın açıklamasına göre [Löwe](https://sketchfab.com/3d-models/lowe-4522a4cdc1c14190bf1a8811fa27da32) / noe-3d.at CC0 taramasının optimize edilmiş türevi. Zenodo kaydı CC0 1.0 Universal gösterir. İndirilen GLB'nin MD5'i kaynak kayıttaki `77f9da14228246a2758105c2368be79f` ile eşleşti.
- İkincil `Blender\Orbiart\a6-astral-lion` klasöründe `source-lion-statue-cc0.glb` korunarak `a6-stone-guardian-cc0-draft.blend`, `.glb`, `.webp` ve ölçüm raporu hazırlandı. Taramadaki aslan anatomisi ve yele dokusu korundu; koyu kademeli kaide, sade bronz köşe parçaları ve küçük ön yüz işaretleri eklendi. Yeni düzenlenebilir sahne Blender uygulamasında kamera görünümünde açıldı.
- Taslak 13 mesh, 29.784 üçgen ve yaklaşık 4,01 MB GLB'dir. Poster görseli incelendi. Blender GLB geri içe alma kontrolü geçti: 13 mesh, 4 materyal, 29.784 üçgen, Z tabanı 0. Kaynak tarama olduğu açıkça belirtilecek; Orbitart'ın kendi taraması, sıfırdan sculpt'u veya üretilebilir 3D baskı dosyası olarak tanıtılmayacak. Gerçek cihaz testi henüz yapılmadı; ana projedeki `public/models/showcase/a6-astral-lion.glb` aynen duruyor.

## 2026-09-30 A6 sıcak kumtaşı ve kaidesiz görünüm

- Kullanıcının görselindeki kadrajı izleyerek büyük gösterim kaidesi ve ona bağlı bronz köşe/şeritler kaldırıldı; aslan taramasının kendi alçak taş altlığı bırakıldı.
- Taş rengi albedo dokusuna işlendi, böylece Blender renderında ve GLB'de aynı kumtaşı/eskitilmiş altın tonu kullanılıyor.
- Yeni Blender taslağı: `a6-warm-sandstone-cc0-draft.blend`; GLB: 1 mesh, 28.488 üçgen, 3.659.244 byte (~3,49 MiB); poster aynı sahneden üretildi.
- GLB Blender'a yeniden alındı; mesh/üçgen sayısı ve sıcak albedo doğrulandı. `public/models/showcase/a6-astral-lion.glb` güncellendi, poster `public/images/showcase/a6-astral-lion.webp` yoluna eklendi. Eski web GLB'si ikincil `_recovery/stylized-guardian` altında bulunuyor.
- A6, CC0 kaynak taramasından türemiş temsili heykeldir. Site etkileşimi, mobil GPU/bellek kabulü ve yayın durumu ayrıca kontrol edilecek.
- Son kontrol: `npm run lint`, `npm run typecheck`, `npm run build` ve `git diff --check` başarılı. Git yalnızca mevcut çalışma ağacını denetledi; commit, push ve deploy yapılmadı.

## 2026-09-28 özgün Blender rotası

- Önceki internet model adayları iptal edildi; hiçbir dosya indirilmeyecek.
- A1 Orbit Gear, A2 Tide Five, A3 ModuShell, A4 Orbit Warden, A5 Twin Orbit Vase ve A6 Astral Lion için özgün üretim brief'i oluşturuldu.
- Her modelin amacı, görsel dili, üçgen bütçesi, Blender üretim yolu ve uygulanabilir görev promptu `docs/blender-model-brief.md` içine yazıldı.
- Telifli Spider-Man prototip rotası kaldırıldı; A4 tamamen özgün bir karakter olarak yeniden tanımlandı.
- Bu turda Blender açılmadı; kod, medya, paket, ortam değişkeni, commit, push veya deploy değiştirilmedi.

## 2026-09-28 geçici model seçimi — daha sonra iptal edildi

Bu kayıt karar geçmişini korur; aşağıdaki harici modeller güncel üretim planının parçası değildir ve indirilmeyecektir.

- A1: Spur Gear seçildi.
- A2: 5 Bladed Propeller koşullu seçildi; optimizasyon zorunlu.
- A3: Eski Electronics Enclosure adayı korundu ve seçildi.
- A4: Spider-Man yalnızca yerel prototip adayı olarak kabul edildi; karakter hakları nedeniyle production yayını engelli.
- A5: Ceramic Vase 01 seçildi.
- A6: Lion Statue - optimized seçildi.
- Seçim kaydı dışında kod, medya, bağımlılık, ortam değişkeni, commit, push veya deploy değişikliği yapılmadı.
- Bu turda lint/typecheck/build ya da görsel test çalıştırılmadı; belge tutarlılığı ve diff kontrolü uygulanacak.

## 2026-09-28 ilk planlama revizyonu — tarihsel kayıt

Aşağıdaki ilk kararın yalnızca büst/ürün-fotoğraf eşleşmesi varsayımları, alttaki son düzen revizyonuyla değiştirilmiştir.

- Kullanıcı çizimine göre dikey başlık, altı GLB çemberi, tek merkez platformu ve altta HTML mağaza CTA'sı onaylandı.
- Hero tasarımı, hareket sahipliği, TS palet/CSS değişkenleri, yükleme ve fallback sözleşmesi hero-design.md içine yazıldı.
- Teslim listesi ve teknik inceleme sırası model-handoff.md içine yazıldı.
- Faz 2A–2D ve Faz 3 çıkış kriterleri güncellendi; Faz 4/5 yayın kapıları korundu.
- AGENTS.md, mimari, içerik, güvenlik ve README yeni plana bağlandı.
- Yalnızca belgeler düzenlendi; kod, medya, bağımlılık ve ortam değişkeni değişikliği yapılmadı.
- Bu turda uygulama lint/typecheck/build veya görsel test çalıştırılmadı; belge doğrulaması kullanıldı.
- Belge içi yerel Markdown bağlantıları kontrol edildi; eksik hedef bulunmadı. `git diff --check` başarılı oldu.
- Tur başı ve sonu SHA-256 karşılaştırmasıyla `src/` ve `public/` dosyalarının değişmediği doğrulandı; önceden mevcut kullanıcı değişiklikleri korundu.

## 2026-09-28 son düzen ve teknik/yaratıcı denge revizyonu

- Son sayfa sırası: mevcut Navbar → üç teknik + üç yaratıcı GLB'li hero → iki hizmet yönlendirmesi → Taramadan Üretime → mevcut 1+4 fotoğraf → müşteri çalışma süreci → iletişim/Footer.
- products.ts gerçek ürünleri, hedef model-assets.ts 3D varlıkları yönetir. Harici modele sahte satış ürünü/fotoğraf eşleşmesi yapılması önlendi.
- Gerçek ürün fotoğrafı ile temsili modelin render posteri ayrıldı. Kaynak sitenin önizlemesi otomatik izinli sayılmadı.
- Tarama bir nesne kategorisi değil yöntemdir. Süreç animasyonu gerçek nokta bulutu/CAD onarımı veya üretim kanıtı değildir; aynı teknik GLB'den türetilir.
- Hero ve süreç için ortak Canvas/renderer, görünürlük bazlı çizim, önbellek ve kontrollü kaynak sahipliği tanımlandı. Performans garantisi verilmedi; gerçek dosya/cihaz kabul kapısı korundu.
- Faz 2A–2E: model hakları/veri ayrımı, altılı hero ve statik süreç; Faz 3: dört aşamalı tarama hareketi ve bölüm geçişleri. Faz 4/5 test ve güvenlik/yayın kapıları korundu.
- Altı ücretsiz indirme adayı resmi üretici/varlık sayfalarından araştırıldı; model-candidates.md kaynak, lisans, format belirsizliği ve kullanıcı seçimi durumunu içerir. Hiçbir model indirilmedi.
- Mevcut .cursor/rules/orbiart-core.mdc incelendi; AGENTS.md'ye yönlendirmesi yeterli olduğundan ikinci bir tasarım kuralı çoğaltılmadı.
- Bu revizyon yalnızca belgeleri kapsar. Kod, medya, paket, gizli değer, commit, push veya deploy değişikliği yapılmadı.
- Son revizyon doğrulaması: 18 yerel Markdown bağlantısı kontrol edildi; eksik hedef yok. `git diff --check` başarılı. Tur başı/sonu SHA-256 karşılaştırmasında src/ ve public/ altındaki 58 dosya değişmedi; mevcut kullanıcı değişiklikleri korundu.
- Uygulama lint/typecheck/build ve görsel test çalıştırılmadı; yukarıdaki sonuçlar geçmiş uygulama çalışmalarına aittir.

## Mimari kararlar

- İlk sürüm backend, CMS ve veritabanı içermez.
- Ürün yönetimi tip güvenli statik içerik dosyası üzerinden yapılır.
- Fotoğraf temel içerik, 3D görüntüleyici progressive enhancement olarak ele alınır.
- Hedef: yalnızca published fotoğraf içeriği gösterilir; GLB hazırlığı bağımsız doğrulanır. Mevcut filtre eksikliği Faz 2A işidir.
- Normal hero: altı gerçek GLB (3 teknik + 3 yaratıcı), elle atanmış palet ve ortak nötr ana ışık. Hero/süreç bir renderer paylaşır.
- Gerçek ürünler ve temsili 3D varlıklar ayrı kayıttır; hak, yayın ve teknik hazırlık ayrı kontrol edilir.
- Sayfa düzeni sabittir; model seçimi ve doğrulanmış hizmet metinleri bu düzen içinde kesinleştirilir.
- Production deploy kullanıcı onayı gerektirir.
