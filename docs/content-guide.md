# Orbiart Ürün ve Medya Rehberi

## 1. İçerik yönetim modeli

İlk sürümde yönetim paneli yoktur. Ürünler geliştirici tarafından `src/content/products.ts` dosyasına eklenir. Bir içerik değişikliği yeni build ve deploy gerektirir.

## 2. Ürün alanları

Her ürün şu alanları içermelidir:

- `slug`: benzersiz, URL uyumlu kimlik
- `name`: ürün adı
- `category`: ürün kategorisi
- `description`: kısa, özgün açıklama
- `image`: gerçek ürün fotoğrafının `/images/products/...` yolu
- `imageAlt`: fotoğrafı açıklayan erişilebilir metin
- `model`: optimize GLB dosyasının `/models/products/...` yolu
- `storeUrl`: doğrulanmış HTTPS mağaza bağlantısı
- `scene`: `dark-studio`, `purple-gallery` veya `white-studio`
- `status`: `draft`, `review` veya `published`

## 3. Yayın durumları

- `draft`: içerik eksik veya hazırlık aşamasında; sitede görünmez.
- `review`: metin, fotoğraf, model ve bağlantı kontrol edilir; sitede görünmez.
- `published`: tüm kontroller tamamlanmıştır; vitrin ve galeride görünebilir.

Durumu doğrudan `published` yapmak yerine yeni ürünü önce `draft`, sonra `review` aşamasından geçirmek varsayılan süreçtir.

## 4. Yeni ürün ekleme akışı

1. Benzersiz ürün slug'ı belirle.
2. Gerçek ürün fotoğrafını hazırla ve `public/images/products/` altına ekle.
3. Web için optimize GLB dosyasını `public/models/products/` altına ekle.
4. Ürün kaydını `draft` durumuyla oluştur.
5. Sahne preset'ini seç.
6. Mağaza URL'sini `https:` ve doğru domain açısından kontrol et.
7. Fotoğraf, alt metin, model yükleme, materyal, kamera ve mobil fallback'i kontrol et.
8. Kaydı `review` durumuna al ve production build çalıştır.
9. Kontroller geçince `published` yap.
10. Preview sonucunu doğrula ve kullanıcı onayından sonra yayınla.

## 5. Dosya adlandırma

- Küçük harf, ASCII karakter ve tire kullan.
- Boşluk, Türkçe karakter ve sürüm dışı rastgele ek kullanma.
- Fotoğraf ve model için aynı ürün kök adını tercih et.

Örnek:

```text
public/images/products/forest-dragon-bustu.webp
public/models/products/forest-dragon-bustu.glb
```

## 6. Fotoğraf kuralları

- Ürünü doğru temsil eden gerçek fotoğraf kullan.
- Mümkünse WebP veya AVIF türevi üret; kaynak kaliteyi koru.
- Görüntüde gereksiz kişisel bilgi, adres, belge veya yansıma olmadığını kontrol et.
- Sabit ürün vitrin oranına uygun kırpma hazırla.
- Dosya boyutunu görsel kaliteyi bozmadan azalt.
- `imageAlt` ürünün ne olduğunu açıklar; “ürün resmi” gibi anlamsız metin kullanılmaz.

## 7. GLB optimizasyon kuralları

- Modelin ölçüsü, yönü ve pivot'u tutarlı olmalıdır.
- Gereksiz mesh, görünmeyen yüz, animasyon ve materyalleri kaldır.
- Texture çözünürlüklerini gerçek ekran ihtiyacına göre düşür.
- Texture'ları uygun sıkıştırma ve renk uzayıyla dışa aktar.
- Materyallerin web/Three.js ortamında doğru göründüğünü test et.
- Model yükleme süresini ve mobil bellek kullanımını kontrol et.
- Optimize edilmiş dosya hedefi ürün karmaşıklığına göre belirlenir; büyük dosya istisnası `docs/progress.md` içinde gerekçelendirilir.

## 8. Sahne seçimi

- `dark-studio`: açık/parlak ürünler ve dramatik sunum.
- `purple-gallery`: marka vurgusu istenen öne çıkan ürünler.
- `white-studio`: koyu ürünler ve materyal detayının nötr okunması.

Ürün kaydı ışık veya kamera değerlerini tek tek değiştirmez. Yeni görsel ihtiyaç tüm ürünlerde tekrar kullanılacaksa yeni preset olarak değerlendirilir.

## 9. Yayın kontrol listesi

- Ürün adı, kategori ve açıklama doğrulandı.
- Fotoğraf yolu çalışıyor ve alt metin mevcut.
- GLB masaüstü ve mobilde yükleniyor.
- Döndürme ve zoom sınırları kullanışlı.
- Seçilen sahne ürünü doğru gösteriyor.
- WebGL/GLB hata fallback'i fotoğrafı gösteriyor.
- Mağaza URL'si HTTPS ve doğru hedef.
- `draft` ve `review` kayıtları ziyaretçiye görünmüyor.
- `published` kayıt beklenen sıralamada görünüyor.
- Production build başarılı.
