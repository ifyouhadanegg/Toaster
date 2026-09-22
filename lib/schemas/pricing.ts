import { z } from 'zod';

export const selectedModifierSchema = z.object({
  groupId: z.string(),
  optionId: z.string()
});

export const draftOrderSchema = z.object({
  itemId: z.string(),
  selectedModifiers: z.array(selectedModifierSchema)
});

export const pricingRequestSchema = draftOrderSchema;

export const pricingBreakdownSchema = z.object({
  subtotalCents: z.number().int().nonnegative(),
  taxCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
  currency: z.literal('USD')
});

export const pricingResponseSchema = pricingBreakdownSchema.extend({
  lineItemDescription: z.string()
});

export type DraftOrder = z.infer<typeof draftOrderSchema>;
export type PricingBreakdown = z.infer<typeof pricingBreakdownSchema>;
export type PricingResponse = z.infer<typeof pricingResponseSchema>;