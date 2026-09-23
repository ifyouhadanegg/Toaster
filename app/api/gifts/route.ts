import { NextResponse } from 'next/server';
import { giftRequestSchema } from '@/lib/schemas/gift';
import { createGift } from '@/lib/mock-data/gifts';

export async function POST(request: Request) {
  const payload = giftRequestSchema.parse(await request.json());
  const gift = createGift(payload);

  return NextResponse.json(gift);
}
