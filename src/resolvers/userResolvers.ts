import { User, UserCreateArgs } from '@prisma/client'
import { hash } from 'argon2'
import { sign } from 'jsonwebtoken'

import { MyContext } from '../context'
import { AuthPayload } from '../typeDefs/types/authType'

export const users = (_parent: any, _args: any, { prisma }: MyContext): Promise<User[]> => {
  return prisma.user.findMany()
}

export const register = async (_parent: any, { data: { name, email, password } }: UserCreateArgs, { prisma }: MyContext): Promise<AuthPayload> => {
  const hashedPassword = await hash(password)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, },
  })

  const token = sign({ userId: user.id }, process.env.JWT_SECRET!)

  return { user, token }
}
