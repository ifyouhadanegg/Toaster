import { describe, expect, it } from 'vitest';
import { calculatePricing } from '@/lib/mock-data/pricing';

describe('calculatePricing', () => {
  it('returns subtotal, tax, and total for a valid draft order', () => {
    const pricing = calculatePricing({
      venueId: 'daybreak-coffee',
      itemId: 'daybreak-oat-latte',
      selectedModifiers: []
    });

    expect(pricing).toEqual({
      subtotalCents: 550,
      taxCents: 45,
      totalCents: 595,
      currency: 'USD',
      lineItemDescription: 'Oat Milk Latte'
    });
  });

  it('throws when the item does not belong to the venue', () => {
    expect(() =>
      calculatePricing({
        venueId: 'daybreak-coffee',
        itemId: 'amber-house-lager',
        selectedModifiers: []
      })
    ).toThrow('Unknown menu item.');
  });
});