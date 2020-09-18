import { User } from '@prisma/client'

import { MyContext } from '../context'

export const users = (_1: any, _2: any, { prisma: { user } }: MyContext): Promise<User[]> => {
  return user.findMany()
}
