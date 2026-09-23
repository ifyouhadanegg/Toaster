import { giftSchema, type Gift, type GiftRequest } from '@/lib/schemas/gift';
import { fetchJson } from './http';

export async function createGift(input: GiftRequest): Promise<Gift> {
  const response = await fetchJson<unknown>('/api/gifts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });

  return giftSchema.parse(response);
}
