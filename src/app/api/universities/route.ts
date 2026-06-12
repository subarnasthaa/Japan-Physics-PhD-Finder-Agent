import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

export async function GET() {
  return NextResponse.json(institutions)
}
