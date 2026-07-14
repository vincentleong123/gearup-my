export function h(s: string): string {
  return String(s).replace(/[&<>"']/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m] || m
  );
}

export function formatPrice(n: number): string {
  if (n === 0) return 'N/A';
  return 'RM ' + n.toLocaleString();
}

export function roiColor(score: number): string {
  if (score >= 88) return 'text-green-400';
  if (score >= 78) return 'text-yellow-400';
  return 'text-red-400';
}

export function roiBarColor(score: number): string {
  if (score >= 88) return 'bg-green-400';
  if (score >= 78) return 'bg-yellow-400';
  return 'bg-red-400';
}

export function getLevelLabel(level: string): string {
  switch (level) {
    case 'beginner': return '🟢 Beginner';
    case 'mid': return '🟡 Mid-Level';
    case 'pro': return '🔴 Pro';
    default: return level;
  }
}

export function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function siteUrl(path = ''): string {
  const base = 'https://gearup.my';
  return base + path;
}
