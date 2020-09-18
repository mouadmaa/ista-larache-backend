import { User, UserCreateInput, UserWhereInput } from '@prisma/client'
import { hash, verify } from 'argon2'
import { sign } from 'jsonwebtoken'

import { MyContext } from '../context'
import { AuthPayload } from '../typeDefs/types/authType'
import { getUser } from '../utils/getUser'

export const users = (_parent: any, _args: any, { db }: MyContext): Promise<User[]> => {
  return db.user.findMany()
}

export const me = (_parent: any, _args: any, { request, db }: MyContext): Promise<User | null> => {
  return db.user.findOne({ where: { id: getUser(request).userId } })
}

export const register = async (_parent: any, { name, email, password }: UserCreateInput, { db }: MyContext): Promise<AuthPayload> => {
  const hashedPassword = await hash(password)

  const user = await db.user.create({
    data: { name, email, password: hashedPassword, },
  })

  const token = sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!)

  return { user, token }
}

export const login = async (_parent: any, { email, password }: UserWhereInput, { db }: MyContext): Promise<AuthPayload> => {
  const user = await db.user.findOne({ where: { email: email as string } })
  if (!user) throw new Error('email or password not valid')

  const validPassword = await verify(user.password, password as string)
  if (!validPassword) throw new Error('email or password not valid')

  const token = sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!)

  return { user, token }
}
