const API = import.meta.env.CMS_API_URL || 'http://localhost:4321/api/content';

export interface Product {
  id: number;
  type: string;
  title: string;
  slug: string;
  status: string;
  fields: {
    price: number;
    compare_price?: number;
    category: string;
    short_description: string;
    badge?: string;
    in_stock: boolean;
    sku: string;
  };
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API}/pages?type=product&limit=100`);
    if (!res.ok) return [];
    const json = await res.json();
    const all: Product[] = json.data || [];
    if (category) {
      return all.filter(p => p.fields.category === category);
    }
    return all;
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API}/pages/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getCategoryLabel(cat: string): string {
  const map: Record<string, string> = {
    'jar-candles': '🕯️ Jar Candles',
    'pillar-candles': '🕯️ Pillar Candles',
    'taper-candles': '🕯️ Taper Candles',
    'wax-melts': '✨ Wax Melts',
  };
  return map[cat] || cat;
}

export function getCategoryIcon(cat: string): string {
  const map: Record<string, string> = {
    'jar-candles': '🕯️',
    'pillar-candles': '🕯️',
    'taper-candles': '🕯️',
    'wax-melts': '✨',
  };
  return map[cat] || '🕯️';
}

export function getBadgeColor(badge: string): string {
  const map: Record<string, string> = {
    'new': 'bg-emerald-600',
    'sale': 'bg-red-600',
    'bestseller': 'bg-gold',
    'limited': 'bg-purple-600',
  };
  return map[badge?.toLowerCase()] || 'bg-gold';
}

export function getBadgeLabel(badge: string): string {
  const map: Record<string, string> = {
    'new': 'New',
    'sale': 'Sale',
    'bestseller': 'Best Seller',
    'limited': 'Limited',
  };
  return map[badge?.toLowerCase()] || badge;
}
