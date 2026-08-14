import type { SecuritySystem } from './security-fallback';
import { fallbackSecuritySystems } from './security-fallback';
import { generatedSecuritySystems } from './generated/security';

export type { SecuritySystem, SecurityCamera, SecurityIncidentRoi } from './security-fallback';

/**
 * Security systems are managed in the CMS panel (custom admin) as markdown
 * files under content/security. scripts/sync-content.mjs regenerates
 * src/data/generated/security.ts from those files. If the generated file is
 * missing or empty (fresh checkout), fall back to the seeded data.
 */
export const securitySystems: SecuritySystem[] =
  generatedSecuritySystems.length > 0 ? generatedSecuritySystems : fallbackSecuritySystems;

/** Published (and not scheduled-future) systems only — what the public sees. */
export function visibleSecuritySystems(): SecuritySystem[] {
  const now = new Date();
  return securitySystems.filter(s => {
    if (s.status === 'draft') return false;
    if (s.status === 'scheduled' && s.scheduledAt) {
      return new Date(s.scheduledAt + 'T00:00:00') <= now;
    }
    return true;
  });
}
