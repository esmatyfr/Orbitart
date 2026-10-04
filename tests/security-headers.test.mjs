import assert from 'node:assert/strict';
import test from 'node:test';
import { securityHeaders } from '../src/lib/security-headers.ts';

const policy = (env) => Object.fromEntries(securityHeaders(env).map(({key,value}) => [key,value]));
const directives = (value) => Object.fromEntries(value.split(';').filter((part)=>part.trim()).map((part)=> {
  const [name,...sources] = part.trim().split(/\s+/);
  return [name,sources];
}));

test('production rejects external scripts, eval, embedding and unused browser access', () => {
  const headers = policy({NODE_ENV:'production',VERCEL_ENV:'production'});
  const csp = directives(headers['Content-Security-Policy']);
  assert.deepEqual(csp['script-src'],["'self'","'unsafe-inline'"]);
  assert.deepEqual(csp['connect-src'],["'self'",'blob:']);
  for (const name of ['object-src','frame-src','worker-src','form-action','frame-ancestors']) assert.deepEqual(csp[name],["'none'"]);
  assert.ok(!headers['Content-Security-Policy'].includes('unsafe-eval'));
  assert.ok(!headers['Content-Security-Policy'].includes('*'));
  assert.equal(headers['X-Content-Type-Options'],'nosniff');
  assert.equal(headers['X-Frame-Options'],'DENY');
  for (const permission of ['camera=()','microphone=()','geolocation=()']) assert.ok(headers['Permissions-Policy'].includes(permission));
});

test('Preview permits only documented toolbar origins and production removes them', () => {
  const csp = directives(policy({NODE_ENV:'production',VERCEL_ENV:'preview'})['Content-Security-Policy']);
  assert.deepEqual(csp['connect-src'],["'self'",'blob:','https://vercel.live','wss://ws-us3.pusher.com']);
  assert.deepEqual(csp['frame-src'],['https://vercel.live']);
  assert.ok(!JSON.stringify(policy({NODE_ENV:'production',VERCEL_ENV:'production'})).includes('vercel.live'));
});

test('development stays compatible with HMR and local HTTP does not upgrade to HTTPS', () => {
  assert.equal(policy({NODE_ENV:'development'})['Content-Security-Policy'],undefined);
  assert.ok(!policy({NODE_ENV:'production'})['Content-Security-Policy'].includes('upgrade-insecure-requests'));
  assert.ok(policy({NODE_ENV:'production',VERCEL_ENV:'preview'})['Content-Security-Policy'].includes('upgrade-insecure-requests'));
});
