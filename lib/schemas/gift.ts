import { z } from 'zod';

export const giftRequestSchema = z.object({
  venueId: z.string(),
  itemId: z.string(),
  orderId: z.string()
});

export const giftSchema = z.object({
  token: z.string(),
  venueId: z.string(),
  venueName: z.string(),
  itemId: z.string(),
  itemName: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.literal('USD'),
  orderId: z.string(),
  createdAt: z.string(),
  redeemed: z.boolean(),
  shareLinks: z.object({
    mailto: z.string(),
    sms: z.string(),
    url: z.string()
  })
});

export type GiftRequest = z.infer<typeof giftRequestSchema>;
export type Gift = z.infer<typeof giftSchema>;
