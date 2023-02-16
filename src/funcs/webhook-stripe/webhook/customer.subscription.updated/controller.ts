import { Stripe } from 'stripe'

import { stripeClient } from '~/clients/stripe.client'
import { getRichMenuId } from '~/domains/rich-menu.domain'
import { getUser, updateUser } from '~/types/users'
import { lineClient, makeReplyMessage } from '~/utils/line'

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
    const richMenuId = await getRichMenuId('active')
    await Promise.all([
      updateUser(userId!, { isActive: true }),
      lineClient.pushMessage(userId!, makeReplyMessage('課金したよ！')),
      richMenuId && lineClient.linkRichMenuToUser(userId!, richMenuId)
    ])
  }

  // 契約更新に失敗した時
  else if (beforeSubscriptionStatus === 'active' && subscriptionStatus === 'past_due') {
    //
  }
}
