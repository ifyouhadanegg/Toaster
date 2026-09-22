import { pricingBreakdownSchema, draftOrderSchema } from './pricing';
import { z } from 'zod';

export const orderRequestSchema = draftOrderSchema;

export const orderResponseSchema = pricingBreakdownSchema.extend({
  orderId: z.string(),
  status: z.literal('confirmed'),
  lineItemDescription: z.string()
});

export type OrderRequest = z.infer<typeof orderRequestSchema>;
export type OrderResponse = z.infer<typeof orderResponseSchema>;