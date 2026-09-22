import { NextResponse } from 'next/server';
import { getMenu } from '@/lib/mock-data/menu';

export async function GET() {
  return NextResponse.json(getMenu());
}