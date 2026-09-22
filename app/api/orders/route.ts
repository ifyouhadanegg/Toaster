import { NextResponse } from 'next/server';
import { orderRequestSchema } from '@/lib/schemas/order';
import { calculatePricing } from '@/lib/mock-data/pricing';
import { createOrderId } from '@/lib/utils/ids';

export async function POST(request: Request) {
  const payload = orderRequestSchema.parse(await request.json());
  const pricing = calculatePricing(payload);

  return NextResponse.json({
    ...pricing,
    orderId: createOrderId(),
    status: 'confirmed',
    lineItemDescription: pricing.lineItemDescription
  });
}