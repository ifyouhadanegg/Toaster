import { menuResponseSchema, type MenuResponse } from '@/lib/schemas/menu';
import { fetchJson } from './http';

export async function loadMenu(): Promise<MenuResponse> {
  const payload = await fetchJson<unknown>('/api/menu');
  return menuResponseSchema.parse(payload);
}