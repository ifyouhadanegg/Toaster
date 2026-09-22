import { NextResponse } from 'next/server';
import { pricingRequestSchema } from '@/lib/schemas/pricing';
import { calculatePricing } from '@/lib/mock-data/pricing';

export async function POST(request: Request) {
  const payload = pricingRequestSchema.parse(await request.json());
  const pricing = calculatePricing(payload);

  return NextResponse.json(pricing);
}