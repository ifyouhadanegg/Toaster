import { describe, expect, it } from 'vitest';
import { GET as getVenues } from '@/app/api/venues/route';
import { GET as getMenu } from '@/app/api/menu/route';
import { POST as priceOrder } from '@/app/api/pricing/route';
import { POST as submitOrder } from '@/app/api/orders/route';
import { POST as createGift } from '@/app/api/gifts/route';

describe('route handlers', () => {
  it('returns the mock venues', async () => {
    const response = await getVenues();
    const body = await response.json();

    expect(body.venues).toHaveLength(3);
    expect(body.venues[0].name).toBe('Daybreak Coffee Roasters');
  });

  it('returns the Codename:PhewBar menu for a venue', async () => {
    const response = await getMenu(new Request('http://localhost/api/menu?venueId=daybreak-coffee'));
    const body = await response.json();

    expect(body.groups[0].items).toHaveLength(3);
    expect(body.groups[0].items[0].name).toBe('House Drip Coffee');
  });

  it('returns pricing totals for a draft order', async () => {
    const response = await priceOrder(
      new Request('http://localhost/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          venueId: 'daybreak-coffee',
          itemId: 'daybreak-oat-latte',
          selectedModifiers: []
        })
      })
    );

    const body = await response.json();

    expect(body.totalCents).toBe(595);
    expect(body.lineItemDescription).toBe('Oat Milk Latte');
  });

  it('returns a confirmed order with an order id', async () => {
    const response = await submitOrder(
      new Request('http://localhost/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          venueId: 'daybreak-coffee',
          itemId: 'daybreak-oat-latte',
          selectedModifiers: []
        })
      })
    );

    const body = await response.json();

    expect(body.status).toBe('confirmed');
    expect(body.orderId).toMatch(/^ORD-/);
    expect(body.totalCents).toBe(595);
  });

  it('creates a redeemable gift with share links', async () => {
    const response = await createGift(
      new Request('http://localhost/api/gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          venueId: 'daybreak-coffee',
          itemId: 'daybreak-oat-latte',
          orderId: 'ORD-12345678'
        })
      })
    );

    const body = await response.json();

    expect(body.token).toMatch(/^GIFT-/);
    expect(body.redeemed).toBe(false);
    expect(body.shareLinks.mailto).toContain('mailto:');
    expect(body.shareLinks.sms).toContain('sms:');
  });
});