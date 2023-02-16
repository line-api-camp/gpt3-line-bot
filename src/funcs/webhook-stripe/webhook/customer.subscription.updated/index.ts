import { Stripe } from 'stripe'

import { customerSubscriptionUpdatedController } from './controller'

interface DataObj {
  id: string
  customer: string
  description: string
  status: Stripe.Subscription.Status | undefined
}

export const customerSubscriptionUpdatedHandler = async (event: Stripe.Event): Promise<void> => {
  try {
    const data = event.data.object as DataObj
    // @ts-ignore
    const beforeSubscriptionStatus = event.data.previous_attributes.status

    await customerSubscriptionUpdatedController({
      customerId: data.customer,
      subscriptionStatus: data.status,
      beforeSubscriptionStatus
    })
  } catch (err) {
    console.error(err)
    throw new Error()
  }
}
