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
- Onaylanan ana sayfa kompozisyonu ve hareket sözleşmesi için `docs/hero-design.md`.
- Altı GLB'nin güncel dosya, hak ve kabul durumu için `docs/models.md`.
- İptal edilen model brief'leri ve uzun geçmiş yalnız `docs/archive/` altındadır; güncel talimat sayılmaz ve görev gerektirmedikçe okunmaz.

Yalnızca görevle ilgili belgeleri oku. Bir faz tamamlandığında `docs/progress.md` dosyasını güncelle.

## Teknoloji ve kapsam sınırları

- Next.js App Router, TypeScript ve Tailwind CSS kullan.
- 3D içerik için `@react-three/fiber` ve `@react-three/drei` kullan.
- Arayüz hareketleri için Framer Motion kullan.
- Hedef yayın ortamı Vercel'dir.
- Ürünleri `src/content/products.ts` içinde tip güvenli statik veri olarak yönet.
- Sahne ayarlarını `src/content/scenes.ts`, herkese açık site bağlantılarını `src/content/site-config.ts` içinde merkezileştir.
- Ürün satış/detay akışında yalnız `published` kayıtları göster. Fotoğraf portföyü ayrı bir editoryal yayın kararıdır: onaylı 30 fotoğraf `src/content/showcase.ts` içinde açık listeyle seçilir; ürünün `draft` olması fotoğrafın vitrindeki onayını geri almaz. Yeni ürünler galeriye otomatik girmez.
- Fotoğraf yayını GLB gerektirmez. Gerçek ürünler products.ts, temsili ve sahip olunan 3D varlıklar hedef src/content/model-assets.ts içinde ayrı yönetilir. Hero yalnızca kullanıcı tarafından seçilmiş, published, lisans ve teknik kontrolleri geçmiş varlıkları kullanır. Kod geçişi Faz 2A işidir; plan onayı uygulanmış kod değildir.
- Mevcut Faz 2 düzeni: ortalanmış başlık, altı gerçek GLB (üç teknik + üç yaratıcı), Projenizi Konuşalım ve Mağazaya Git HTML bağlantıları; ardından iki hizmet yönlendirmesi, Taramadan Üretime, mevcut 1+4 fotoğraf seçkisi, çalışma süreci ve iletişim. Faz 3 için onaylanan inceleme akışında model bilgisi ile bu iki hizmet kartı aynı “Neler Yapıyoruz” bölümünde birleşecek; Faz 2'de scroll animasyonu veya bölüm taşıması yapılmaz. Ayrıntı hero-design.md içinde; kullanıcı istemeden başka bölüm değişikliği yapma.
- Hero ve tarama bölümü tek paylaşılan Canvas/renderer kullanır; görünür sahneler kontrollü çizilir. Normal hero altı modeli içerir. Desteklenmeyen cihazlar veya kalıcı düşük performans için uygun poster fallback'i sağlanır.
- Ana sayfadaki 1 büyük + 4 küçük fotoğraf seçkisini, Hakkımızda seçkisini ve `/vitrin` fotoğraf galerisini koru; bütün galeriye GLB zorunluluğu ekleme.
- Hero seçkisi ve elle belirlenen paletler `src/content/hero-showcase.ts` dosyasından, ortak sahne hedef `src/content/scenes.ts` dosyasından yönetilir. Palet yalnız ana sayfanın hero bölümüne uygulanır; sayfa kökü, navbar ve alt bölümlerin koyu mor marka teması model seçimiyle değişmez. Hero biterken zemin ana temaya yumuşak geçer.
- İlk ana sayfa 3D alanında koyu kutu/çerçeve yerine hero zemininde saydam sahne ve altı model için tek, küçük, parlak siyah ortak platform kullan; platformla modeller arasında küçük ama görünür boşluk bırak. Hafif yansıma hissi ve yukarı yönlü vurgu ışığı performanslı olmalı; gerçek model aynalaması zorunlu değildir. Süreç 3D alanına bu platformu taşıma. Tek Canvas/renderer teknik mimarisi korunur.
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
- Gerçek ürün GLB'lerini `public/models/products/`, temsili hizmet GLB'lerini `public/models/showcase/`, onların render posterlerini `public/images/showcase/` altında tut.
- Blender çalışma kaynakları (düzenlenebilir `.blend`, üretim betiği ve poster) ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart` klasöründe, her modelin kendi `a1-orbit-gear/`, `a2-tide-five/` gibi dizininde tutulur. Ana projeye yalnızca web için seçilen `.glb` kopyalanır; sonraki medya aktarımı kullanıcının güncel isteğine göre yapılır.
- Harici modelleri Orbitart üretimi gibi gösterme. Kaynak, üretici, lisans, atıf ve yapılan değişiklikleri kaydet; tarama efekti gerçek tarama/CAD onarımı veya üretilebilirlik kanıtı değildir.
- Dosya adlarında küçük harf, ASCII ve tire kullan.
- 3D görüntüleyiciyi lazy-load et; yükleme, hata, WebGL yokluğu ve düşük performans için gerçek ürün için fotoğraf, temsili varlık için aynı modelden üretilmiş render poster fallback'i sağla.
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

Yalnızca Markdown/planlama değişikliklerinde belge bağlantılarını, tutarlılığı ve diff'i doğrula; uygulama lint/typecheck/build ve görsel testleri çalıştırılmadıysa geçmiş sonuçları yeni doğrulama gibi sunma. Kod uygulamasında yukarıdaki kontroller geçerlidir.

Bir iş; istenen davranış uygulanmadan, ilgili kontroller geçmeden, erişilebilirlik/fallback davranışı doğrulanmadan ve ilerleme belgesi güncellenmeden tamamlandı sayılmaz.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
