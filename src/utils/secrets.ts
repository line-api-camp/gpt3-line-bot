import 'dotenv/config'

// LINE

export const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN as string
export const LINE_SECRET = process.env.LINE_SECRET as string

// Google

export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL as string
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY as string
export const FB_PROJECT_ID = process.env.FB_PROJECT_ID as string

// Stripe

export const STRIPE_SECRET_KEY = String(process.env.STRIPE_SECRET_KEY)
export const STRIPE_WEBHOOK_SECRET = String(process.env.STRIPE_WEBHOOK_SECRET)

// OPENAI

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string
