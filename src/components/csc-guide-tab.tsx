'use client'

import { useState, useEffect } from 'react'
import {
  Award,
  Globe,
  MapPin,
  Phone,
  Clock,
  FileText,
  Calendar,
  CheckSquare,
  Square,
  ChevronDown,
  Building,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface CSCInfo {
  id: string
  title: string
  category: string
  content: string
}

export default function CSCGuideTab() {
  const [cscInfo, setCscInfo] = useState<CSCInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchCSCInfo() {
      try {
        const res = await fetch('/api/csc')
        if (res.ok) {
          const data = await res.json()
          setCscInfo(data)
        }
      } catch (err) {
        console.error('Error fetching CSC info:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCSCInfo()
  }, [])

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => {
      const next = new Set(prev)
      if (next.has(doc)) next.delete(doc)
      else next.add(doc)
      return next
    })
  }

  const requiredDocuments = [
    'Valid passport (minimum 6 months validity)',
    'Highest degree certificate (notarized)',
    'Transcripts (notarized)',
    'Two recommendation letters from professors/associate professors',
    'Research proposal / Study plan (800+ words)',
    'Foreigner Physical Examination Form',
    'HSK certificate (if applicable - not needed for English programs)',
    'Passport-size photos (2 recent)',
    'Police clearance certificate from Nepal Police',
    'Bank statement (for some universities)',
  ]

  const faqItems = [
    {
      question: 'Can I apply without HSK certificate?',
      answer: 'Yes! If you are applying for English-taught programs, you do not need an HSK certificate. Most Physics PhD programs are taught in English. You may need to provide IELTS/TOEFL scores instead, though many universities waive this requirement for students from English-medium backgrounds.',
    },
    {
      question: 'Can I switch universities after arriving in China?',
      answer: 'It is very difficult but technically possible with approval from both universities and CSC. The process requires consent from your current supervisor, the receiving university, and CSC. It is strongly recommended to choose your university carefully before accepting the offer.',
    },
    {
      question: 'Can I apply for both Type A and Type B scholarships?',
      answer: 'No, you can only apply for one type per year. You must choose between Type A (through the Chinese Embassy) or Type B (direct to universities). Applying for both will result in disqualification.',
    },
    {
      question: 'What if my CGPA is below 3.0?',
      answer: 'Some universities may accept students with CGPA below 3.0, especially if you have strong research experience or publications. However, CSC scholarships are highly competitive, and a CGPA above 3.0 significantly improves your chances. Consider university-specific scholarships which may have more flexible requirements.',
    },
    {
      question: 'Do I need to contact a professor before applying?',
      answer: 'Highly recommended! Reaching out to potential supervisors before applying shows initiative and can significantly improve your chances. A professor who agrees to supervise you can provide an acceptance letter, which strengthens your application. Send a well-crafted email with your CV, research interests, and why you want to work with them.',
    },
    {
      question: 'How much is the CSC stipend and is it enough to live on?',
      answer: 'CSC provides CNY 3,500/month for PhD students. In most Chinese cities (except Beijing and Shanghai), this is sufficient for basic living expenses including food, local transport, and personal items. Accommodation is usually provided free in university dormitories. In Beijing/Shanghai, you might need some personal savings for a comfortable lifestyle.',
    },
    {
      question: 'What is the Agency Number for Nepal?',
      answer: 'The Agency Number for Nepal for CSC Type A (Bilateral Program) is 5861. This is the number for the Chinese Embassy in Kathmandu which processes Type A applications.',
    },
    {
      question: 'Can I work part-time while on CSC scholarship?',
      answer: 'With permission from your university and CSC, you may be able to do limited part-time work such as teaching assistant or research assistant positions within the university. Off-campus work requires additional approvals and is generally restricted for scholarship students.',
    },
  ]

  const timelineSteps = [
    { month: 'January', title: 'Prepare Documents', desc: 'Gather and notarize all required documents, prepare research proposal, contact potential supervisors', color: 'bg-blue-500' },
    { month: 'February', title: 'Type A Applications Open', desc: 'Apply through Chinese Embassy in Kathmandu (Baluwatar) for CSC Type A Bilateral Program', color: 'bg-emerald-500' },
    { month: 'March', title: 'Type B Applications Open', desc: 'Apply via CSC online portal (studyinchina.csc.edu.cn) - can apply to max 3 universities', color: 'bg-emerald-600' },
    { month: 'April', title: 'Most Deadlines', desc: 'Deadline for most university programs and CSC applications. Submit all materials before deadline', color: 'bg-amber-500' },
    { month: 'May', title: 'Results Announced', desc: 'CSC and universities announce scholarship results. Accept or decline offers promptly', color: 'bg-orange-500' },
    { month: 'June-July', title: 'Visa Processing', desc: 'Apply for X1 student visa at Chinese Embassy. Complete medical examination, arrange travel', color: 'bg-red-500' },
    { month: 'September', title: 'Arrival in China', desc: 'Arrive at university, complete registration, begin your PhD journey!', color: 'bg-emerald-600' },
  ]

  const provincialScholarships = [
    { name: 'Beijing Government Scholarship', coverage: 'Tuition waiver + stipend', note: 'Apply through university' },
    { name: 'Shanghai Government Scholarship', coverage: 'Full or partial tuition waiver', note: 'Type A & B available' },
    { name: 'Jiangsu Province Scholarship', coverage: 'Tuition + stipend CNY 2,000-3,000/month', note: 'Apply via JSU portal' },
    { name: 'Zhejiang Province Scholarship', coverage: 'Tuition waiver + stipend', note: 'Apply through university' },
    { name: 'Guangdong Province Scholarship', coverage: 'Tuition + stipend', note: 'For universities in Guangdong' },
    { name: 'Anhui Province Scholarship', coverage: 'Tuition + partial living allowance', note: 'USTC students eligible' },
    { name: 'Sichuan Province Scholarship', coverage: 'Tuition waiver + stipend', note: 'Apply through university' },
  ]

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-red-600 dark:from-emerald-700 dark:to-red-700 rounded-xl p-4 md:p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-1">CSC Scholarship Guide for Nepali Students</h2>
        <p className="text-white/80 text-sm md:text-base">
          Complete guide to Chinese Government Scholarships (CSC) for Nepali MSc Physics graduates from Tribhuvan University
        </p>
      </div>

      {/* Type A Section */}
      <Card className="border-emerald-200 dark:border-emerald-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-emerald-700 dark:text-emerald-400">
            <Award className="size-5" />
            CSC Scholarship Type A — Bilateral Program
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Government-to-government scholarship program between China and Nepal. The Chinese Embassy in Kathmandu nominates candidates to CSC.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Coverage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full tuition waiver, free accommodation, stipend CNY 3,500/month, comprehensive medical insurance.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Eligibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nepali citizens with a Master&apos;s degree, under age 35 for PhD programs, in good health.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Application Process</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Apply through the Chinese Embassy in Kathmandu. You submit documents directly to the Embassy&apos;s Education Office.
              </p>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              <Badge className="bg-emerald-600 text-white">Agency Number: 5861</Badge>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Use this agency number when applying through the CSC portal for Type A. Deadline: January — April each year.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Type B Section */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-red-700 dark:text-red-400">
            <Globe className="size-5" />
            CSC Scholarship Type B — Chinese University Program
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Direct application to specific Chinese universities. You choose the university and program directly.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Coverage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Same as Type A: Full tuition waiver, free accommodation, stipend CNY 3,500/month, comprehensive medical insurance.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Eligibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nepali citizens with a Master&apos;s degree, under age 35 for PhD, not currently studying in China.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Application Process</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Apply via CSC online portal at <span className="font-mono text-xs">studyinchina.csc.edu.cn</span>. You can apply to a maximum of 3 universities.
              </p>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3">
            <p className="text-xs text-red-700 dark:text-red-400">
              <strong>Important:</strong> You can apply to a maximum of 3 universities for Type B. Deadline: March — April each year.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Type A vs Type B — Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-left py-2 px-3 font-semibold text-emerald-700 dark:text-emerald-400">Type A (Bilateral)</th>
                  <th className="text-left py-2 px-3 font-semibold text-red-700 dark:text-red-400">Type B (University)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ['Application Channel', 'Chinese Embassy in Kathmandu', 'CSC Online Portal (studyinchina.csc.edu.cn)'],
                  ['University Choice', 'Assigned by CSC (preference considered)', 'You choose (max 3 universities)'],
                  ['Agency Number', '5861', 'University-specific number'],
                  ['Coverage', 'Full (tuition + accommodation + stipend + insurance)', 'Full (tuition + accommodation + stipend + insurance)'],
                  ['Monthly Stipend', 'CNY 3,500/month', 'CNY 3,500/month'],
                  ['Deadline', 'January – April', 'March – April'],
                  ['Competition', 'Lower (country quota)', 'Higher (global pool)'],
                  ['Can choose supervisor?', 'Yes, but depends on placement', 'Yes, contact before applying'],
                  ['Apply for both?', 'No — only one type per year', 'No — only one type per year'],
                ].map(([feature, typeA, typeB], i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 font-medium text-gray-700 dark:text-gray-300">{feature}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{typeA}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{typeB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Chinese Embassy in Nepal */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-400">
            <Building className="size-5" />
            Chinese Embassy in Nepal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Address</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Baluwatar, Kathmandu, Nepal</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Phone</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">+977-1-4411740</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Working Hours</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monday – Friday: 9:00 AM – 12:00 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Website</div>
                  <a href="http://np.china-embassy.gov.cn" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                    np.china-embassy.gov.cn
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Visit the Embassy in person during working hours to submit your Type A application. Call ahead to confirm the exact dates for CSC application acceptance, as they may vary each year.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="size-5 text-emerald-600" />
            Application Timeline — September 2026 Intake
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-4">
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`size-[30px] rounded-full ${step.color} flex items-center justify-center text-white text-xs font-bold shrink-0 z-10 shadow-sm`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{step.month}</span>
                      <Badge variant="outline" className="text-xs">{step.title}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents Checklist */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="size-5 text-emerald-600" />
            Required Documents Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            {checkedDocs.size} of {requiredDocuments.length} documents checked
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(checkedDocs.size / requiredDocuments.length) * 100}%` }}
            />
          </div>
          <div className="space-y-2">
            {requiredDocuments.map((doc) => (
              <button
                key={doc}
                onClick={() => toggleDoc(doc)}
                className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors"
              >
                {checkedDocs.has(doc) ? (
                  <CheckSquare className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="size-4 text-gray-400 shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${checkedDocs.has(doc) ? 'text-emerald-700 dark:text-emerald-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                  {doc}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Provincial Scholarships */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="size-5 text-red-600" />
            Provincial Government Scholarships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            In addition to CSC scholarships, many Chinese provinces offer their own scholarships for international students. These can be combined with or used as alternatives to CSC.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {provincialScholarships.map((scholarship) => (
              <div key={scholarship.name} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{scholarship.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{scholarship.coverage}</p>
                <Badge variant="outline" className="text-xs">{scholarship.note}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left text-gray-900 dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Dynamic CSC Info from API */}
      {!loading && cscInfo.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Additional CSC Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {cscInfo.map((info, i) => {
                let parsedContent: Record<string, unknown> | null = null
                try {
                  parsedContent = JSON.parse(info.content)
                } catch {
                  // not JSON, use as-is
                }

                return (
                  <AccordionItem key={info.id} value={`csc-${i}`}>
                    <AccordionTrigger className="text-sm text-left">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{info.category}</Badge>
                        <span className="text-gray-900 dark:text-white">{info.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
                      {parsedContent ? (
                        <pre className="whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-900 rounded-lg p-3 overflow-x-auto">
                          {JSON.stringify(parsedContent, null, 2)}
                        </pre>
                      ) : (
                        <p>{info.content}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
