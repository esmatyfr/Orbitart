// Read-only HTTP smoke test for a running local build or an authorized Preview.
import assert from 'node:assert/strict';
import sharp from 'sharp';

const base = process.argv[2];
if (!base) throw new Error('Usage: node scripts/smoke-preview.mjs <base-url> [--preview]');
const origin = new URL(base);
if (origin.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(origin.hostname)) throw new Error('Use HTTPS for remote previews.');
const preview = process.argv.includes('--preview');
const routes = ['/','/vitrin','/hakkimizda','/hizmetlerimiz','/iletisim','/model-kaynaklari'];
const pages = [];
for (const route of routes) {
  const response = await fetch(new URL(route,origin),{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,200,`route failed: ${route}`);
  const html = await response.text();
  assert.match(html,/<html[^>]*lang="tr"/);
  assert.ok(html.includes('https://orbitartt.com'));
  assert.ok(html.includes('/images/brand/orbitart-social.png'));
  if (preview) assert.ok(html.includes('content="noindex, nofollow"'));
  pages.push(html);
}
for (const path of ['/phase4-missing-page','/images/phase4-missing.webp','/models/phase4-missing.glb']) {
  const response = await fetch(new URL(path,origin),{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,404,`expected 404: ${path}`);
  if (path === '/phase4-missing-page') assert.ok((await response.text()).includes('Bu sayfa bulunamadı.'));
  else await response.body?.cancel();
}
const robots = await fetch(new URL('/robots.txt',origin));
assert.equal(robots.status,200);
assert.match(await robots.text(),preview ? /Disallow: \// : /Allow: \//);
const sitemap = await fetch(new URL('/sitemap.xml',origin));
assert.equal(sitemap.status,200);
const xml = await sitemap.text();
assert.equal((xml.match(/<loc>/g) ?? []).length,preview ? 0 : routes.length);
for (const [file,width,height] of [['orbitart-social.png',1200,630],['orbitart-icon.png',32,32],['orbitart-apple-icon.png',180,180]]) {
  const response = await fetch(new URL(`/images/brand/${file}`,origin));
  assert.equal(response.status,200);
  assert.match(response.headers.get('content-type') ?? '',/image\/png/);
  const meta = await sharp(Buffer.from(await response.arrayBuffer())).metadata();
  assert.equal(meta.width,width);
  assert.equal(meta.height,height);
}
// Request only media observed in the actual HTML; do not infer a new content list.
const media = new Set(pages.flatMap(html=>[...html.matchAll(/src="([^\"]+)"/g)].map(match=>match[1].replaceAll('&amp;','&')))
  .filter(src=>src.startsWith('/_next/image') || src.startsWith('/images/')));
for (const path of media) {
  const response = await fetch(new URL(path,origin),{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,200,`media failed: ${path}`);
  assert.match(response.headers.get('content-type') ?? '',/image\//);
  await response.body?.cancel();
}
console.log(`HTTP smoke passed: ${routes.length} routes, 3 expected 404s, robots/sitemap, 3 image sizes and ${media.size} real image URLs. Preview=${preview}`);
