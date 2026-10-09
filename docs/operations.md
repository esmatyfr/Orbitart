# Orbitart canlı işletim ve kayıt saklama rehberi

Son denetim: **2026-10-09**, yaklaşık 03:50 Türkiye saati. Faz 5'in yayın sonrası işletim ekidir. Kullanıcı güvenlik/prosedür eksiklerinin tamamlanmasını, bakım işlerinin yalnız listelenmesini istedi. Uygulama, bağımlılık, hesap paketi, DNS, firewall veya Production deployment değiştirilmedi; zamanlanmış görev/yeni dış servis kurulmadı.

## Güncel yayın ve sorumluluk

| Kayıt | Değer |
| --- | --- |
| Canlı adres | https://orbitartt.com; www → apex 308 |
| GitHub | https://github.com/esmatyfr/Orbitart; public, main |
| Vercel | esmatyfr/orbitartt; Hobby |
| Yayındaki uygulama SHA | e56ab2f71d5c03c8ae7fab79d0d16fe9ca26beea |
| Güncel Production | dpl_GQrPVUJ49G5AqDnv4sQu31k2jJA6; READY |
| Önceki Production adayı | dpl_FofhwsryM7hHoxoUXCAjevvRh9t9; kaynak 348d6ec22e308853d6918ebb4be1abe6052e60c4 |
| İşlem yetkisi | Hesap sahibi esmatyfr; yayın, geri dönüş, ücretli servis/paket, domain ve anahtar yenileme için açık kullanıcı onayı |

Deployment kimliği, SHA ve public URL gizli değildir. Parola, CLI token'ı, kurtarma kodu veya bypass anahtarı dokümana yazılmaz. Yayın geçmişi [deployment.md](deployment.md), güvenlik koşulları [security.md](security.md) içindedir.

## Doğrulanan güvenlik durumu

- Canlı HTTP kontrolü: altı sayfa, üç beklenen 404, robots/sitemap, üç marka PNG ölçüsü ve 37 görsel geçti. HTTP→HTTPS/www→apex 308 yönü path/query korunarak çalışıyor.
- TLS güvenilir zincir/hostname kontrolünü geçti; sertifika bitişi **2026-11-21 17:05:22 UTC**. Sertifika tarihi domain yenileme tarihi değildir; sonraki kontrollerde yenilenmesi izlenir.
- Production CSP, nosniff, DENY, Referrer ve Permissions başlıkları geçti; unsafe-eval/geniş wildcard/Preview Toolbar origin'i yok. Script/style unsafe-inline mevcut statik Next.js ve hareket ihtiyaçları nedeniyle belgelenmiş sınırdır; nonce mimarisine geçilmedi.
- `/.env`, `/.env.local`, `/.vercel/project.json`, `/.git/config`, `/package.json`, `/package-lock.json`, `/next.config.ts`, `/docs/security.md`, `/scripts/check-deployment.mjs` ve örnek `/output/.../build.log` URL'leri **404**. Bu kontrol tüm dosya adlarını kapsayan sızma testi değildir.
- `.env*` (örnek hariç), `.vercel/`, loglar ve `output/` Git/upload dışında; izlenen tek env dosyası `.env.example`. Değerler alınmadan anahtar/hedef metadatası denetlendi: `PRODUCTION_RELEASE_APPROVED` yalnız Production'da. Bayrak gelecek yayın için kullanıcı onayının yerine geçmez.
- Vercel Authentication `all_except_custom_domains`; canlı özel alan adı açık, generated deployment/Preview URL'leri korumalı. Git fork protection açık; main otomatik Git yayını kapalı, codex/* Preview açık.
- Vercel temel mitigations aktif. Özel firewall kuralı yok; Attack Mode/Bot Protection/OWASP kapalı. Statik, hesapsız/form/API'siz siteye yeni ücretli koruma/doğrulama akışı eklenmedi.
- Son bir saatlik runtime error sorgusu boş; firewall alarmı active/resolved listeleri boş. Yalnız sorgulanan pencerenin sonuçlarıdır; geçmişin tamamında hata/saldırı yokluğu anlamına gelmez.
- Gitleaks 8.30.1 Git geçmişi/mevcut yerel client çıktısı sıfır bulgu; yeni belge/kaynak da taranır. Son yayın kaynak/build logu sonuçları [progress.md](progress.md) içinde. Güvenlik başlığı testleri yeniden 3/3 geçti.

## Bilgi nerede saklanır?

| Bilgi | Saklama yeri ve kural |
| --- | --- |
| Kaynak, kilit dosyası, onaylı web görsel/GLB, lisans ve yayın kaydı | Git + GitHub. Repo public olduğundan yalnız yayımlanabilir bilgi. |
| Yerel ortam | Git dışında `.env.local`; örnekte yalnız public/sahte değer. CLI oturumu kendi araç deposunda, proje arşivine kopyalanmaz. |
| Production/Preview/Development gizlileri | Yalnız ilgili Vercel ortamında, minimum kapsamla; NEXT_PUBLIC_* içine sır konmaz. Mevcut statik site özel servis anahtarı gerektirmez. |
| Hesap parolası, passkey/2FA kurtarma kodu, domain fatura/yenileme | Hesap sahibinin şifre yöneticisi/özel deposu. Git, sohbet, görsel veya loga konmaz. Bu depoların kurulumu/2FA durumu doğrulanmadı. |
| Build/audit/redakte teknik kanıt | Yerel `output/release-2026-10-09/` ve `output/security-2026-10-09/`; Git/upload dışında. Ham token/cookie/Authorization ve gereksiz ziyaretçi verisi saklanmaz. |
| Kaynak yedeği | `output/security-2026-10-09/orbitart-repository.bundle`; SHA-256 ve kaynak HEAD `backup-manifest.json` içinde. Yalnız Git geçmişi/izlenen dosyalar; env, CLI kimlik bilgisi, node_modules ve Git dışı Blender kaynakları dahil değil. |

Bundle `git bundle verify` ile kontrol edilir; ayrı yerel dizine checkout yapmadan klonlanıp `git fsck --full` ile nesne bütünlüğü doğrulanır. Bu, yeni cihazda uygulama build/görsel kabul testi değildir. GitHub uzaktaki kaynak kopyasıdır; aynı bilgisayardaki bundle cihaz kaybına karşı bağımsız yedek sayılmaz. Ayrı, erişim kontrollü/şifreli kopya ve Blender ana dosyalarının yedeği hesap sahibinin açık takip maddesidir; yeni depolama servisi/aktarım yapılmadı.

Saklama önerisi: her yayın için kaynak SHA/deployment/sonuç özeti Git'te; son iki sağlam sürümün doğrulanmış kaynak yedeği tutulur. Redakte teknik raporlar 90 gün sonra, ham hata ayıklama çıktıları sorun kapandıktan en geç 30 gün sonra ihtiyaç açısından gözden geçirilir. Bunlar iç işletim hedefleridir, yasal zorunlu süre iddiası değildir. Bu tur dosya silinmedi/otomatik temizlik kurulmadı.

### Vercel saklama sınırları

Hesap API'den Hobby olarak doğrulandı. [Runtime Logs](https://vercel.com/docs/logs/runtime) bu pakette **bir saat** tutulur; tüm statik ziyaretleri veya tarayıcı konsolunu kapsamaz. **Drains 0**; kalıcı log aktarımı/bağımsız uptime bildirimi kurulmuş kabul edilmez. Olayda ilgili pencere kaybolmadan alınır, sır/kişisel veri redakte edilerek özel kanıt alanında saklanır.

Proje API'si tüm deployment türlerinde 30 gün ve `deploymentsToKeep: 10` döndürdü. Güncel [retention belgesi](https://vercel.com/docs/deployment-retention) ise Hobby için son 3 deployment/son 3 READY Production istisnası belirtir. API'deki 10, on eski sürümün süresiz saklanma garantisi değildir. Alias ve diğer koruma istisnaları geçerlidir; eski URL'nin geri dönüşte çalışacağı varsayılmaz. Her yayından önce geri dönüş adayı READY/erişilebilir olarak yeniden kontrol edilir ve kaynak yedeği korunur.

## Yayın ve geri dönüş

1. Doğru repo/proje/branch, temiz çalışma ağacı ve onaylanan uygulama SHA doğrulanır. Env değerleri loga basılmaz. Uygulama değişikliğinde lint/typecheck/test/build/HTML ve mobil/masaüstü görsel kabul; yalnız belgede bağlantı/diff/secret kontrolü yapılır.
2. Audit ve kaynak/Git/client/build log secret taraması değerlendirilir; açıkların etkin koşulları kaydedilir. Force fix ile kontrolsüz major/downgrade yapılmaz.
3. O sürüme açık kullanıcı Production onayından sonra incelenmiş CLI sürümüyle doğru scope/projede gerçek Production build `--prod --skip-domain` hazırlanır. Preview ortamıyla üretilmiş paket onaysız Production'a taşınmaz. Korumalı deployment yetkili CLI ile test edilir; koruma kapatılmaz.
4. Sağlam eski Production kimliği/SHA kaydedilir; hazır build promote edilir. Canlı smoke, HTTPS/www, tarayıcıda loader/3D/seçim/süreç, menü odağı ve fallback uygun kapsamda doğrulanır. Sonuç/kanıt/sınırlar progress ve deployment kaydına yazılır.
5. Bozulmada onayla **aynı orbitartt projesinde**, hâlâ READY olan eski Production'a geri dönüş/promote uygulanır. Eski bundle'a gömülü env farkları kontrol edilir. Domain/DNS taşımak normal uygulama geri dönüşünün parçası değildir; deployment.md içindeki eski projeye taşıma 2026-10-05 geçişinin tarihsel kaydıdır.
6. Eski deployment yoksa temiz ayrı dizinde kayıtlı SHA/bundle'dan kaynak alınır; env doğru kapsamda yeniden sağlanır. Test/build ve onayla yeniden yayın; canlı rota/model/fallback tekrar kontrol edilir. Başarısız sürüm/kanıt inceleme bitmeden silinmez.

Kaynak geri kazanma (yeni, boş hedef dizin kullanılır):

```powershell
git bundle verify output/security-2026-10-09/orbitart-repository.bundle
git clone --no-checkout output/security-2026-10-09/orbitart-repository.bundle output/orbitart-recovery
git -C output/orbitart-recovery fsck --full
```

## Olay müdahalesi ve kontrol takvimi

Sızıntı şüphesinde etkilenen erişim/anahtar/ortam belirlenir; sırrı yeniden loglamadan kanıt alınır. Gerçek sızıntıda dosyadan silmek yetmez: onayla sağlayıcıda iptal/yenileme, env güncellemesi, gerekiyorsa yeniden yayın ve Git geçmişi incelemesi gerekir. Public geçmişi yeniden yazmak ayrıca planlanır. Bu tur sızıntı bulgusu veya anahtar yenilemesi yoktur.

Kesintide canlı HTTPS, domain tarihi, Vercel status, güncel deployment ve yakın zamanlı firewall/runtime kayıtları incelenir. Trafik sorunu doğrulanmadan Attack Mode açılmaz; gerekirse dar kural önce log modunda değerlendirilir. İleride kullanıcı verisi/toplama servisi eklenirse saklama/erişim/gizlilik kapsamı yeniden incelenir.

| Zaman | Kontrol |
| --- | --- |
| Her yayında | Yayın kapısı, audit/secret, yedek/geri dönüş adayı, canlı smoke ve gereken görsel kabul |
| Haftalık | Canlı sayfa/CTA/model/fallback, HTTPS/www, Vercel hata/usage/deployment; saatlik logdan geçmiş hafta çıkarılamaz |
| Aylık | Salt okunur audit/duyurular; hesap yetkileri/entegrasyonlar, 2FA/kurtarma; domain yenileme/ödeme/sertifika; yedek bütünlüğü |
| Domain bitişinden 30/7 gün önce | Registrar panelinde yenileme, auto-renew ve ödeme yöntemi; sicille karşılaştırma |
| En az üç ayda bir | Ayrı ortamda geri kazanma/build provası, eski erişim ve rapor ihtiyacının gözden geçirilmesi |

Takvim manuel öneridir; otomatik bildirim/bakım çalışıyor değildir. Teknik kontrolleri projeyi sürdüren kişi, ödeme/hesap kurtarmayı hesap sahibi yürütür.

## Yapılmayan bakım ve açık kontroller

1. **Acil domain kontrolü:** [Verisign RDAP](https://rdap.verisign.com/com/v1/domain/ORBITARTT.COM) expiration **2026-10-09T20:51:21Z**, yani **9 Ekim 2026 23:51:21 Türkiye saati** döndürdü. Auto-renew/ödeme sicilden görülemez; bugün registrar panelinde doğrulanmalıdır. Yenileme/ödeme yapılmadı. Sertifika yenilemesi domain kaydını yenilemez.
2. **Hosting paket uygunluğu:** paket Hobby. [Vercel ticari kullanım koşulları](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage) ürün/hizmet satışının tanıtımını ticari sayar ve Pro/Enterprise ister. Orbitart'ın hizmet/mağaza yönlendirmeleri bu tanıma girer; uygun pakete geçiş ücret/onay kararıdır. Plan/ödeme değişmedi.
3. **Bağımlılık güvenlik bakımı:** audit **8 high, 0 critical**; runtime filtresi **3 high**: Next.js 16.3.6, sharp 0.35.4, source-map-js 1.2.1. Diğer 5 kayıt geliştirme lint zinciridir. [security.md](security.md) etkin koşulları/yamalı sürüm adaylarını içerir. Ayrı bakımda uyumlu güncelleme, tam test/build/görsel kabul ve onaylı yayın gerekir. Paket/kilit değişmedi; audit fix --force uygulanmadı.
4. **Hesap/repo koruması:** GitHub main için API `protected: false`. PR/force-push/silme koruması ve gerçek CI kontrolleriyle branch protection değerlendirilmelidir; olmayan CI adları uydurulmaz. GitHub/Vercel/registrar 2FA/passkey, recovery ve GitHub secret/dependency alert ayarları doğrulanamadı; hesap sahibi özel panelinde kontrol etmeli, parola/token paylaşmamalı. Ayar değiştirilmedi.
5. **Süreklilik:** bağımsız/şifreli kaynak ve Blender yedeği, uptime bildirimi ve ihtiyaç varsa erişim kontrollü log saklama değerlendirilmeli. Drain/analytics/ücretli servis kurulmadı; tek saatlik runtime penceresi uzun olay geçmişi değildir.

Kanıtlar yerel `output/security-2026-10-09/` içinde: filtrelenmiş proje/domain/paket metadata'sı, live-audit, firewall/runtime sorguları, audit/secret ve yedek manifesti. Filtrelenmiş kayıtlar bile topluca public repoya yüklenmez. Bu bir kaynak/prosedür denetimidir; tam sızma testi veya sıfır açık garantisi değildir.
