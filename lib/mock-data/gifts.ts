import { giftSchema, type Gift, type GiftRequest } from '@/lib/schemas/gift';
import { findPhewBArItem, getVenueById } from './venues';
import { createGiftToken } from '@/lib/utils/ids';

const giftStore = new Map<string, Gift>();

export function createGift(request: GiftRequest): Gift {
  const venue = getVenueById(request.venueId);
  const item = findPhewBArItem(request.venueId, request.itemId);

  if (!venue || !item) {
    throw new Error('Unknown venue or menu item.');
  }

  const token = createGiftToken();
  const redeemUrl = `https://toaster-hvlv.onrender.com/redeem/${token}`;
  const message = `You've been gifted a ${item.name} on me at ${venue.name}! Show this at the counter to redeem: ${redeemUrl}`;

  const gift = giftSchema.parse({
    token,
    venueId: venue.id,
    venueName: venue.name,
    itemId: item.id,
    itemName: item.name,
    priceCents: item.priceCents,
    currency: 'USD',
    orderId: request.orderId,
    createdAt: new Date().toISOString(),
    redeemed: false,
    shareLinks: {
      mailto: `mailto:?subject=${encodeURIComponent(`A ${item.name} on me!`)}&body=${encodeURIComponent(message)}`,
      sms: `sms:?&body=${encodeURIComponent(message)}`,
      url: redeemUrl
    }
  });

  giftStore.set(token, gift);

  return gift;
}
