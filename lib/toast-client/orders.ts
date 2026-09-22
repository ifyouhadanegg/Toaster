import { orderRequestSchema, orderResponseSchema, type OrderResponse } from '@/lib/schemas/order';
import { fetchJson } from './http';

export async function submitOrder(input: unknown): Promise<OrderResponse> {
  const payload = orderRequestSchema.parse(input);
  const response = await fetchJson<unknown>('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return orderResponseSchema.parse(response);
}