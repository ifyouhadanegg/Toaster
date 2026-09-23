import { NextResponse } from 'next/server';
import { getPhewBArMenu } from '@/lib/mock-data/venues';

export async function GET(request: Request) {
  const venueId = new URL(request.url).searchParams.get('venueId');

  if (!venueId) {
    return NextResponse.json({ message: 'venueId is required.' }, { status: 400 });
  }

  const menu = getPhewBArMenu(venueId);

  if (!menu) {
    return NextResponse.json({ message: 'Unknown venue.' }, { status: 404 });
  }

  return NextResponse.json(menu);
}