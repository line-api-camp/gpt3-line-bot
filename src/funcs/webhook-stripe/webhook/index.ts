import { Request, Response } from 'express'

import { signatureMiddleware } from '../middleware/signature.middleware'
import { customerSubscriptionDeletedHandler } from './customer.subscription.deleted'
import { customerSubscriptionUpdatedHandler } from './customer.subscription.updated'

export const stripeWebhookHandlers = async (req: Request, res: Response) => {
  try {
    const event = signatureMiddleware(req)

    switch (event.type) {
      case 'customer.subscription.updated':
        await customerSubscriptionUpdatedHandler(event)
        break
      case 'customer.subscription.deleted':
        await customerSubscriptionDeletedHandler(event)
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
