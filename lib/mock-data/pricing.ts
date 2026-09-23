import { type DraftOrder, pricingBreakdownSchema, pricingResponseSchema } from '@/lib/schemas/pricing';
import { findPhewBArItem } from './venues';
import { roundToCents } from '@/lib/utils/money';

const TAX_RATE = 0.0825;

export function calculatePricing(draftOrder: DraftOrder) {
  const item = findPhewBArItem(draftOrder.venueId, draftOrder.itemId);

  if (!item) {
    throw new Error('Unknown menu item.');
  }

  const selectedOptions = item.modifierGroups.map((group) => {
    const selected = draftOrder.selectedModifiers.find((modifier) => modifier.groupId === group.id);
    if (!selected) {
      throw new Error(`Missing required modifier for ${group.label}.`);
    }

    const option = group.options.find((choice) => choice.id === selected.optionId);
    if (!option) {
      throw new Error(`Unknown modifier option for ${group.label}.`);
    }

    return option;
  });

  const subtotalCents = item.priceCents + selectedOptions.reduce((sum, option) => sum + option.priceDeltaCents, 0);
  const taxCents = roundToCents(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;
  const modifierLabels = selectedOptions.map((option) => option.label).join(', ');

  return pricingResponseSchema.parse({
    subtotalCents,
    taxCents,
    totalCents,
    currency: 'USD',
    lineItemDescription: modifierLabels ? `${item.name} with ${modifierLabels}` : item.name
  });
}

export function blankPricingBreakdown() {
  return pricingBreakdownSchema.parse({
    subtotalCents: 0,
    taxCents: 0,
    totalCents: 0,
    currency: 'USD'
  });
}