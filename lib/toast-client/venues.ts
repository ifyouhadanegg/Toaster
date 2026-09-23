import { venuesResponseSchema, type VenuesResponse } from '@/lib/schemas/venue';
import { fetchJson } from './http';

export async function loadVenues(): Promise<VenuesResponse> {
  const payload = await fetchJson<unknown>('/api/venues');
  return venuesResponseSchema.parse(payload);
}
