import assert from 'node:assert/strict';
import test from 'node:test';
import { httpsUrl, whatsappLink } from '../src/lib/links.ts';
import { deploymentSettings } from '../src/lib/deployment-settings.ts';
import { checkDeployment } from '../scripts/check-deployment.mjs';

test('public targets reject unsafe protocols and credentials', () => {
  for (const value of ['javascript:alert(1)', 'http://example.com', '//example.com', 'https://user:pass@example.com', 'not-a-url']) {
    assert.throws(() => httpsUrl(value));
  }
  assert.equal(httpsUrl('https://orbitart.com.tr'), 'https://orbitart.com.tr/');
});

test('WhatsApp text survives Turkish characters and cannot inject another query parameter', () => {
  const message = 'Merhaba, ölçü & malzeme? #proje + 3D';
  const link = whatsappLink('https://wa.me/905438901310?text=old&redirect=evil#old',message);
  const url = new URL(link.href);
  assert.equal(url.searchParams.get('text'),message);
  assert.equal(url.searchParams.size,1);
  assert.equal(url.hash,'');
  assert.equal(link.number,'905438901310');
  for (const value of ['https://example.com/905438901310', 'https://wa.me/abc', 'https://wa.me:9999/905438901310']) assert.throws(()=>whatsappLink(value,message));
});

test('Preview uses its own share image origin while canonicals target the approved site', () => {
  const preview = deploymentSettings({NODE_ENV:'production',VERCEL_ENV:'preview',VERCEL_URL:'preview.example.com'});
  assert.equal(preview.siteOrigin,'https://orbitartt.com');
  assert.equal(preview.imageOrigin,'https://preview.example.com');
  assert.equal(preview.indexable,false);
  assert.equal(deploymentSettings({NODE_ENV:'development'}).indexable,false);
  assert.equal(deploymentSettings({NODE_ENV:'production',VERCEL_ENV:'production'}).indexable,true);
  assert.equal(deploymentSettings({SITE_URL:'https://www.orbitartt.com'}).siteOrigin,'https://www.orbitartt.com');
  for (const SITE_URL of ['http://orbitartt.com','https://orbitartt.com/path','https://user:pass@orbitartt.com','https://orbitartt.com?test=1']) assert.throws(()=>deploymentSettings({SITE_URL}));
});

test('Production build cannot silently follow a Preview authorization', () => {
  assert.throws(()=>checkDeployment({VERCEL_ENV:'production'}));
  assert.doesNotThrow(()=>checkDeployment({VERCEL_ENV:'preview'}));
  assert.doesNotThrow(()=>checkDeployment({VERCEL_ENV:'production',PRODUCTION_RELEASE_APPROVED:'true'}));
});
