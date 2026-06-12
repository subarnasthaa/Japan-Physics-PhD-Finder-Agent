import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

export async function GET() {
  const totalInstitutions = institutions.filter((i) => i.type === 'University').length
  const totalNationalLabs = institutions.filter((i) => i.type === 'National Institute').length
  const totalResearchInstitutes = institutions.filter((i) => i.type === 'Research Institute').length
  const doctoralScholarships = institutions.filter((i) => i.funding?.doctoralScholarshipAvailable).length
  const mextEligible = institutions.filter((i) => i.funding?.mextEligible).length
  const jspsPositions = institutions.filter((i) => i.funding?.jspsEligible).length

  const stipends = institutions.filter((i) => i.monthlyJpy).map((i) => i.monthlyJpy as number)
  const avgStipendJpy = stipends.length > 0 ? Math.round(stipends.reduce((a, b) => a + b, 0) / stipends.length) : 0

  // Top fields
  const fieldCount: Record<string, number> = {}
  institutions.forEach((inst) => {
    inst.fields.split('|').forEach((f) => {
      const field = f.trim()
      if (field) fieldCount[field] = (fieldCount[field] || 0) + 1
    })
  })
  const topFields = Object.entries(fieldCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([field, count]) => ({ field, count }))

  // Top Japanese prefectures
  const stateCount: Record<string, number> = {}
  institutions.forEach((inst) => {
    stateCount[inst.country] = (stateCount[inst.country] || 0) + 1
  })
  const topStates = Object.entries(stateCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([state, count]) => ({ state, count }))

  return NextResponse.json({
    totalInstitutions,
    totalNationalLabs,
    totalResearchInstitutes,
    doctoralScholarships,
    mextEligible,
    jspsPositions,
    avgStipendJpy,
    topFields,
    topStates,
  })
}
