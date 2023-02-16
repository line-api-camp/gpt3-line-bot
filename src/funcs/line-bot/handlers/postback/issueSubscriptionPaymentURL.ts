import { PostbackEvent } from '@line/bot-sdk'

import { getStripeCheckoutURL, getStripeCustomerIdByUserId } from '~/domains/stripe.domain'
import { getInitUserData } from '~/types/models'
import { createUser, getUser } from '~/types/users'
import { lineClient, makeReplyMessage } from '~/utils/line'

export const issueSubscriptionPaymentURLHandler = async (event: PostbackEvent): Promise<void> => {
  const userId = event.source.userId as string

  let user = await getUser(userId)
  if (user === null) {
    user = await createUser(userId, getInitUserData())
  }

  if (user.isActive) {
    return
  }

  const stripeCustomerId = await getStripeCustomerIdByUserId(userId)

  const { url } = await getStripeCheckoutURL({
    stripeCustomer: stripeCustomerId,
    priceId: 'price_1Mc82IJFOEpiCtQrQV0YZUnp',
    mode: 'subscription'
  })

  await lineClient.replyMessage(event.replyToken, makeReplyMessage(url))
}
