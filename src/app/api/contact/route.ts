import { NextRequest, NextResponse } from 'next/server'
import { getDb, EnquiryDoc } from '@/lib/firebase-admin'

const PROJECT_TYPES = [
  'web-app',
  'landing-page',
  'android-app',
  'seo',
  'minecraft-mod',
  'api-integration',
  'custom-domain',
  'other',
] as const

const BUDGETS = [
  'demo-2-days',
  '99',
  '149',
  '299',
  'custom',
  'undecided',
] as const

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const projectType = String(body.project_type ?? '').trim()
    const budget = String(body.budget ?? '').trim()
    const message = String(body.message ?? '').trim()

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Name is required' },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }
    if (!PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number])) {
      return NextResponse.json(
        { ok: false, error: 'Pick a project type' },
        { status: 400 }
      )
    }
    if (!BUDGETS.includes(budget as (typeof BUDGETS)[number])) {
      return NextResponse.json(
        { ok: false, error: 'Pick a budget tier' },
        { status: 400 }
      )
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    const doc: EnquiryDoc = {
      name,
      email,
      project_type: projectType,
      budget,
      message,
      source: 'quackforge.web.app',
      created_at: Date.now(),
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
      user_agent: req.headers.get('user-agent') ?? undefined,
    }

    try {
      const db = getDb()
      const ref = await db.collection('enquiries').add(doc)
      return NextResponse.json({
        ok: true,
        id: ref.id,
        message: 'Enquiry received. Response within 24h.',
      })
    } catch (fbErr) {
      console.error('[contact] Firebase write failed:', fbErr)
      console.log('[contact] Would have saved:', doc)
      return NextResponse.json(
        {
          ok: true,
          id: null,
          message: 'Enquiry received (logged). Response within 24h.',
        },
        { status: 200 }
      )
    }
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { ok: false, error: 'Server error. Try email instead.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: 'quackforge-contact',
    method: 'POST',
  })
}
