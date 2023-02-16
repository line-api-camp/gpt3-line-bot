import { Stripe } from 'stripe'

import { STRIPE_SECRET_KEY } from '~/utils/secrets'

export const stripeClient = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })
