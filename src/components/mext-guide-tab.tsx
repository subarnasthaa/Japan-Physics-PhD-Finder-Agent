'use client'

import { useState, useMemo } from 'react'
import { BookOpen, CheckCircle2, Globe, Phone, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { scholarships as allScholarships, searchScholarships } from '@/lib/static-data'

export default function MEXTGuideTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  const scholarships = useMemo(() => {
    return searchQuery ? searchScholarships(searchQuery) : allScholarships
  }, [searchQuery])

  const requiredDocuments = [
    { id: 'passport', label: 'Valid Passport' },
    { id: 'degree', label: 'MSc Degree Certificate & Transcripts (notarized)' },
    { id: 'cv', label: 'CV/Resume (academic format)' },
    { id: 'research-proposal', label: 'Research Proposal (detailed, 5-10 pages)' },
    { id: 'references', label: '2 Reference Letters (academic)' },
    { id: 'language', label: 'IELTS/TOEFL Score (or English proficiency certificate)' },
    { id: 'mext-form', label: 'MEXT Application Form (through Embassy or University)' },
    { id: 'acceptance', label: 'Letter of Acceptance from Japanese professor (supervisor)' },
    { id: 'photos', label: 'Passport Photos (4.5cm × 4.5cm)' },
    { id: 'health', label: 'Medical Certificate (MEXT format)' },
    { id: 'police', label: 'Police Clearance Certificate' },
    { id: 'certificate-eligibility', label: 'Certificate of Eligibility (COE - obtained after acceptance)' },
  ]

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id])
  }

  const scholarshipCategories = scholarships.reduce<Record<string, typeof scholarships>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">🎓 MEXT Scholarship Guide</h2>
          <p className="text-red-100 text-sm max-w-xl">
            Complete guide to Japanese scholarships for Nepali Physics students.
            The MEXT (Monbukagakusho) scholarship is the most important funding route for Nepali students — ¥143,000/month stipend, full tuition waiver, round-trip airfare from Nepal, and arrival allowance!
          </p>
        </CardContent>
      </Card>

      {/* MEXT Scholarship Section */}
      <Card className="border-red-200 dark:border-red-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">MEXT Scholarship (Monbukagakusho) 🌟</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The MOST IMPORTANT scholarship for Nepali students! Fully funded by the Japanese Government (MEXT).
                Covers ¥143,000/month living allowance, full tuition waiver, round-trip airfare from Nepal,
                arrival allowance, and no tuition fees at any Japanese university!
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Living Allowance:</strong> ¥143,000/month (tax-free)</p>
                <p>• <strong>Tuition:</strong> Full tuition waiver at any Japanese university! (worth ¥535,800/year)</p>
                <p>• <strong>Duration:</strong> Up to 3-5 years (PhD)</p>
                <p>• <strong>Travel:</strong> Round-trip airfare from Nepal to Japan</p>
                <p>• <strong>Arrival Allowance:</strong> One-time settling-in allowance</p>
                <p>• <strong>IELTS:</strong> Not always required (depends on university), 6.0+ recommended</p>
                <p>• <strong>Apply through:</strong> Japanese Embassy in Nepal (Feb-Apr) or University Recommendation</p>
              </div>
              <a href="https://www.studyinjapan.go.jp/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-red-600 hover:underline">
                Study in Japan Official Website →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* JSPS Fellowship Section */}
      <Card className="border-emerald-200 dark:border-emerald-800/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">JSPS Fellowship</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The Japan Society for the Promotion of Science (JSPS) offers fellowships for international researchers at
                Japanese national institutes like RIKEN, KEK, NIFS, and NAOJ. This is the primary funding route at research institutes.
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>• <strong>Stipend:</strong> ¥209,000/month (JSPS Fellowship)</p>
                <p>• <strong>Tuition:</strong> No tuition fees at national institutes</p>
                <p>• <strong>Duration:</strong> 1-3 years (renewable)</p>
                <p>• <strong>Apply:</strong> Through host researcher at national institute</p>
                <p>• <strong>Research institutes:</strong> RIKEN (¥209,000/mo), KEK (¥209,000/mo), JAEA/NIFS/NAOJ (¥200,000/mo)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Japanese Embassy Nepal */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">🇯🇵 Japanese Embassy Nepal & MEXT Application</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Address</p>
                <p>Pani Pokhari, Kathmandu, Nepal (Embassy of Japan)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                <p>+977-1-4002300 (Embassy of Japan, Kathmandu)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">MEXT Portal</p>
                <a href="https://www.studyinjapan.go.jp/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                  studyinjapan.go.jp
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Visa Processing</p>
                <p>Kathmandu (Certificate of Eligibility required, 1-3 months)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            📅 Application Timeline for MEXT April Intake
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, month: 'Jan-Mar 2026', desc: 'Research programs, identify supervisors, prepare IELTS', color: 'bg-red-500' },
              { step: 2, month: 'Mar-Apr 2026', desc: 'Apply for MEXT Embassy Recommendation (deadline typically April)', color: 'bg-red-600' },
              { step: 3, month: 'May-Jun 2026', desc: 'MEXT written exam and interview at Japanese Embassy Kathmandu', color: 'bg-emerald-600' },
              { step: 4, month: 'Jul-Aug 2026', desc: 'MEXT selection results, contact prospective supervisors', color: 'bg-red-700' },
              { step: 5, month: 'Sep-Nov 2026', desc: 'University application and Letter of Acceptance', color: 'bg-emerald-700' },
              { step: 6, month: 'Dec 2026-Feb 2027', desc: 'Apply for Certificate of Eligibility (COE), arrange accommodation', color: 'bg-red-800' },
              { step: 7, month: 'Mar-Apr 2027', desc: 'Arrive in Japan, enroll, start your PhD! ようこそ!', color: 'bg-emerald-600' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className={`size-8 rounded-full ${item.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{item.month}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IELTS Requirement */}
      <Card className="border-amber-200 dark:border-amber-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            📝 IELTS Requirement
          </h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Japanese universities vary in English proficiency requirements. Many do not strictly require IELTS for MEXT scholarship, but it strengthens your application significantly.</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/20">
                <p className="font-medium text-red-700 dark:text-red-300">IELTS 6.0+</p>
                <p>Recommended for most universities (MEXT does not always require it)</p>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">TOEFL iBT 80+</p>
                <p>Some accept TOEFL iBT or TOEIC as alternatives</p>
              </div>
            </div>
            <p className="mt-2"><strong>Tip:</strong> Even if IELTS is not strictly required, having a score of 6.0+ makes your application much stronger! Take IELTS through IDP Nepal or British Council Nepal in Kathmandu. Many professors also conduct English interviews to assess your proficiency. For Imperial Universities, IELTS 6.0-6.5 is recommended.</p>
          </div>
        </CardContent>
      </Card>

      {/* Document Checklist */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
            📋 Required Documents Checklist
          </h3>
          <div className="mb-3">
            <Progress value={(checkedDocs.length / requiredDocuments.length) * 100} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">{checkedDocs.length}/{requiredDocuments.length} completed</p>
          </div>
          <div className="space-y-2">
            {requiredDocuments.map((doc) => (
              <button
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <CheckCircle2
                  className={`size-5 shrink-0 ${
                    checkedDocs.includes(doc.id) ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
                <span className={`text-sm ${
                  checkedDocs.includes(doc.id)
                    ? 'text-gray-400 line-through'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {doc.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scholarship Cards */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">💰 Scholarships & Funding</h3>
          <div className="mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholarships..."
              className="w-full h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {Object.entries(scholarshipCategories).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{items.length}</Badge>
                {category}
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.slice(0, 4).map((s) => (
                  <div key={s.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 transition-colors">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.content.slice(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Doctoral Stipend Explanation */}
      <Card className="border-emerald-200 dark:border-emerald-800/50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">💴 Doctoral Stipend Explained</h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p>Most Japanese PhD positions in physics are funded through MEXT Scholarships or JSPS Fellowships. You receive a <strong>monthly stipend</strong> for living costs, and MEXT covers full tuition at any Japanese national university.</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/20">
                <p className="font-medium text-red-700 dark:text-red-300">MEXT Scholarship</p>
                <p>¥143,000/month</p>
              </div>
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/20">
                <p className="font-medium text-emerald-700 dark:text-emerald-300">JSPS Fellowship</p>
                <p>¥209,000/month</p>
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">University Scholarships</p>
                <p>¥100,000-150,000/mo</p>
              </div>
            </div>
            <p className="mt-2">MEXT covers full tuition waiver (¥535,800/year) + monthly stipend + airfare from Nepal. JSPS provides higher stipend at national institutes. Benefits include: stipend, tuition waiver, health insurance, conference travel allowance, and access to world-class facilities. Japan living costs are moderate — around ¥80,000-120,000/month depending on city (Tokyo most expensive, Sapporo/Fukuoka cheaper).</p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">❓ FAQ</h3>
          <Accordion type="single" collapsible>
            {[
              { q: 'How do I apply for MEXT scholarship from Nepal?', a: 'There are two routes: (1) Embassy Recommendation — Apply through the Embassy of Japan in Kathmandu (Pani Pokhari), typically February-April each year. You take a written exam and interview. (2) University Recommendation — Apply directly through a Japanese university that nominates you for MEXT. Embassy route is more common for Nepali students. You need a strong academic record, research proposal, and preferably IELTS 6.0+.' },
              { q: 'What IELTS score do I need for Japanese PhD?', a: 'It varies! MEXT does not always require IELTS, but having 6.0+ strengthens your application significantly. Imperial Universities (UTokyo, KyotoU, etc.) recommend 6.0-6.5. Some professors conduct English interviews instead. Take IELTS through IDP Nepal or British Council Nepal in Kathmandu. Score is valid for 2 years. TOEFL iBT 80+ is also widely accepted.' },
              { q: 'Can I apply for both MEXT and JSPS?', a: 'Yes! MEXT and JSPS are different programs. MEXT is a government scholarship for university enrollment (¥143,000/month + tuition waiver). JSPS is a fellowship for research positions at national institutes like RIKEN and KEK (¥209,000/month). If you are at a university, MEXT is the primary route. If you are at a national institute, JSPS is the primary route. Some students transition between them.' },
              { q: 'How long does Japanese student visa processing take from Nepal?', a: 'Typically 1-3 months after submitting your Certificate of Eligibility (COE) application. You first need a COE from Japanese Immigration, which your university applies for on your behalf. Once you receive the COE, you submit it with your visa application at the Embassy of Japan in Kathmandu. Processing is usually 5-10 business days after COE submission. Start early!' },
              { q: 'What are the Imperial Universities (旧帝大)?', a: 'The seven Imperial Universities are Japan\'s most prestigious national universities: University of Tokyo, Kyoto University, Osaka University, Tohoku University, Nagoya University, Hokkaido University, and Kyushu University. They were established during the Imperial era and remain Japan\'s top research institutions. All are MEXT-eligible and offer world-class physics PhD programs with excellent funding.' },
              { q: 'Can I bring my spouse to Japan?', a: 'Yes! On a dependent visa, your spouse can join you in Japan. However, dependents are generally not allowed to work without special permission. If your spouse has their own work visa or MEXT/JSPS fellowship, they can work full-time. Japan is relatively family-friendly, and many universities have family housing options. Cost of living for a couple is approximately ¥150,000-200,000/month.' },
              { q: 'Is health insurance mandatory in Japan?', a: 'Yes, health insurance is mandatory in Japan for all residents, including international students. MEXT scholarship holders are enrolled in the National Health Insurance (NHI) system, which covers 70% of medical costs. Your monthly NHI premium is approximately ¥2,000-4,000 for students (income-based). MEXT may also provide additional health coverage. You cannot get a residence permit without health insurance.' },
              { q: 'How competitive are Japanese PhD positions for Nepali students?', a: 'Very achievable! Japan has a strong policy of internationalization and actively recruits students from developing countries through MEXT. Nepal has a long history of MEXT scholarship recipients. Imperial Universities and national institutes welcome international researchers. Strong MSc from TU with good grades, IELTS score, and a compelling research proposal makes you competitive. The MEXT Embassy route is specifically designed for international students like you.' },
              { q: 'What is the difference between April and October intake?', a: 'Japanese universities have two main intake periods: April (primary intake, start of Japanese academic year) and October (secondary intake, common for international students). MEXT Embassy Recommendation typically leads to April intake. University Recommendation can lead to either April or October intake. October intake is often preferred by international students as it aligns with the Nepali academic calendar. Both intakes follow the same MEXT funding structure.' },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 dark:text-gray-400">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
