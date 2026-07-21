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
  'demo',
  'starter', '99',
  'growth', '249',
  'pro', '599',
  'elite', '1499',
  'enterprise', 'custom',
  'request-a-fix', 'care-basic', 'care-complete', 'maintenance',
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
      // Fire-and-forget ntfy notification (server-side only, topic is secret)
      sendNtfyNotification(doc).catch(() => {})
      return NextResponse.json({
        ok: true,
        id: ref.id,
        message: 'Enquiry received. Response within 24h.',
      })
    } catch (fbErr) {
      console.error('[contact] Firebase write failed:', fbErr)
      console.log('[contact] Would have saved:', doc)
      // Still send ntfy notification even if Firestore fails
      sendNtfyNotification(doc).catch(() => {})
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

/**
 * Send a push notification to ntfy.sh when a new enquiry arrives.
 * Topic is read from NTFY_TOPIC env var (set on Vercel) — never exposed to client.
 */
async function sendNtfyNotification(doc: EnquiryDoc) {
  const topic = process.env.NTFY_TOPIC
  if (!topic) {
    console.log('[ntfy] NTFY_TOPIC not set, skipping notification')
    return
  }

  const title = `New enquiry: ${doc.name} (${doc.email})`
  const body = [
    `Project type: ${doc.project_type}`,
    `Budget: ${doc.budget}`,
    ``,
    `Message:`,
    doc.message,
    ``,
    `Source: ${doc.source}`,
    `Reply to: ${doc.email}`,
  ].join('\n')

  try {
    await fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      headers: {
        'Title': title,
        'Tags': 'incoming_envelope, blue_heart',
        'Priority': 'high',
        'Content-Type': 'text/plain',
      },
      body,
    })
    console.log('[ntfy] Notification sent to topic:', topic)
  } catch (err) {
    console.error('[ntfy] Failed to send notification:', err)
  }
}
