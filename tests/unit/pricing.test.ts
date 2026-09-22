import { describe, expect, it } from 'vitest';
import { calculatePricing } from '@/lib/mock-data/pricing';

describe('calculatePricing', () => {
  it('returns subtotal, tax, and total for a valid draft order', () => {
    const pricing = calculatePricing({
      itemId: 'grilled-chicken-bowl',
      selectedModifiers: [{ groupId: 'chicken-bowl-protein', optionId: 'crispy' }]
    });

    expect(pricing).toEqual({
      subtotalCents: 1395,
      taxCents: 115,
      totalCents: 1510,
      currency: 'USD',
      lineItemDescription: 'Grilled Chicken Bowl with Crispy'
    });
  });

  it('throws when a required modifier is missing', () => {
    expect(() =>
      calculatePricing({
        itemId: 'grilled-chicken-bowl',
        selectedModifiers: []
      })
    ).toThrow('Missing required modifier for Protein style.');
  });
});