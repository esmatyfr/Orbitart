# Orbiart Mimari Rehberi

## 1. Sistem sınırı

İlk sürüm, Vercel üzerinde yayınlanan statik ağırlıklı bir Next.js tanıtım sitesidir. Backend, veritabanı, CMS, üyelik ve ödeme içermez. Ürün kataloğu TypeScript dosyasından, fotoğraflar ve GLB modelleri `public/` altından okunur.

Temel veri akışı:

```text
src/content/products.ts
        │
        ├─ status === "published" filtresi
        │
        └─ ürün vitrini
             ├─ gerçek ürün fotoğrafı
             ├─ seçilen sahne preset'i
             ├─ lazy-loaded GLB görüntüleyici
             └─ mağaza CTA'sı
```

## 2. Hedef klasör yapısı

```text
Orbiart/
├─ AGENTS.md
├─ README.md
├─ .env.example
├─ docs/
│  ├─ architecture.md
│  ├─ roadmap.md
│  ├─ security.md
│  ├─ content-guide.md
│  └─ progress.md
├─ public/
│  ├─ images/
│  │  ├─ brand/
│  │  └─ products/
│  └─ models/
│     └─ products/
└─ src/
   ├─ app/
   │  ├─ layout.tsx
   │  ├─ page.tsx
   │  ├─ hakkimizda/page.tsx
   │  ├─ hizmetlerimiz/page.tsx
   │  └─ iletisim/page.tsx
   ├─ components/
   │  ├─ layout/
   │  ├─ ui/
   │  ├─ products/
   │  └─ three/
   ├─ content/
   │  ├─ products.ts
   │  ├─ scenes.ts
   │  └─ site-config.ts
   ├─ lib/
   │  ├─ links.ts
   │  ├─ validation.ts
   │  └─ device-capabilities.ts
   ├─ types/
   │  ├─ product.ts
   │  └─ scene.ts
   └─ styles/globals.css
```

## 3. Sayfa sorumlulukları

### Ana sayfa `/`

- 3D hero ve ana marka mesajı
- 3D Baskı, 3D Tarama ve Özel Tasarım hizmetleri
- Yayındaki ürünlerden seçilmiş vitrin
- Mağaza ve teklif CTA'ları

### Hakkımızda `/hakkimizda`

- Orbitart marka hikâyesi
- Bodrum ve üretim odağı
- Tasarım, tarama, baskı ve son işlem yaklaşımı

### Hizmetlerimiz `/hizmetlerimiz`

- Hizmet detayları ve çalışma adımları
- Beklenti ve teslim kapsamları
- WhatsApp teklif CTA'sı

### İletişim `/iletisim`

- WhatsApp ve Instagram bağlantıları
- Mağaza yönlendirmesi
- İlk sürümde form gönderimi veya veri toplama yoktur

## 4. Bileşen sınırları

- `components/layout`: Navbar, Footer, mobil menü ve sayfa kabuğu.
- `components/ui`: Buton, başlık, kart, section ve hareket sarmalayıcıları.
- `components/products`: Ürün kartı, vitrin düzeni, fotoğraf ve ürün metadata'sı.
- `components/three`: Canvas sınırı, GLB model, kontroller, ışık ve fallback.

Server Component varsayılandır. `"use client"` sadece aşağıdaki ihtiyaçların en küçük ortak sınırında kullanılır:

- React state veya effect
- Tarayıcı/WebGL yetenek kontrolü
- React Three Fiber
- OrbitControls
- Framer Motion istemci etkileşimi

## 5. Ürün modeli

Planlanan sözleşme:

```ts
type SceneId = "dark-studio" | "purple-gallery" | "white-studio";
type ProductStatus = "draft" | "review" | "published";

type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  model: string;
  storeUrl: string;
  scene: SceneId;
  status: ProductStatus;
};
```

`slug`, medya yolları ve mağaza URL'si benzersiz/geçerli olmalıdır. Ziyaretçiye gönderilen koleksiyon her zaman `status === "published"` ile filtrelenir.

## 6. Sahne sistemi

`scenes.ts`, ürünlerden bağımsız üç preset tanımlar:

- `dark-studio`: koyu arka plan, kontrollü kenar ışığı ve dramatik kontrast.
- `purple-gallery`: Orbitart moru ile galeri hissi ve yumuşak zemin gölgesi.
- `white-studio`: açık arka plan, nötr materyal okuması ve ürün odaklı ışık.

Her preset; arka plan, çevresel ışık, yönlü ışıklar, zemin, gölge, kamera konumu ve kontrollerin başlangıç hedefini kapsar. Ürün kaydı yalnızca preset kimliğini taşır.

## 7. 3D ve fallback akışı

1. Sayfa önce ürün fotoğrafını ve metnini render eder.
2. Görüntüleyici görünür alana yaklaştığında istemci paketi yüklenir.
3. WebGL ve cihaz yeteneği kontrol edilir.
4. GLB yüklenirken sabit oranlı loading alanı gösterilir.
5. Model yüklenirse sahne preset'i ve kontroller etkinleşir.
6. WebGL yoksa, model hata verirse veya düşük performans politikası devreye girerse gerçek fotoğraf gösterilir.

Fotoğraf her zaman içerik ve SEO kaynağıdır; 3D deneyim progressive enhancement olarak uygulanır.

## 8. Responsive davranış

- Masaüstü: fotoğraf solda, 3D görüntüleyici sağda; dengeli iki sütun.
- Tablet: alan korunabildiğinde iki sütun, aksi durumda kontrollü tek sütun.
- Mobil: fotoğraf, ürün bilgisi ve “3D İncele” sırasıyla alt alta.
- Canvas yüksekliği ekranı kaplamamalı; dokunmatik kaydırmayı engellememelidir.
- Mobilde gölge, DPR ve ışık maliyeti azaltılır.
