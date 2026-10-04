# Orbiart İçerik ve Medya Rehberi

Revizyon: 2026-09-30. Hedef iş akışı; kod geçişi Faz 2A'dadır. [Mimari](architecture.md), [tasarım](hero-design.md), [güncel model durumu](models.md).

## Ürün ve hizmet modeli

Panel yoktur. products.ts gerçek Orbitart ürünleri/fotoğraflarını yönetir. Ürün alanları: slug, name, category, description, image, imageAlt, HTTPS storeUrl, status; GLB/model null olabilir. Fotoğraf yayını model gerektirmez.

Temsili 3D varlıklar model-assets.ts içinde ayrı kayıttır: assetId, başlık, model/poster, sourceKind, kaynak/üretici/lisans/atıf, rightsStatus, technicalStatus, yayın status'u. Harici varlık için ürün adı, gerçek ürün fotoğrafı veya mağaza ürün eşleşmesi uydurulmaz.

hero-showcase.ts altı assetId, 3 teknik + 3 yaratıcı slot, sıra/palet/yön ayarlarını; scan-process.ts sabit teknik örnek ve dört aşamayı tutar. scenes.ts ortak sahne ayarlarını taşır. İsim ve medya yolları JSX'te çoğaltılmaz. Build/deploy içerik güncellemesini yayına taşır.

## Yayın durumu

- Ürün `draft`: satış/detay kaydı hazırlıktadır; mağaza ürünü olarak gösterilmez.
- Ürün `review`: içerik kontrolündedir; mağaza ürünü olarak gösterilmez.
- Ürün `published`: satış/detay akışına alınabilir; GLB isteğe bağlıdır.
- Fotoğraf portföyü ayrı editoryal onay kullanır. Kullanıcının onayladığı 30 fotoğraf `showcase.ts` içindeki açık slug listesinde bulunur; ürün `draft` olsa bile yalnız temel fotoğraf ve başlık alanları vitrinde görünür.
- Model görünürlüğü ayrıca onaylı haklar, teknik olarak hazır GLB/poster ve kullanıcı seçimi gerektirir.

Yeni bir ürün fotoğrafı, `showcase.ts` onay listesine açıkça eklenmedikçe vitrinde görünmez. Model seçilmesi teknik kabul veya yayımlama değildir.

## Gerçek fotoğraf ekleme

1. İsim, kategori, kısa açıklama ve fotoğrafın müşteriye ait/izinli olduğunu doğrula; ölçü/malzeme uydurma.
2. Orijinali koruyarak WebP/AVIF türevi hazırla; public/images/products altına koy.
3. Alt metin ve doğrulanmış mağaza URL'si ekle. Fotoğraf portföyüne alınacaksa slug'ı ayrıca `showcase.ts` onay listesine ekle; satış için review ardından published durumunu kullan.
4. Galeri listesi, bağlantılar, responsive görünüm ve kod kontrollerini doğrula.

Mevcut ana sayfa 1+4, Hakkımızda seçkisi ve `/vitrin` içindeki 30 fotoğraf korunur. `/vitrin` görsel portföy seçkisidir; oradaki fotoğrafın yer alması ürün kaydının mağazada satışta veya `published` olduğu anlamına gelmez. Teknik proje fotoğrafı sağlanmadan stok modelin render'ı “Üretimlerimiz” listesine eklenmez.

## Model ekleme

1. Kullanıcının seçimini ve mevcut hak durumunu `models.md` üzerinden kontrol et; arşivdeki eski adayları güncel kabul etme.
2. Kaynak ve lisansın ticari kullanım, değiştirme ve public GLB dağıtımına izin verdiğini doğrula. CC BY için üretici/kaynak/lisans/değişiklik atfını hazırla. Çelişkili veya NC/ND/editorial kaynakları beklet.
3. Yetkili indirmeyle tam geometri/doku paketini al. glTF'yi gerekiyorsa gömülü dokulu GLB'ye dönüştür.
4. Teknik inceleme/optimizasyon yap; orijinali koru. Gerçek ürün public/models/products, temsili varlık public/models/showcase altında tutulur.
5. Gerçek ürüne gerçek fotoğraf; temsili modele kendi render posterini public/images/showcase altında oluştur. Kaynak sitenin tanıtım fotoğrafını izinsiz kopyalama.
6. asset kaydında hak ve teknik hazırlığı işaretle; hero'da hizmet etiketi/palet ve slotu bağla.
7. Temsili kullanım bilgisini ve gereken atıfları görünür yap. Atıflar /model-kaynaklari sayfasında; hero'dan ve Footer'daki küçük bağlantıdan erişim sağlanır. Hakkımızda içinde ayrı bir kaynak bölümü yoktur.
8. Altılı toplam bütçe, süreçte aynı varlığın paylaşımı, fallback ve kod kontrollerini doğrula.

## Süreç ve metinler

Taramadan Üretime: fiziksel numune → tarama verisi → dijital model → 3D baskı → üretim sonucu. Nokta görünümü, wireframe ve tamamlanan çark aynı A1 GLB'nin temsili sunumlarıdır. Kullanıcının seçtiği markasız FDM yazıcı ayrı özgün süreç aksesuarıdır; model-assets.ts kaydı ve Blender kaynakları vardır, altılı hero seçimine dahil edilmez. Gerçek cihaz çıktısı/CAD onarımı/üretim fotoğrafı veya çalıştırılabilir baskı yolu sayılmaz. Gerçek olmayan ölçü, tolerans, su/UV dayanımı veya sertifikasyon eklenmez.

Çalışma süreci ayrı amaca sahiptir: müşterinin talebi → değerlendirme ve onay → teslim. Aynı teknik beş adım iki kez anlatılmaz. Hizmetlerimiz teknik/yaratıcı yönlendirme anchor'ları içerir. Metinlerde mevcut “milimetrik” gibi iddialar müşteri doğrulaması yoksa “projenin gerektirdiği doğruluk değerlendirilerek” gibi ölçüsüz ifadeyle değiştirilir.

## Optimizasyon ve gizlilik

Küçük harf/ASCII/tire dosya adları, metadata ve harici URI kontrolü, nötr ana ışık ve doğru ön yön esastır. Toplam aktarım, üçgen/materyal/draw call, açılmış doku belleği ayrı ölçülür. Draco/Meshopt/KTX2 yalnızca ihtiyaç ve decoder maliyetiyle değerlendirilir. Başlangıç bütçeleri hero-design.md içindedir.

GLB public varlıktır; üretim ana dosyası veya müşteri gizli verisi yayınlanmaz. Aynı model süreç için tekrar indirilmez. İndirilebilir olması lisansın ayrıca doğrulanmasını gerektirir.
