import { Timestamp } from 'firebase-admin/firestore'

interface Base {
  id?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface User extends Base {
  isActive: boolean
  stripeCustomerId: string
}

export const getInitUserData = (): User => {
  return {
    isActive: false,
    stripeCustomerId: ''
  }
}
