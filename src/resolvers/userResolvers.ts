import { User, UserCreateInput, UserWhereInput } from '@prisma/client'
import { hash, verify } from 'argon2'

import { MyContext } from '../context'

export const users = (_parent: any, _args: any, { db }: MyContext): Promise<User[]> => {
  return db.user.findMany()
}

export const me = (_parent: any, _args: any, { request }: MyContext): User | null => {
  return request.session.user
}

export const register = async (_parent: any, { name, email, password }: UserCreateInput, { request, db }: MyContext): Promise<User> => {
  const hashedPassword = await hash(password)

  const user = await db.user.create({
    data: { name, email, password: hashedPassword, },
  })

  request.session.user = user
  return user
}

export const login = async (_parent: any, { email, password }: UserWhereInput, { request, db }: MyContext): Promise<User> => {
  const user = await db.user.findOne({ where: { email: email as string } })
  if (!user) throw new Error('email or password not valid')

  const validPassword = await verify(user.password, password as string)
  if (!validPassword) throw new Error('email or password not valid')

  request.session.user = user
  return user
}
