import { PostbackEvent } from '@line/bot-sdk'

import { stripeClient } from '~/clients/stripe.client'
import { getStripeCustomerIdByUserId } from '~/domains/stripe.domain'
import { getInitUserData } from '~/types/models'
import { createUser, getUser } from '~/types/users'
import { lineClient, makeReplyMessage } from '~/utils/line'

export const issuePaymentInfoURLHandler = async (event: PostbackEvent): Promise<void> => {
  const userId = event.source.userId as string

  let user = await getUser(userId)
  if (user === null) {
    user = await createUser(userId, getInitUserData())
  }

  if (!user.isActive) {
    return
  }

  const stripeCustomerId = await getStripeCustomerIdByUserId(userId)

  const { url } = await stripeClient.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: 'https://lin.ee/KOdK8tw'
  })

  await lineClient.replyMessage(event.replyToken, makeReplyMessage(url))
}
