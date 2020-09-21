import { User, UserCreateInput, UserWhereInput } from '@prisma/client'
import { hash, verify } from 'argon2'

import { MyContext } from '../context'
import { COOKIE_NAME } from '../constants'

export const users = (_parent: any, _args: any, { db }: MyContext): Promise<User[]> => db.user.findMany()
export const me = (_parent: any, _args: any, { user }: MyContext): User | null => user

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

export const logout = async (_parent: any, _args: any, { request, response }: MyContext): Promise<Boolean> => {
  return new Promise(resolve =>
    request.session.destroy(error => {
      response.clearCookie(COOKIE_NAME)
      if (error) resolve(false)
      resolve(true)
    })
  )
}
