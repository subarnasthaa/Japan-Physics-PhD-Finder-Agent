import { NextResponse } from 'next/server'
import { institutions } from '@/lib/static-data'

const SYSTEM_PROMPT = `You are the Japan Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in Japan. You have extensive knowledge of:

1. Top Japanese universities offering Physics PhD programs: University of Tokyo, Kyoto University, Osaka University, Tohoku University, Nagoya University, Hokkaido University, Kyushu University, Tokyo Institute of Technology, University of Tsukuba, Kobe University, Hiroshima University, and more
2. Imperial Universities (旧帝大): UTokyo, KyotoU, OsakaU, TohokuU, NagoyaU, HokkaidoU, KyushuU — Japan's 7 most prestigious national universities
3. National Research Institutes: RIKEN (Quantum Computing, Particle Physics), KEK (Particle Physics, Accelerator Physics), JAEA (Nuclear Physics), NIFS (Plasma Physics, Fusion), NAOJ (Astronomy, Astrophysics), QST (Quantum Beam Science), AIST (Materials Science, Nanotechnology)
4. Research Institutes: Kavli IPMU at UTokyo (Cosmology, String Theory, Astroparticle Physics), RIKEN Center for Quantum Computing
5. MEXT Scholarship (Monbukagakusho): ¥143,000/month + full tuition waiver + round-trip airfare from Nepal + arrival allowance — THE MOST IMPORTANT scholarship for Nepali students!
6. JSPS Fellowship: ¥209,000/month for research positions at national institutes (RIKEN, KEK, etc.)
7. Admission intakes: April (primary) and October (secondary) — Japanese academic year starts in April
8. IELTS: 6.0+ recommended (varies by university; MEXT does not always require it)
9. PhD duration: Typically 3-5 years
10. English is the working language in most research groups — Japanese language NOT required
11. Japanese Embassy Nepal: Pani Pokhari, Kathmandu — handles MEXT application and student visa
12. Research fields: Quantum Computing, Particle Physics, Astrophysics, Condensed Matter, Nuclear Physics, Photonics, Materials Science, Theoretical Physics, Plasma Physics, Quantum Information, Spintronics, Biophysics, Geophysics, String Theory, Cosmology, Nanotechnology, Medical Physics
13. MEXT application routes: Embassy Recommendation (Feb-Apr, written exam + interview) or University Recommendation (direct through university)

Key points for Nepali students:
- MEXT Scholarship covers: ¥143,000/month stipend, full tuition waiver (¥535,800/year), round-trip airfare from Nepal, arrival allowance
- Apply through Japanese Embassy in Kathmandu (Embassy Recommendation) or through university (University Recommendation)
- Embassy route: Application typically February-April, written exam + interview at Embassy
- JSPS Fellowship at national institutes: ¥209,000/month (RIKEN, KEK) or ¥200,000/month (JAEA, NIFS, NAOJ, QST, AIST)
- No tuition fees at national institutes (RIKEN, KEK, etc.) — students co-enrolled at partner universities
- Imperial Universities are Japan's most prestigious and all are MEXT-eligible
- IELTS 6.0+ recommended but not always required (depends on university)
- Japanese language NOT required for most physics PhD positions (English is working language)
- PhD degree typically takes 3-5 years
- April intake is primary; October intake is common for international students
- Many positions have rolling admissions (apply anytime)
- Japanese Embassy Kathmandu handles student visa applications
- Certificate of Eligibility (COE) required for visa — university applies on your behalf
- Students can bring spouse on dependent visa
- Health insurance is mandatory (National Health Insurance, ~¥2,000-4,000/month for students)
- Living costs: ¥80,000-120,000/month depending on city (Tokyo most expensive)
- MEXT covers everything — it's the best deal for Nepali students!

Help students by:
- Recommending universities/institutes based on their research interests
- Explaining MEXT application process (Embassy and University routes)
- Guiding through JSPS Fellowship applications at national institutes
- Clarifying IELTS requirements by university
- Providing funding and stipend information in JPY
- Suggesting required documents and application strategies
- Offering tips specific to Nepali applicants
- Explaining Japanese student visa process
- Comparing institutions and research programs
- Advising on contacting potential supervisors
- Explaining RIKEN/KEK co-supervision arrangements with partner universities
- Helping with research proposal writing

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Be realistic about admission chances and funding. Emphasize that MEXT covers EVERYTHING for Nepali students and Japan has excellent funding for physics PhDs.`

// Build institution data context for the AI
function buildInstitutionContext(): string {
  const summary = institutions.slice(0, 30).map((u) =>
    `${u.name} (${u.city}, ${u.country}) | Type: ${u.type} | Fields: ${u.fields} | Deadline: ${u.deadline} | Funding: ${u.contractType} | ¥${u.monthlyJpy?.toLocaleString() || 'N/A'}/mo | IELTS: ${u.ieltsMinimum} | MEXT: ${u.funding.mextEligible ? 'Yes' : 'No'} | JSPS: ${u.funding.jspsEligible ? 'Yes' : 'No'} | Imperial: ${u.funding.imperialUniversity ? 'Yes' : 'No'}`
  ).join('\n')
  return summary
}

// Call Google Gemini API
async function callGemini(apiKey: string, messages: Array<{ role: string; content: string }>) {
  const contents = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error: ${res.status} - ${err}`)
  }

  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.'
}

// Call OpenAI-compatible API
async function callOpenAI(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  baseUrl: string = 'https://api.openai.com/v1',
  model: string = 'gpt-4o-mini'
) {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenAI API error: ${res.status} - ${err}`)
  }

  const data = await res.json()
  return data?.choices?.[0]?.message?.content || 'No response from AI.'
}

// Call z-ai-web-dev-sdk (sandbox only)
async function callZAI(messages: Array<{ role: string; content: string }>) {
  const ZAI = (await import('z-ai-web-dev-sdk')).default
  const zai = await ZAI.create()
  const typedMessages = messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
  const completion = await zai.chat.completions.create({
    messages: typedMessages,
    thinking: { type: 'disabled' },
  })
  return completion?.choices?.[0]?.message?.content || 'I could not generate a response.'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, history, watchlistedIds, apiKey, provider, model, baseUrl } = body

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const messages: Array<{ role: string; content: string }> = [
      { role: 'assistant', content: SYSTEM_PROMPT },
    ]

    // Add institution data context
    const instContext = buildInstitutionContext()
    messages.push({
      role: 'assistant',
      content: `Here is a database of Japan Physics PhD institutions for reference:\n${instContext}\n\nUse this data to provide accurate, specific answers. If asked about an institution not in this list, use your general knowledge.`,
    })

    // Add watchlist context
    if (watchlistedIds && Array.isArray(watchlistedIds) && watchlistedIds.length > 0) {
      const watchlisted = institutions.filter((inst) => watchlistedIds.includes(inst.id)).slice(0, 10)
      if (watchlisted.length > 0) {
        const watchlistContext = watchlisted
          .map((u) => `${u.name} (${u.city}, ${u.country}) - JSPS: ${u.funding.jspsEligible ? 'Yes' : 'No'} - Imperial: ${u.funding.imperialUniversity ? 'Yes' : 'No'} - Fields: ${u.fields} - Deadline: ${u.deadline} - Funding: ${u.contractType} - ¥${u.monthlyJpy?.toLocaleString() || 'N/A'}/mo`)
          .join('\n')
        messages.push({
          role: 'assistant',
          content: `The student has these institutions in their watchlist:\n${watchlistContext}`,
        })
      }
    }

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content })
        }
      }
    }

    messages.push({ role: 'user', content: message })

    let assistantMessage: string

    if (apiKey && provider === 'gemini') {
      assistantMessage = await callGemini(apiKey, messages)
    } else if (apiKey && provider === 'openai') {
      assistantMessage = await callOpenAI(apiKey, messages, baseUrl || 'https://api.openai.com/v1', model || 'gpt-4o-mini')
    } else if (apiKey && provider === 'groq') {
      assistantMessage = await callOpenAI(apiKey, messages, 'https://api.groq.com/openai/v1', model || 'llama-3.3-70b-versatile')
    } else if (apiKey && provider === 'together') {
      assistantMessage = await callOpenAI(apiKey, messages, 'https://api.together.xyz/v1', model || 'meta-llama/Llama-3-70b-chat-hf')
    } else if (apiKey && provider === 'custom') {
      assistantMessage = await callOpenAI(apiKey, messages, baseUrl || 'https://api.openai.com/v1', model || 'gpt-4o-mini')
    } else {
      try {
        assistantMessage = await callZAI(messages)
      } catch {
        return NextResponse.json(
          {
            error: 'AI_API_KEY_REQUIRED',
            message: 'Please configure an AI API key to use the chat. Go to Settings in the AI Agent tab and add your API key.',
          },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ response: assistantMessage })
  } catch (error) {
    console.error('Error in agent chat:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process agent request'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
