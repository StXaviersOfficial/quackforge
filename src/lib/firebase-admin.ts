import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

/**
 * Server-side Firebase Admin SDK instance.
 *
 * Reads credentials from env:
 *  - FIREBASE_SERVICE_ACCOUNT (raw JSON string) — preferred for Vercel
 *  - Or falls back to .env local file for dev
 *
 * Uses the stxavierswebsite project. Saves contact enquiries to the
 * `enquiries` collection (matches existing schema used by xavierpreview).
 */

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT

let app: App | null = null
let db: Firestore | null = null

function init(): App {
  if (getApps().length > 0) return getApps()[0]

  if (!serviceAccountJson) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT env var not set. Contact form cannot persist.'
    )
  }

  const sa = JSON.parse(serviceAccountJson)
  return initializeApp({
    credential: cert(sa),
    projectId: sa.project_id,
  })
}

export function getDb(): Firestore {
  if (!app) app = init()
  if (!db) db = getFirestore(app)
  return db
}

export interface EnquiryDoc {
  name: string
  email: string
  project_type: string
  budget: string
  message: string
  source: string
  created_at: number
  ip?: string
  user_agent?: string
}
