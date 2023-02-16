import { Stripe } from 'stripe'

import { stripeClient } from '~/clients/stripe.client'
import { getUser } from '~/types/users'

interface Props {
  customerId: string
  subscriptionStatus: Stripe.Subscription.Status | undefined
  beforeSubscriptionStatus: Stripe.Subscription.Status | undefined
}

export const customerSubscriptionUpdatedController = async (props: Props): Promise<void> => {
  const { customerId, subscriptionStatus, beforeSubscriptionStatus } = props

  // stripe customer check.
  const customer = await stripeClient.customers.retrieve(customerId)
  if (customer.deleted) {
    return
  }

  // user check.
  const userId = customer.description
  const user = await getUser(userId!)
  if (user === null) {
    return
  }

  // subscription check

  // 初回契約時
  if (beforeSubscriptionStatus === 'incomplete' && subscriptionStatus === 'active') {
    //
  }

  // 契約更新に失敗した時
  else if (beforeSubscriptionStatus === 'active' && subscriptionStatus === 'past_due') {
    //
  }
}
