import { describe, expect, it } from 'vitest';
import { GET as getMenu } from '@/app/api/menu/route';
import { POST as priceOrder } from '@/app/api/pricing/route';
import { POST as submitOrder } from '@/app/api/orders/route';

describe('route handlers', () => {
  it('returns the mock menu', async () => {
    const response = await getMenu();
    const body = await response.json();

    expect(body.groups).toHaveLength(2);
    expect(body.groups[0].items[0].name).toBe('Grilled Chicken Bowl');
  });

  it('returns pricing totals for a draft order', async () => {
    const response = await priceOrder(
      new Request('http://localhost/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemId: 'grilled-chicken-bowl',
          selectedModifiers: [{ groupId: 'chicken-bowl-protein', optionId: 'crispy' }]
        })
      })
    );

    const body = await response.json();

    expect(body.totalCents).toBe(1510);
    expect(body.lineItemDescription).toContain('Grilled Chicken Bowl');
  });

  it('returns a confirmed order with an order id', async () => {
    const response = await submitOrder(
      new Request('http://localhost/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemId: 'grilled-chicken-bowl',
          selectedModifiers: [{ groupId: 'chicken-bowl-protein', optionId: 'crispy' }]
        })
      })
    );

    const body = await response.json();

    expect(body.status).toBe('confirmed');
    expect(body.orderId).toMatch(/^ORD-/);
    expect(body.totalCents).toBe(1510);
  });
});