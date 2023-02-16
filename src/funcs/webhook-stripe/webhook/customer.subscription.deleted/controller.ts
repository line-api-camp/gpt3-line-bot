import { stripeClient } from '~/clients/stripe.client'
import { getRichMenuId } from '~/domains/rich-menu.domain'
import { getUser, updateUser } from '~/types/users'
import { lineClient, makeReplyMessage } from '~/utils/line'

interface Props {
  customerId: string
}

export const customerSubscriptionDeletedController = async (props: Props): Promise<void> => {
  const { customerId } = props

  // stripe customer check.
  const customer = await stripeClient.customers.retrieve(customerId)
  if (customer.deleted) {
    return
  }

  // user check.
  const userId = customer.description
  const user = await getUser(userId!)
  if (user === null || !user.isActive) {
    return
  }

  // subscription check.
  const { data: subscriptionList } = await stripeClient.subscriptions.list({ customer: customerId })
  if (subscriptionList.length === 0) {
    return
  }

  const richMenuId = await getRichMenuId('default')
  await Promise.all([
    updateUser(userId!, { isActive: false }),
    lineClient.pushMessage(userId!, makeReplyMessage('キャンセル完了しました')),
    richMenuId && lineClient.linkRichMenuToUser(userId!, richMenuId)
  ])
}
