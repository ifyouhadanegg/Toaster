import { menuResponseSchema, type MenuResponse } from '@/lib/schemas/menu';
import { fetchJson } from './http';

export async function loadMenu(venueId: string): Promise<MenuResponse> {
  const payload = await fetchJson<unknown>(`/api/menu?venueId=${encodeURIComponent(venueId)}`);
  return menuResponseSchema.parse(payload);
}