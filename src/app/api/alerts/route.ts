import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

export async function GET() {
  // Generate alerts from institutions with deadlines
  const now = new Date()
  const alerts: Array<{
    id: string
    name: string
    city: string
    state: string
    type: string
    deadline: string
    daysLeft: number
    contractType: string
    languageInstruction: string
    englishLabLife: boolean
    monthlyJpy: number | null
    fields: string
  }> = []

  institutions.forEach((inst) => {
    if (inst.deadline && inst.deadline !== 'Rolling' && inst.deadline !== 'Rolling admissions' && inst.deadline !== 'Varies') {
      const deadlineDate = new Date(inst.deadline)
      const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (daysLeft > 0 && daysLeft < 365) {
        alerts.push({
          id: inst.id,
          name: inst.name,
          city: inst.city,
          state: inst.country,
          type: inst.type,
          deadline: inst.deadline,
          daysLeft,
          contractType: inst.contractType,
          languageInstruction: inst.languageInstruction,
          englishLabLife: inst.englishLabLife,
          monthlyJpy: inst.monthlyJpy,
          fields: inst.fields,
        })
      }
    } else if (inst.deadline === 'Rolling' || inst.deadline === 'Rolling admissions') {
      // Rolling admission — mark as safe
      alerts.push({
        id: inst.id,
        name: inst.name,
        city: inst.city,
        state: inst.country,
        type: inst.type,
        deadline: 'Rolling Admission',
        daysLeft: 999,
        contractType: inst.contractType,
        languageInstruction: inst.languageInstruction,
        englishLabLife: inst.englishLabLife,
        monthlyJpy: inst.monthlyJpy,
        fields: inst.fields,
      })
    }
  })

  // Sort by daysLeft (urgent first)
  alerts.sort((a, b) => {
    if (a.daysLeft === 999) return 1
    if (b.daysLeft === 999) return -1
    return a.daysLeft - b.daysLeft
  })

  return NextResponse.json(alerts)
}
