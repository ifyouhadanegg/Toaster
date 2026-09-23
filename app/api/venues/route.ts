import { NextResponse } from 'next/server';
import { getVenues } from '@/lib/mock-data/venues';

export async function GET() {
  return NextResponse.json({ venues: getVenues() });
}
