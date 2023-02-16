import { stripeClient } from '~/clients/stripe.client'
import { getUser } from '~/types/users'

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
  if (subscriptionList.length > 0) {
    return
  }
}
