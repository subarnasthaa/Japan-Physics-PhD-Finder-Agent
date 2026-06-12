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
  Building,
  ExternalLink,
  AlertCircle,
  BookOpen,
  DollarSign,
  Plane,
  Shield,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface FundingInfo {
  id: string
  title: string
  category: string
  content: string
}

export default function FundingGuideTab() {
  const [fundingInfo, setFundingInfo] = useState<FundingInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchFundingInfo() {
      try {
        const res = await fetch('/api/funding')
        if (res.ok) {
          const data = await res.json()
          setFundingInfo(data)
        }
      } catch (err) {
        console.error('Error fetching funding info:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFundingInfo()
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
    'Transcripts (official, evaluated by WES or similar)',
    'GRE scores (if required by program)',
    'TOEFL/IELTS scores',
    'Statement of Purpose (SOP)',
    '3 Letters of Recommendation',
    'CV/Resume',
    'Writing sample (some programs)',
    'Diversity statement (some programs)',
    'Application fee ($50-$150 per program)',
    'Financial documentation (for I-20 form)',
  ]

  const faqItems = [
    {
      question: 'Can I apply without GRE?',
      answer: 'Yes, many programs have gone GRE-optional post-COVID. According to recent surveys, over 60% of US physics PhD programs no longer require the GRE General Test. However, some top programs still recommend it, and the Physics GRE may still be required by certain programs. Check each program\'s requirements carefully.',
    },
    {
      question: 'What\'s the minimum TOEFL score?',
      answer: 'TOEFL requirements vary by university: typically 80-100 range for the internet-based test. IELTS equivalent is usually 6.5-7.5. Top programs like MIT, Stanford, and Princeton often require TOEFL 100+ or IELTS 7.5+. Some universities have lower minimums but the competitive score for admission with funding is usually higher.',
    },
    {
      question: 'Can I work while on F-1 visa?',
      answer: 'Only on-campus employment is allowed on F-1 visa without additional authorization. Research Assistant (RA) and Teaching Assistant (TA) positions count as on-campus employment and are the primary funding sources for PhD students. Off-campus work requires CPT (Curricular Practical Training) or OPT (Optional Practical Training) authorization.',
    },
    {
      question: 'How much is the stipend?',
      answer: 'Stipends range from $25,000-$45,000/year depending on location and university. Higher cost-of-living areas (Boston, San Francisco, New York) tend to offer higher stipends ($35,000-$45,000), but living expenses are also higher. Most physics PhD programs include full tuition waiver plus health insurance in addition to the stipend.',
    },
    {
      question: 'Do I need to contact professors before applying?',
      answer: 'Highly recommended, especially for top programs! Reaching out to potential advisors shows initiative and can significantly improve your chances. A professor who agrees to take you on can advocate for your admission and may have funding to support you. Send a well-crafted email with your CV, research interests, and why you want to work with them.',
    },
    {
      question: 'What if my degree is 3-year bachelor\'s + 2-year master\'s?',
      answer: 'Most US universities accept the 3-year bachelor\'s + 2-year master\'s combination from Tribhuvan University as equivalent to a US 4-year bachelor\'s + master\'s. However, some universities may require a credential evaluation through WES (World Education Services) or similar agencies. It\'s best to get a WES evaluation to be safe, which typically costs $200-$350.',
    },
    {
      question: 'Can I apply for Spring admission?',
      answer: 'Most Physics PhD programs only offer Fall admission (starting August/September). Spring admission (January) is rare for physics and typically only available in special circumstances, such as internal transfers or when a professor specifically requests it. Plan your application timeline around Fall admission deadlines.',
    },
    {
      question: 'What is the OPT/CPT system?',
      answer: 'CPT (Curricular Practical Training) allows F-1 students to work off-campus in positions related to their field of study before graduation, typically for internships. OPT (Optional Practical Training) allows work after graduation — 12 months for non-STEM degrees, but 36 months for STEM degrees including Physics. This 3-year STEM OPT extension is a major advantage for physics PhD graduates seeking employment in the US.',
    },
  ]

  const timelineSteps = [
    { month: 'July-September', title: 'Research Programs', desc: 'Research programs, contact professors, identify target schools, attend virtual info sessions', color: 'bg-blue-500' },
    { month: 'September-October', title: 'Prepare Tests & SOP', desc: 'Prepare GRE/TOEFL, draft Statement of Purpose, refine research interests', color: 'bg-blue-600' },
    { month: 'October-November', title: 'Request Letters', desc: 'Request recommendation letters, prepare applications, gather transcripts, get WES evaluation', color: 'bg-blue-700' },
    { month: 'November-December', title: 'Submit Applications', desc: 'Most deadlines Dec 1-Jan 15. Submit all applications with required materials and fees', color: 'bg-red-500' },
    { month: 'January-February', title: 'Interviews & Wait', desc: 'Some programs conduct interviews. Wait for admission decisions', color: 'bg-amber-500' },
    { month: 'March-April', title: 'Compare Offers', desc: 'Admission decisions arrive. Compare funding packages, visit campuses (visit days)', color: 'bg-amber-600' },
    { month: 'May-June', title: 'Accept & Visa', desc: 'Accept offer by April 15 (standard deadline). Apply for F-1 student visa at US Embassy Kathmandu', color: 'bg-red-600' },
    { month: 'August', title: 'Arrive in USA', desc: 'Arrive in USA, attend orientation, begin your PhD journey!', color: 'bg-blue-800' },
  ]

  const fellowshipCards = [
    { name: 'NSF GRFP', description: 'National Science Foundation Graduate Research Fellowship — $37,000/year stipend + $16,000 education allowance', eligibility: 'US citizens/nationals only (international students can be nominated by university)', color: 'border-blue-200 dark:border-blue-800' },
    { name: 'DOE CSGF', description: 'Department of Energy Computational Science Graduate Fellowship — Full tuition + $38,000/year stipend', eligibility: 'US citizens/permanent residents only', color: 'border-blue-200 dark:border-blue-800' },
    { name: 'NASA Fellowship', description: 'NASA Space Technology Research Fellowship — Full tuition + $36,000/year stipend', eligibility: 'US citizens only', color: 'border-blue-200 dark:border-blue-800' },
    { name: 'NDSEG', description: 'National Defense Science & Engineering Graduate Fellowship — Full tuition + $38,400/year stipend', eligibility: 'US citizens/nationals only', color: 'border-blue-200 dark:border-blue-800' },
    { name: 'Fulbright', description: 'Fulbright Program for Nepal — Full funding including tuition, living, and travel', eligibility: 'Nepali citizens — apply through USEF Nepal', color: 'border-red-200 dark:border-red-800' },
    { name: 'AAUW Fellowship', description: 'AAUW International Fellowship — $20,000-$50,000 for women pursuing graduate study in the US', eligibility: 'International women with bachelor\'s degree', color: 'border-red-200 dark:border-red-800' },
    { name: 'Aga Khan Foundation', description: 'Aga Khan Foundation International Scholarship — 50% grant + 50% loan for graduate study', eligibility: 'Developing country nationals (including Nepal)', color: 'border-red-200 dark:border-red-800' },
    { name: 'University Fellowships', description: 'Named university fellowships (e.g., Stanford SGF, Princeton Fellowship) — Full funding + stipend', eligibility: 'All admitted students, competitive selection by department', color: 'border-amber-200 dark:border-amber-800' },
  ]

  const visaItems = [
    {
      title: 'F-1 Student Visa',
      content: 'The most common visa for international students. You receive an I-20 form from your university after admission and proof of finances. Apply at the US Embassy in Kathmandu. F-1 allows full-time study and on-campus employment (RA/TA positions). Duration: valid for the length of your academic program plus 60 days.',
    },
    {
      title: 'J-1 Exchange Visitor Visa',
      content: 'Used for exchange programs, some fellowships, and visiting researcher positions. Requires a DS-2019 form. Some J-1 visas have a "two-year home residency requirement" meaning you must return to Nepal for 2 years before applying for certain US visas. Check if your program is subject to this requirement.',
    },
    {
      title: 'I-20 Form',
      content: 'The Certificate of Eligibility for Nonimmigrant Student Status is issued by your university after you prove you have sufficient funds to cover tuition, living expenses, and other costs. Your university\'s international student office will help you with this process. You need the I-20 to apply for an F-1 visa.',
    },
    {
      title: 'SEVIS Fee',
      content: 'The Student and Exchange Visitor Information System (SEVIS) fee must be paid before your visa interview. For F-1 students, the fee is $350. For J-1 exchange visitors, it is $220. Pay online at fmjfee.com and bring the receipt to your visa interview.',
    },
    {
      title: 'Visa Interview Tips for Nepali Students',
      content: '1) Apply early — appointments at the US Embassy Kathmandu can be limited. 2) Bring all documents: I-20/DS-2019, admission letter, financial documents, transcripts, test scores. 3) Be prepared to explain your research plans and ties to Nepal. 4) Demonstrate strong intent to return (though this is less scrutinized for PhD students). 5) Dress professionally and answer questions confidently and honestly.',
    },
  ]

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-red-600 dark:from-blue-800 dark:to-red-700 rounded-xl p-4 md:p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-1">Funding Guide for Nepali Students</h2>
        <p className="text-white/80 text-sm md:text-base">
          Complete guide to funding your Physics PhD in the USA — fellowships, university funding, visa information, and more
        </p>
      </div>

      {/* NSF GRFP Section */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-blue-700 dark:text-blue-400">
            <Award className="size-5" />
            NSF Graduate Research Fellowship Program (GRFP)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The NSF GRFP is one of the most prestigious graduate fellowships in the US, supporting outstanding students in STEM fields including physics.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Coverage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                $37,000/year stipend for 3 years + $16,000/year cost-of-education allowance paid to the institution. No work requirement — you focus on research.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Eligibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                US citizens and nationals ONLY. Nepali students are NOT directly eligible. However, once enrolled at a US university, some departments can nominate exceptional international students for university-internal fellowships modeled after the GRFP.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Application Tips</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                While you cannot apply directly, knowing about NSF GRFP helps you understand the US research funding landscape. When contacting professors, ask about their NSF grants — being hired on an NSF-funded project is a common path to RA funding.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="size-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 dark:text-blue-400">
                <strong>Important for Nepali Students:</strong> You cannot apply for NSF GRFP directly. However, most physics PhD programs at US universities guarantee full funding (tuition + stipend) through Teaching Assistant (TA) and Research Assistant (RA) positions. This is your primary funding pathway.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fulbright Section */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-red-700 dark:text-red-400">
            <Globe className="size-5" />
            Fulbright Program for Nepal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The Fulbright Program is the flagship international educational exchange program sponsored by the US government. Nepal has an active Fulbright program through USEF Nepal.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Coverage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full funding including tuition, living expenses, travel costs, and health insurance. One of the most comprehensive scholarships available for Nepali students.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Eligibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nepali citizens with a 4-year bachelor&apos;s degree or master&apos;s degree. Must have strong academic record and demonstrate leadership potential. Must return to Nepal for at least 2 years after the program.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Application Process</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Apply through USEF Nepal (United States Educational Foundation in Nepal) or the US Embassy Kathmandu. Applications typically open in February-March each year for the following academic year.
              </p>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3">
            <p className="text-xs text-red-700 dark:text-red-400">
              <strong>Deadline:</strong> Typically February-March each year. Visit <a href="https://usefnepal.org.np" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-500">usefnepal.org.np</a> for the most current information and application deadlines.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Funding Comparison — NSF GRFP vs Fulbright vs University Funding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-left py-2 px-3 font-semibold text-blue-700 dark:text-blue-400">NSF GRFP</th>
                  <th className="text-left py-2 px-3 font-semibold text-red-700 dark:text-red-400">Fulbright</th>
                  <th className="text-left py-2 px-3 font-semibold text-amber-700 dark:text-amber-400">University (TA/RA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ['Eligible for Nepali?', 'No (US citizens only)', 'Yes (Nepali citizens)', 'Yes (all admitted students)'],
                  ['Annual Stipend', '$37,000', '~$30,000-$40,000', '$25,000-$45,000'],
                  ['Tuition Coverage', '$16,000/yr education allowance', 'Full tuition', 'Full tuition waiver'],
                  ['Duration', '3 years', '1-2 years (renewable)', '4-6 years (while in good standing)'],
                  ['Work Requirement', 'None (pure research)', 'None', 'TA: 20hrs/wk teaching, RA: 20hrs/wk research'],
                  ['Application Deadline', 'October (US citizens)', 'February-March', 'December-January (with PhD application)'],
                  ['Health Insurance', 'Not included', 'Included', 'Usually included'],
                  ['Competitiveness', 'Very high (~16% acceptance)', 'High (~5-10% for Nepal)', 'Moderate (most physics PhDs funded)'],
                ].map(([feature, nsf, fulbright, uni], i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 font-medium text-gray-700 dark:text-gray-300">{feature}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{nsf}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{fulbright}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{uni}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* US Embassy in Nepal Card */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-400">
            <Building className="size-5" />
            US Embassy in Nepal & USEF Nepal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">US Embassy Kathmandu</h4>
              <div className="flex items-start gap-2">
                <MapPin className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Address</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Maharajgunj, Kathmandu, Nepal</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Phone</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">+977-1-423-4000</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Website</div>
                  <a href="https://np.usembassy.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                    np.usembassy.gov
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">USEF Nepal (Fulbright Commission)</h4>
              <div className="flex items-start gap-2">
                <MapPin className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Address</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Gyaneshwor, Kathmandu, Nepal</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Working Hours</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sunday – Friday: 9:00 AM – 5:00 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Website</div>
                  <a href="https://usefnepal.org.np" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                    usefnepal.org.np
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
                USEF Nepal administers the Fulbright program, EducationUSA advising, and other exchange programs. Visit their office for free advising on US higher education. They also host information sessions and visa workshops.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="size-5 text-blue-600" />
            Application Timeline — Fall 2026 Intake
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
            <FileText className="size-5 text-blue-600" />
            Required Documents Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            {checkedDocs.size} of {requiredDocuments.length} documents checked
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
                  <CheckSquare className="size-4 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="size-4 text-gray-400 shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${checkedDocs.has(doc) ? 'text-blue-700 dark:text-blue-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                  {doc}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fellowship Cards */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="size-5 text-red-600" />
            Fellowship & Scholarship Programs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Below are major fellowships available for graduate study in the USA. While some are restricted to US citizens, many are open to international students. University-based TA/RA positions remain the most common funding source for international physics PhD students.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {fellowshipCards.map((fellowship) => (
              <div key={fellowship.name} className={`p-3 rounded-lg border ${fellowship.color} hover:shadow-sm transition-shadow`}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{fellowship.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{fellowship.description}</p>
                <Badge variant="outline" className="text-xs">{fellowship.eligibility}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visa Information Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="size-5 text-blue-600" />
            Visa Information for Nepali Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visaItems.map((item, i) => (
              <div key={i} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Plane className="size-4 text-blue-600 shrink-0" />
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">{item.content}</p>
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

      {/* Dynamic Funding Info from API */}
      {!loading && fundingInfo.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Additional Funding Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {fundingInfo.map((info, i) => {
                let parsedContent: Record<string, unknown> | null = null
                try {
                  parsedContent = JSON.parse(info.content)
                } catch {
                  // not JSON, use as-is
                }

                return (
                  <AccordionItem key={info.id} value={`funding-${i}`}>
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
