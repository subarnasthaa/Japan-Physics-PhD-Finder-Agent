import { NextResponse } from 'next/server'
import { scholarships } from '@/lib/static-data'

export async function GET() {
  return NextResponse.json(scholarships)
}
