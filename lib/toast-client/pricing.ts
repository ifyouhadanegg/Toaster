import { pricingResponseSchema, pricingRequestSchema, type PricingResponse } from '@/lib/schemas/pricing';
import { fetchJson } from './http';

export async function requestPricing(input: unknown): Promise<PricingResponse> {
  const payload = pricingRequestSchema.parse(input);
  const response = await fetchJson<unknown>('/api/pricing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return pricingResponseSchema.parse(response);
}