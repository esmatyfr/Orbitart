# Orbiart

Orbitart için Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber ve Framer Motion ile geliştirilecek statik tanıtım sitesi.

## Mevcut durum

Faz 1 tamamlanmıştır: Next.js iskeleti, dört temel rota ve marka arayüz sistemi hazırlanmıştır. 3D ürün vitrini Faz 2 kapsamındadır ve gerçek ürün varlıkları beklenmektedir.

## Belgeler

- [Mimari](docs/architecture.md)
- [Yol haritası](docs/roadmap.md)
- [Güvenlik](docs/security.md)
- [İçerik ekleme rehberi](docs/content-guide.md)
- [İlerleme durumu](docs/progress.md)

## Temel sınırlar

- İlk sürümde backend, veritabanı ve CMS yoktur.
- Ürünler geliştirici tarafından statik içerik dosyasına eklenir.
- Ürün fotoğrafı ve web için optimize edilmiş GLB dosyası birlikte kullanılır.
- Hedef yayın ortamı Vercel'dir.

## Yerel geliştirme

```bash
npm install
npm run dev
```

Kalite kontrolleri:

```bash
npm run lint
npm run typecheck
npm run build
```
