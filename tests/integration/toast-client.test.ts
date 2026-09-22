import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadMenu } from '@/lib/toast-client/menu';
import { requestPricing } from '@/lib/toast-client/pricing';
import { submitOrder } from '@/lib/toast-client/orders';
import { mockMenu } from '@/lib/mock-data/menu';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('toast client', () => {
  it('loads and validates the menu', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(mockMenu), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );

    await expect(loadMenu()).resolves.toEqual(mockMenu);
  });

  it('posts pricing requests and parses the response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          subtotalCents: 1050,
          taxCents: 87,
          totalCents: 1137,
          currency: 'USD',
          lineItemDescription: 'Avocado Smash with Gluten-free'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    );

    await expect(
      requestPricing({
        itemId: 'grilled-chicken-bowl',
        selectedModifiers: [{ groupId: 'chicken-bowl-protein', optionId: 'crispy' }]
      })
    ).resolves.toMatchObject({ totalCents: 1510 });
  });

  it('posts orders and parses the confirmation', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          subtotalCents: 1050,
          taxCents: 87,
          totalCents: 1137,
          currency: 'USD',
          orderId: 'ORD-1234ABCD',
          status: 'confirmed',
          lineItemDescription: 'Avocado Smash with Gluten-free'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    );

    await expect(
      submitOrder({
        itemId: 'grilled-chicken-bowl',
        selectedModifiers: [{ groupId: 'chicken-bowl-protein', optionId: 'crispy' }]
      })
    ).resolves.toMatchObject({ orderId: 'ORD-1234ABCD', status: 'confirmed' });
  });
});