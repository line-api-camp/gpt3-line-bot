import { Stripe } from 'stripe'

import { customerSubscriptionDeletedController } from './controller'

interface DataObj {
  id: string
  customer: string
  description: string
}

export const customerSubscriptionDeletedHandler = async (event: Stripe.Event): Promise<void> => {
  try {
    const data = event.data.object as DataObj
    const customerId = data.customer

    await customerSubscriptionDeletedController({ customerId })
  } catch (err) {
    console.error(err)
    throw Error
  }
}
