# Orbiart Project Instructions

## Proje amacı

Orbitart için Next.js App Router tabanlı, premium görünümlü, performans ve görsel deneyim odaklı bir tanıtım sitesi geliştir. İlk sürüm statiktir; backend, veritabanı, CMS, kullanıcı hesabı ve ödeme akışı ekleme.

## Talimat önceliği

1. Kullanıcının güncel isteği
2. Bu `AGENTS.md`
3. Görevle ilgili `docs/*.md` belgesi
4. Mevcut kod, tipler ve testler
5. Güvenli ve en dar kapsamlı varsayım

Çelişki çözülmeden geniş kapsamlı değişiklik yapma. Eksik bilgi güvenli biçimde ertelenebiliyorsa yer tutucu veya merkezi yapılandırma kullan; gizli ya da harici sistem bilgisi uydurma.

## Kaynak belgeler

- Mimari ve klasör sınırları için `docs/architecture.md`.
- Faz sırası ve çıkış kriterleri için `docs/roadmap.md`.
- Ortam değişkenleri ve yayın güvenliği için `docs/security.md`.
- Ürün, fotoğraf ve GLB ekleme kuralları için `docs/content-guide.md`.
- Mevcut durum ve sonraki görev için `docs/progress.md`.

Yalnızca görevle ilgili belgeleri oku. Bir faz tamamlandığında `docs/progress.md` dosyasını güncelle.

## Teknoloji ve kapsam sınırları

- Next.js App Router, TypeScript ve Tailwind CSS kullan.
- 3D içerik için `@react-three/fiber` ve `@react-three/drei` kullan.
- Arayüz hareketleri için Framer Motion kullan.
- Hedef yayın ortamı Vercel'dir.
- Ürünleri `src/content/products.ts` içinde tip güvenli statik veri olarak yönet.
- Sahne ayarlarını `src/content/scenes.ts`, herkese açık site bağlantılarını `src/content/site-config.ts` içinde merkezileştir.
- Sadece `published` ürünleri ziyaretçiye göster.
- Hazır `.glb` modelleri kullan; fotoğraftan otomatik 3D üretim ekleme.
- Kullanıcının onayı olmadan backend, CMS, analytics, form servisi veya yeni bir dış servis ekleme.

## Kodlama kuralları

- Server Component varsayılanını koru; yalnızca tarayıcı API'si, React state/effect, Framer Motion veya Three.js gereken en küçük sınırda `"use client"` kullan.
- Bileşenleri sorumluluğuna göre `layout`, `ui`, `products` ve `three` altında tut.
- Tekrarlanan veri ve sahne ayarlarını JSX içine gömme; içerik ve yapılandırma dosyalarına taşı.
- TypeScript strict uyumunu koru; `any` ve denetimsiz type assertion kullanma.
- Erişilebilir HTML, klavye odağı, anlamlı alt metin ve `prefers-reduced-motion` desteği sağla.
- Mevcut kullanıcı değişikliklerini koru; görev dışı dosyaları yeniden biçimlendirme veya değiştirme.
- Yeni bağımlılık eklemeden önce mevcut yığınla çözülemeyeceğini doğrula.

## Medya ve 3D kuralları

- Ürün fotoğraflarını `public/images/products/`, marka varlıklarını `public/images/brand/` altında tut.
- GLB modellerini `public/models/products/` altında tut.
- Dosya adlarında küçük harf, ASCII ve tire kullan.
- 3D görüntüleyiciyi lazy-load et; yükleme, hata, WebGL yokluğu ve düşük performans için gerçek ürün fotoğrafı fallback'i sağla.
- Sahne, ışık, zemin, gölge ve başlangıç kamerasını ürün bileşenine gömmek yerine seçilen sahne preset'inden üret.

## Güvenlik ve gizlilik

- Gizli değerleri kaynak koda, Git geçmişine, loglara, görsellere veya `NEXT_PUBLIC_*` değişkenlerine koyma.
- Yerel gizliler yalnızca `.env.local`, Vercel gizlileri yalnızca ilgili Development/Preview/Production ortamında tutulur.
- Repoda yalnızca sahte/boş örnek değerler içeren `.env.example` bulunur.
- Mağaza URL'si, Instagram profili ve ziyaretçinin kullanacağı WhatsApp hedefi herkese açık yapılandırmadır; parola veya API anahtarı değildir.
- Dış URL'leri `https:` ile sınırla; yeni sekme bağlantılarında `noopener noreferrer` kullan.
- Deploy, alan adı, harici servis, anahtar yenileme veya veri silme işlemi için kullanıcı onayı al.

## Çalışma ve tamamlanma standardı

1. İlgili fazı ve belgeleri belirle.
2. Değişikliği yalnızca o fazın kapsamıyla sınırla.
3. İlgili lint, typecheck, test ve production build kontrollerini çalıştır.
4. Değişiklik görselse masaüstü ve mobil görünümü doğrula.
5. Güvenlik etkisi varsa `docs/security.md` kontrol listesini uygula.
6. Sonuçları ve kalan işleri `docs/progress.md` içine yaz.

Bir iş; istenen davranış uygulanmadan, ilgili kontroller geçmeden, erişilebilirlik/fallback davranışı doğrulanmadan ve ilerleme belgesi güncellenmeden tamamlandı sayılmaz.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
