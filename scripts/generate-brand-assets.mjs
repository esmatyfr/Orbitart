// Deterministic web derivatives of the approved vector logo, no remote fonts or images.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const base = new URL('../public/images/brand/', import.meta.url);
const logo = await readFile(new URL('orbitart-orbital-logo.svg', base), 'utf8');
const defs = logo.match(/<defs>[\s\S]*?<\/defs>/)?.[0];
const symbol = logo.match(/<g fill="none">[\s\S]*?<\/g>/)?.[0];
if (!defs || !symbol) throw new Error('Approved orbital logo structure changed.');
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="384" height="384" viewBox="0 0 384 384"><title>Orbitart</title><rect width="384" height="384" rx="80" fill="#09080f"/>${defs}<g transform="translate(19 64)">${symbol}</g></svg>`;
await writeFile(new URL('orbitart-icon.svg', base), icon);
await sharp(Buffer.from(icon)).resize(32,32).png().toFile(fileURLToPath(new URL('orbitart-icon.png', base)));
await sharp(Buffer.from(icon)).resize(180,180).png().toFile(fileURLToPath(new URL('orbitart-apple-icon.png', base)));
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><radialGradient id="glow"><stop stop-color="#3c1c69"/><stop offset="1" stop-color="#09080f"/></radialGradient></defs>
<rect width="1200" height="630" fill="#09080f"/><ellipse cx="1060" cy="150" rx="700" ry="600" fill="url(#glow)"/>
<path d="M72 515h1056" stroke="#c4b5fd" stroke-opacity=".25"/>
<image x="72" y="76" width="600" height="118" href="data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}"/>
<text x="72" y="295" fill="#f8f7fb" font-family="Arial, sans-serif" font-size="56" font-weight="700">Fikirden fiziksel forma.</text>
<text x="75" y="356" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="26" letter-spacing="4">3D TASARIM · TARAMA · ÜRETİM</text>
<text x="75" y="564" fill="#c4b5fd" font-family="Arial, sans-serif" font-size="25">orbitartt.com</text>
<text x="1128" y="564" text-anchor="end" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="23">Bodrum, Muğla</text>
</svg>`;
await writeFile(new URL('orbitart-social.svg', base),social);
await sharp(Buffer.from(social)).png().toFile(fileURLToPath(new URL('orbitart-social.png', base)));
console.log('Approved logo icon and 1200x630 social image generated.');
