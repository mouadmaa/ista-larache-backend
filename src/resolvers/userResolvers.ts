import { User, UserCreateInput, UserWhereInput } from '@prisma/client'
import { hash, verify } from 'argon2'
import { sign } from 'jsonwebtoken'

import { MyContext } from '../context'
import { AuthPayload } from '../typeDefs/types/authType'

export const users = (_parent: any, _args: any, { prisma }: MyContext): Promise<User[]> => {
  return prisma.user.findMany()
}

export const register = async (_parent: any, { name, email, password }: UserCreateInput, { prisma }: MyContext): Promise<AuthPayload> => {
  const hashedPassword = await hash(password)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, },
  })

  const token = sign({ userId: user.id }, process.env.JWT_SECRET!)

  return { user, token }
}

export const login = async (_parent: any, { email, password }: UserWhereInput, { prisma }: MyContext): Promise<AuthPayload> => {
  const user = await prisma.user.findOne({ where: { email: email as string } })
  if (!user) throw new Error('Email or password not valid')

  const validPassword = await verify(user.password, password as string)
  if (!validPassword) throw new Error('Email or password not valid')

  const token = sign({ userId: user.id }, process.env.JWT_SECRET!)

  return { user, token }
}
