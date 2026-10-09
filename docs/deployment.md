# Orbitart Vercel yayın rehberi

## Yayın sonrası işletim (2026-10-09)

Güncel kayıt saklama/yedek/geri dönüş ve güvenlik prosedürü [operations.md](operations.md) içindedir. Normal uygulama geri dönüşü aynı orbitartt projesindeki sağlam eski Production hedefiyle yapılır; aşağıdaki eski orbiant projesine domain taşıma kaydı yalnız ilk geçişin geçmişidir. Retention süresiz kaynak yedeği değildir; adayın hâlâ READY olduğu her yayında kontrol edilir.

Bu denetim salt okunur ve belge/yedek kapsamındadır; deploy yapılmadı. Paket Hobby; domain sicil bitişi 2026-10-09 23:51:21 Türkiye saati, otomatik yenileme bilinmiyor. Yenileme ve ticari hosting paket uygunluğu hesap sahibinin öncelikli takip maddeleridir. Yapılmayan bakım operations rehberindedir.

## Güncel revizyon yayını (2026-10-09)

Kullanıcının açık isteğiyle main'deki **e56ab2f71d5c03c8ae7fab79d0d16fe9ca26beea** aynı **esmatyfr/orbitartt** projesine Production olarak yayınlandı. **dpl_GQrPVUJ49G5AqDnv4sQu31k2jJA6**, target production, READY; [kaynak deployment](https://orbitartt-5i6b1nzhl-esmatyfr.vercel.app), [canlı site](https://orbitartt.com). --prod --skip-domain ile gerçek Production rebuild yapıldı; yetkili HTTP kabulünden sonra aynı derleme promote edildi. Build 1m 55s. Canlı özel alan adı yeni deployment'a çözülür; altı rota/üç 404, robots/sitemap, 37 görsel, güvenlik başlıkları ve HTTPS/www 308 kontrolleri geçti. Telefon/tablet/masaüstü görsel kontrolü ve sınırları [progress.md](progress.md) içindedir.

Domain/DNS ve env değiştirilmedi; main'in otomatik Git deployment'ı kapalı, codex/* Preview politikası korunur. Bu yayın onayı sonraki sürümlere sınırsız yetki vermez. Bir önceki Production **dpl_FofhwsryM7hHoxoUXCAjevvRh9t9** korunur; uygulama geri dönüşü gerektiğinde mevcut projede bu deployment yeniden promote edilebilir. Aşağıdaki 2026-10-05 kayıtları ilk domain geçişinin geçmişidir.

## Güncel canlı yayın (2026-10-05)

Kullanıcı “Canlıya al” ile Production ve iki domainin taşınmasını onayladı; **Faz 5 kapandı**. Site [https://orbitartt.com](https://orbitartt.com) adresinde herkese açıktır. www → apex ve HTTP → HTTPS 308, path/query korunarak doğrulandı. Mevcut DNS iki domain için misconfigured=false olduğundan değiştirilmedi.

- Vercel projesi: **esmatyfr/orbitartt**; Git: **esmatyfr/Orbitart**, main.
- Yayınlanan main kaynakları: **348d6ec22e308853d6918ebb4be1abe6052e60c4**; uygulama güvenlik kaynakları cb9ba5c9fa597431ec241e27b11fd7e46c6b6149.
- Gerçek Production rebuild: **dpl_FofhwsryM7hHoxoUXCAjevvRh9t9**, target production, READY; [kaynak deployment](https://orbitartt-81oxrfr70-esmatyfr.vercel.app). Vercel kaynak URL'leri Authentication isteyebilir; canlı özel alan adı herkese açıktır.
- İki domain yeni projede verified; apex redirect yok, www redirect orbitartt.com/308.
- `PRODUCTION_RELEASE_APPROVED=true` yalnız Production Config. Preview/dev'e eklenmedi; kod kapısı korunur. `SITE_URL` HTTPS varsayılanı orbitartt.com; mağaza farklıdır.
- Önceki **orbiant** projesi/deployment'ı korunur: **dpl_6XMKnYEfzNKNvZ1s9U3hq1qbn845**, [eski kaynak deployment](https://orbiant-80a9vvdp2-esmatyfr.vercel.app), READY.

Main otomatik Git production yayını hâlâ kapalıdır; codex/* Git Preview'ları açıktır. Gelecek production sürümü için yeni kullanıcı onayı ve aynı kalite/yayın kontrolleri gerekir. Onaylı main kaynağından manuel yayın:

```powershell
npx --yes vercel@latest deploy --prod --yes --scope esmatyfr --project orbitartt --logs
npm run test:preview -- https://orbitartt.com
```

Altı rota, üç 404, robots/sitemap, üç PNG ölçüsü, 37 gerçek görsel ve güvenlik başlıkları gerçek canlı HTTP'te geçti. Masaüstü/mobil Chrome'da tek Canvas, yedi GLB, model seçimi, süreç ve menü; WebGL yokluğu/reduced-motion/JS kapalı fallback kontrolleri tamamlandı. Kanıtlar ve sınırlar [progress.md](progress.md) içinde.

### Geri dönüş

Eski proje silinmez. Geri dönüş gerektiğinde resmi domain move API'siyle şu an ana domain **orbitartt.com** yeni orbitartt'tan eski orbiant'a taşınır; buna yönlenen www aynı işlemde birlikte taşınır. Eski projenin kimliği **prj_i4UqhU5N2O8yRy3XHcPv3TRnTr1W**. Ardından eski www yönlendirmesi kaldırılır ve apex → www eski yönü geri ayarlanır; HTTPS, path/query ve eski deployment hedefi doğrulanır. Aksi sırayla yönler değiştirilirse redirect döngüsü oluşabilir. Orijinal domain kaydı ve eski deployment kimliği Git dışı output/release-2026-10-05/rollback-*.json dosyalarında kaydedildi. DNS kayıtları bu yayında değişmedi.

## Preview hazırlığı geçmişi (2026-10-04)

- Tanıtım sitesinin onaylanan production adresi: `https://orbitartt.com`.
- Mağaza: `https://orbitart.com.tr`; canonical adresi olarak kullanılmaz.
- Yeni Vercel projesi: `esmatyfr/orbitartt`.
- Kullanıcının kabul ettiği Faz 4 Preview: [orbitartt-ks916xf13-esmatyfr.vercel.app](https://orbitartt-ks916xf13-esmatyfr.vercel.app).
- Güncel güvenlik/Git Preview: [orbitartt-qj2xllgi9-esmatyfr.vercel.app](https://orbitartt-qj2xllgi9-esmatyfr.vercel.app), cb9ba5c kaynakları, target preview/READY; gerçek HTTP ve masaüstü/mobil tarayıcı kontrolleri geçti.
- Bu tarihli hazırlık sırasında önceki `esmatyfr/orbiant` projesinin alan adları değiştirilmemişti. 2026-10-05 canlı geçişi yukarıda kayıtlıdır.

Bu Preview, CLI kaynak görüntüsüdür ve kullanıcı tarafından kabul edildi. Faz 4 main/origin üzerinde `3d50821f4756be5a9ee42796661804f947e951e0` ile kayıtlı. Kullanıcı GitHub erişimini açtıktan sonra mevcut proje `esmatyfr/Orbitart` deposuna bağlandı; API repo/productionBranch main değerlerini doğruladı. Dashboard Next.js, Node 24.x, npm ci ve npm run build kullanır. `vercel.json` Git yayınını yalnız `codex/*` Preview dallarına açar; `*` false kuralıyla main dahil diğer dallar kapalıdır. Gerçek Git Preview sonucu progress.md içinde kayıtlıdır.

Faz 5 güvenlik başlıkları HTTP smoke testine dahildir; üretim ve Preview CSP'si ayrılır. Production öncesi iki domain eski orbiant projesinden orbitartt projesine birlikte taşınmalı. Önerilen canonical apex https://orbitartt.com ve www'den apex'e 308'dir; mevcut yön ters olduğundan taşıma sırasında düzeltilir. Onay öncesi eski alan adı kayıtları silinmez veya değiştirilmez.

Canlı geçiş sırası: açık onay → güvenlik dalını main'e alma → yalnız Production release kapısını açma → yeni production deploy/HTTP doğrulama → iki domaini yeni projeye taşıma ve www → apex yönü → HTTPS, canonical, indekslenebilir robots/altı sitemap URL'si ve medya smoke. Önceki orbiant projesi/deployment silinmez; sorun halinde iki domain eski projeye ve apex → www yönüne geri alınır. Domain hedefi Vercel'in geçiş anındaki önerisiyle karşılaştırılmadan DNS değeri körlemesine değiştirilmez.

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

İlk proje yüklemesinde CLI `--target preview` almasına rağmen Vercel denemeyi production olarak sınıflandırdı. `scripts/check-deployment.mjs` bunu durdurdu; deployment ERROR kaldı, o denemede hazır production oluşmadı. Sonraki yüklemeler gerçek Preview/READY oldu. Beklenmedik hedefte kapıyı kaldırmayın veya onaysız `PRODUCTION_RELEASE_APPROVED` tanımlamayın; sonuç ortamını kontrol edin. Kullanıcının sonraki 2026-10-05 onayıyla gerçek Production yayını yukarıdaki kayıtta tamamlandı. [Vercel deploy belgesi](https://vercel.com/docs/cli/deploy) hedef seçeneklerini açıklar; [issue #17069](https://github.com/vercel/vercel/issues/17069) ilk yükleme davranışını kaydeder.

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
