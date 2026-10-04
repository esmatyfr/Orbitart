# Orbiart

Orbitart için Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber ve Framer Motion ile geliştirilecek statik tanıtım sitesi.

## Mevcut durum

Faz 3, kullanıcının tasarım, mobil kullanım ve test kabulüyle 2026-10-04'te kapatıldı. Altı modelli yatay sergi hattı, aynı modelle Neler Yapıyoruz incelemesi, iki hizmet kartı, beş aşamalı Taramadan Üretime ve FDM yazıcı animasyonu hazırdır. Ana sayfanın 1+4, Hakkımızda'nın 4 ve `/vitrin` galerisinin 30 fotoğrafı, alt sayfa hareketleri ve Yörüngeli O logosu korunur. Faz 4 uygulandı: merkezi bağlantılar/hazır WhatsApp mesajı, metadata/canonical, sitemap/robots, marka ikonları/paylaşım görseli, 404 ve kontrollü Vercel Preview hazırdır. [Preview](https://orbitartt-ks916xf13-esmatyfr.vercel.app) kullanıcı tarafından sorunsuz kabul edildi; Vercel hesabıyla giriş isteyebilir. Tanıtım hedefi `https://orbitartt.com`, mağaza `https://orbitart.com.tr` olarak ayrıdır. Production ve alan adı taşıma Faz 5 onayına bağlıdır.

Altı model kullanıcı teknik/yayın onayıyla `approved`/`published` durumundadır; production build desteklenen tarayıcıda 3D sahneyi açar. Poster fallback'i korunur. Agent doğrulamaları ve kullanıcı test kabulünün ayrı kayıtları için [progress.md](docs/progress.md) belgesine bakın. Public GLB dosyalarının erişilebilirliği yayın filtresinden bağımsızdır.

## Belgeler

- [Mimari](docs/architecture.md)
- [Yol haritası](docs/roadmap.md)
- [Güvenlik](docs/security.md)
- [Vercel Preview ve yayın rehberi](docs/deployment.md)
- [İçerik ekleme rehberi](docs/content-guide.md)
- [İlerleme durumu](docs/progress.md)
- [Onaylı hero tasarımı](docs/hero-design.md)
- [Güncel altı model durumu ve yayın kapısı](docs/models.md)
- [Eski Blender denemeleri ve karar arşivi](docs/archive/README.md)

Blender kaynakları ikincil `C:\Users\esmat\OneDrive\Belgeler\Blender\Orbiart` klasöründe model başına ayrı dizinlerdedir. Altı web GLB `public/models/showcase/`, posterleri `public/images/showcase/` altındadır.

## Temel sınırlar

- İlk sürümde backend, veritabanı ve CMS yoktur.
- Ürünler geliştirici tarafından statik içerik dosyasına eklenir.
- Fotoğraf galerileri GLB gerektirmez. Gerçek ürünler ile temsili hizmet modelleri ayrı yönetilir; temsili modeller portföy/satış ürünü olarak sunulmaz.
- Hero ve süreç tek ortak renderer kullanır; temsili model için render poster fallback'i vardır.
- Taramadan Üretime, aynı modelden türetilmiş temsili yüzey/nokta/tel kafes, katmanlı baskı ve tamamlanan parça animasyonudur; gerçek ölçüm veya CAD dönüştürme aracı değildir.
- Hedef yayın ortamı Vercel'dir.

## Yerel geliştirme

```bash
npm install
npm run dev
```

Aynı Wi-Fi'daki telefondan geliştirme sunucusuna `http://192.168.1.105:3000` ile erişilebilir. Next.js geliştirme bağlantıları için bu bilgisayar adresi `next.config.ts` içindeki `allowedDevOrigins` listesinde tanımlıdır. Bilgisayarın IP'si değişirse güncel IP'yi `ipconfig` ile bulun, bağlantı adresiyle bu listeyi güncelleyin ve sayfayı yeniden yükleyin; geniş joker izin eklemeyin. Bu ayar production yayınını etkilemez.

Kalite kontrolleri:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:build
```

Testler Node'un TypeScript strip desteğini kullanır (yerel doğrulama Node 24.19.0 ile yapılmıştır). `test:build` son production HTML'ini okur; tarayıcı/WebGL testinin yerine geçmez. İlk üç süreç posteri gerektiğinde `node scripts/render-process-posters.mjs` ile A1'den yeniden üretilebilir; baskı/sonuç posterleri Blender yazıcı kaynağından gelir.
