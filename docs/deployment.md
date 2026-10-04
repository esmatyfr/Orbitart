# Orbitart Vercel Preview rehberi

## Güncel hedefler (2026-10-04)

- Tanıtım sitesinin onaylanan production adresi: `https://orbitartt.com`.
- Mağaza: `https://orbitart.com.tr`; canonical adresi olarak kullanılmaz.
- Yeni Vercel projesi: `esmatyfr/orbitartt`.
- Preview: [orbitartt-ks916xf13-esmatyfr.vercel.app](https://orbitartt-ks916xf13-esmatyfr.vercel.app).
- Önceki `esmatyfr/orbiant` projesi ve onun `www.orbitartt.com` kaydı değiştirilmedi. Alan adı sahipliği/DNS ve taşıma kararı Faz 5'te ayrı kullanıcı onayıyla çözülmelidir.

Bu Preview, CLI kaynak görüntüsüdür ve kullanıcı tarafından kabul edildi. Faz 4 main/origin üzerinde `3d50821f4756be5a9ee42796661804f947e951e0` ile kayıtlı. Kullanıcı GitHub erişimini açtıktan sonra mevcut proje `esmatyfr/Orbitart` deposuna bağlandı; API repo/productionBranch main değerlerini doğruladı. Dashboard Next.js, Node 24.x, npm ci ve npm run build kullanır. `vercel.json` Git yayınını yalnız `codex/*` Preview dallarına açar; `*` false kuralıyla main dahil diğer dallar kapalıdır. Gerçek Git Preview sonucu progress.md içinde kayıtlıdır.

Faz 5 güvenlik başlıkları HTTP smoke testine dahildir; üretim ve Preview CSP'si ayrılır. Production öncesi iki domain eski orbiant projesinden orbitartt projesine birlikte taşınmalı. Önerilen canonical apex https://orbitartt.com ve www'den apex'e 308'dir; mevcut yön ters olduğundan taşıma sırasında düzeltilir. Onay öncesi eski alan adı kayıtları silinmez veya değiştirilmez.

## Kurulum ve yeniden yayın

Node 24, mevcut lockfile, `npm ci`, Next.js preset ve `npm run build` kullanılır. Yeni bağımlılık eklenmedi. Yerel CLI 62.2.0, bulut build CLI 62.1.0 ile doğrulandı. Kullanıcı Vercel hesabına ve CLI cihaz yetkilendirmesine kendisi giriş yaptı; kimlik bilgileri repoya alınmaz.

Proje zaten oluşturulup bu klasöre bağlandı. Başka bilgisayarda aynı projeye bağlanmak için:

```powershell
npx --yes vercel@latest login
npx --yes vercel@latest link --yes --scope esmatyfr --project orbitartt
```

Kalite kontrollerinden sonra yalnız onaylı Preview hedefi:

```powershell
npx --yes vercel@latest deploy --yes --target preview --scope esmatyfr --project orbitartt --build-env SITE_URL=https://orbitartt.com --env SITE_URL=https://orbitartt.com --logs
```

Çıktıda Preview/READY ve `productionUrl:null` doğrulanır. `--prod`, promote, alias veya alan adı taşıma bu fazın parçası değildir.

İlk proje yüklemesinde CLI `--target preview` almasına rağmen Vercel denemeyi production olarak sınıflandırdı. `scripts/check-deployment.mjs` bunu durdurdu; deployment ERROR kaldı, hazır production oluşmadı. Sonraki yüklemeler gerçek Preview/READY oldu. Bu durumda kapıyı kaldırmayın ve `PRODUCTION_RELEASE_APPROVED` tanımlamayın; sonuç ortamını kontrol edin. [Vercel deploy belgesi](https://vercel.com/docs/cli/deploy) hedef seçeneklerini açıklar; [issue #17069](https://github.com/vercel/vercel/issues/17069) ilk yükleme davranışını kaydeder.

## Ortam ve kaynak sınırları

`SITE_URL` yalnız HTTPS origin kabul eder; bu Preview'da build/runtime için `https://orbitartt.com` verildi. Üç `NEXT_PUBLIC_*` bağlantısı mevcut public varsayılanları kullanır. WhatsApp hazır mesajı `site-config.ts` ve `links.ts` üzerinden URL-encode edilir. Gizli değer eklenmedi.

Vercel `VERCEL_ENV` ve `VERCEL_URL` değerlerini sağlar. Preview sayfaları `noindex, nofollow`, robots `Disallow: /` ve boş sitemap üretir. Canonical/OG sayfa adresi onaylı tanıtım alan adına, paylaşım görseli gerçek Preview origin'ine gider. Production çıktısı altı rota içeren sitemap ve indekslenebilir metadata üretir. `noindex` erişim korumasının yerine geçmez.

Vercel Authentication açık tutuldu; link Vercel hesabıyla giriş isteyebilir. Korumalı HTTP kontrolünde resmi [vercel curl](https://vercel.com/docs/cli/curl) kullanılır:

```powershell
npx --yes vercel@latest curl /robots.txt --deployment https://orbitartt-ks916xf13-esmatyfr.vercel.app
```

CLI kendi oturumuyla yetkili isteği yapar; otomasyon erişim anahtarları kopyalanmaz, paylaşılmaz veya belgelenmez. `.vercel/`, `.env.local`, diğer `.env*` dosyaları ve `output/` Git dışında; `.vercelignore` ayrıca bu dosyaları, araç/ek dosya klasörlerini ve yerel çıktıları upload dışında tutar. `.env.example` yalnız public örneklerdir.

## Kontroller

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run test:build
npm run start -- --port 3001
```

Ayrı terminalde:

```powershell
npm run test:preview -- http://localhost:3001
```

Preview fixture build için `VERCEL_ENV=preview` ve `VERCEL_URL=phase4-preview.example.invalid` yalnız geçici terminal oturumunda tanımlanıp build/test çalıştırılır; ardından değerler temizlenip normal build geri üretilir. Uzak açık Preview için test komutuna HTTPS URL ve `--preview` verilir. Authentication olan URL'de sıradan fetch 401 alabilir; korumayı kapatmak yerine yetkili `vercel curl` ile aynı yanıtlar incelenir.

Testler altı rotayı, metadata/CTA hedeflerini, üç beklenen 404'ü, sitemap/robots ayrımını, üç marka PNG ölçüsünü ve HTML'deki gerçek görselleri kontrol eder. Masaüstü/mobil tarayıcı, menü klavye/dokunma, 404 kurtarma ve tek Canvas ayrıca doğrulanır. Yeni HTTPS Preview'ın gerçek telefon kabulü kullanıcıya aittir; önceki LAN kabulü yeni Preview testi gibi sunulmaz.

## Production kapısı

`VERCEL_ENV=production` iken `PRODUCTION_RELEASE_APPROVED=true` yoksa build durur. Değişken yalnız Faz 5 güvenlik/alan adı kontrolleri ve açık production onayından sonra ilgili Production ortamına eklenir. Preview'a eklenmez. Yerel production build'in geçmesi dış yayın onayı değildir.

Faz 5'te başlıklar/CSP, secret ve Git geçmişi, ortam kapsamları, public model hakları/atıfları, alan adı/DNS ve son cihaz kabulü tamamlanır. Audit geliştirme zincirinde `braces` kaynaklı beş high kaydı bildiriyor; `npm audit --omit=dev` sıfır bulgu verdi. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) doğrulama tarihinde patched sürüm belirtmiyor. `npm audit fix --force` Next ESLint yapılandırmasını 14.2.35'e düşüreceğinden uygulanmadı; Faz 5'te upstream çözümü ve gerçek build saldırı yüzeyi değerlendirilir.
