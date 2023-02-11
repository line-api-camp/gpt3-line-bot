import admin from 'firebase-admin'
import { cert } from 'firebase-admin/app'

import { FB_PROJECT_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from '../secrets'

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: cert({
      clientEmail: GOOGLE_CLIENT_EMAIL,
      privateKey: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      projectId: FB_PROJECT_ID
    })
  })
}

// Auth

export const auth = admin.auth()

// Firestore

export const db = admin.firestore()

export { admin }
