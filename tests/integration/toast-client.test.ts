import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadMenu } from '@/lib/toast-client/menu';
import { loadVenues } from '@/lib/toast-client/venues';
import { requestPricing } from '@/lib/toast-client/pricing';
import { submitOrder } from '@/lib/toast-client/orders';
import { createGift } from '@/lib/toast-client/gifts';
import { getPhewBArMenu } from '@/lib/mock-data/venues';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('toast client', () => {
  it('loads and validates the menu for a venue', async () => {
    const menu = getPhewBArMenu('daybreak-coffee');

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(menu), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );

    await expect(loadMenu('daybreak-coffee')).resolves.toEqual(menu);
  });

  it('loads and validates venues', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          venues: [
            { id: 'daybreak-coffee', name: 'Daybreak Coffee Roasters', kind: 'coffee_shop', tagline: 'Coffee', location: '4th & Pine' }
          ]
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    );

    await expect(loadVenues()).resolves.toMatchObject({ venues: [{ id: 'daybreak-coffee' }] });
  });

  it('posts pricing requests and parses the response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          subtotalCents: 550,
          taxCents: 45,
          totalCents: 595,
          currency: 'USD',
          lineItemDescription: 'Oat Milk Latte'
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
        venueId: 'daybreak-coffee',
        itemId: 'daybreak-oat-latte',
        selectedModifiers: []
      })
    ).resolves.toMatchObject({ totalCents: 595 });
  });

  it('posts orders and parses the confirmation', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          subtotalCents: 550,
          taxCents: 45,
          totalCents: 595,
          currency: 'USD',
          orderId: 'ORD-1234ABCD',
          status: 'confirmed',
          lineItemDescription: 'Oat Milk Latte'
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
        venueId: 'daybreak-coffee',
        itemId: 'daybreak-oat-latte',
        selectedModifiers: []
      })
    ).resolves.toMatchObject({ orderId: 'ORD-1234ABCD', status: 'confirmed' });
  });

  it('creates a gift and parses the response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          token: 'GIFT-1234ABCD',
          venueId: 'daybreak-coffee',
          venueName: 'Daybreak Coffee Roasters',
          itemId: 'daybreak-oat-latte',
          itemName: 'Oat Milk Latte',
          priceCents: 550,
          currency: 'USD',
          orderId: 'ORD-1234ABCD',
          createdAt: new Date().toISOString(),
          redeemed: false,
          shareLinks: { mailto: 'mailto:?subject=Hi', sms: 'sms:?&body=Hi', url: 'https://toaster.demo/redeem/GIFT-1234ABCD' }
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
      createGift({ venueId: 'daybreak-coffee', itemId: 'daybreak-oat-latte', orderId: 'ORD-1234ABCD' })
    ).resolves.toMatchObject({ token: 'GIFT-1234ABCD' });
  });
});