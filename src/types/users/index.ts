import { FieldValue, getFirestore } from 'firebase-admin/firestore'

import { User } from '../models'

export const usersRef = getFirestore().collection('users')

export const createUser = async (userId: string, user: User): Promise<User> => {
  const newUser = {
    ...user,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  } as User
  await usersRef.doc(userId).create(newUser)

  return newUser
}

export const getUser = async (userId: string): Promise<User | null> => {
  const snapshot = await usersRef.doc(userId).get()
  return snapshot.exists ? ({ id: snapshot.id, ...snapshot.data() } as User) : null
}

export const getUsersByIsActive = async (isActive: boolean): Promise<User[]> => {
  const snapshot = await usersRef.where('isActive', '==', isActive).get()
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as User
  })
}

export const updateUser = async (userId: string, user: Partial<User>): Promise<void> => {
  await usersRef.doc(userId).update({
    ...user,
    updatedAt: FieldValue.serverTimestamp()
  } as Partial<User>)
}

export const deleteUser = async (userId: string): Promise<void> => {
  await usersRef.doc(userId).delete()
}
