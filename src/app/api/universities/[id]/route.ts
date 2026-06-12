import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const institution = institutions.find((i) => i.id === id)

  if (!institution) {
    return NextResponse.json({ error: 'Institution not found' }, { status: 404 })
  }

  return NextResponse.json(institution)
}
