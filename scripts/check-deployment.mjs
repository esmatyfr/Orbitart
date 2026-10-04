// Prevent an accidental Production deployment while Phase 4 only authorizes Preview.
export function checkDeployment(env) {
  if (env.VERCEL_ENV === 'production' && env.PRODUCTION_RELEASE_APPROVED !== 'true') {
    throw new Error('Production yayını kapalı. Faz 5 kontrolü ve kullanıcı yayın onayından sonra PRODUCTION_RELEASE_APPROVED=true tanımlanmalı.');
  }
}

checkDeployment(process.env);
