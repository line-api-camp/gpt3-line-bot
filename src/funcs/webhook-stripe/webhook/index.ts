import { Request, Response } from 'express'

import { signatureMiddleware } from '../middleware/signature.middleware'

export const stripeWebhookHandlers = (req: Request, res: Response) => {
  try {
    const event = signatureMiddleware(req)

    switch (event.type) {
      case 'payment_intent.succeeded':
        break
      default:
        throw new Error('stripe event type is not found.')
    }

    res.status(200).send('success').end()
  } catch (err) {
    console.error(err)
    res.status(500).send('error').end()
  }
}
