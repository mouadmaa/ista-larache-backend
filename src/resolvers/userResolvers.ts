import { User, UserCreateInput, UserDeleteArgs, UserWhereInput } from '@prisma/client'
import { hash, verify } from 'argon2'
import { sign } from 'jsonwebtoken'

import { __prod__ } from '../constants'
import { MyContext } from '../context'
import { getUser } from '../utils/getUser'

export const userQueries = {
  me: (_parent: any, _args: any, { request }: MyContext): User | null => getUser(request),
  users: (_parent: any, _args: any, { db }: MyContext): Promise<User[]> => db.user.findMany(),
}

export const userMutations = {
  register: async (_parent: any, { name, email, password }: UserCreateInput, { db }: MyContext): Promise<User> => {
    const hashedPassword = await hash(password)

    const user = await db.user.create({
      data: { name, email, password: hashedPassword, }
    })

    return user
  },
  login: async (_parent: any, { email, password }: UserWhereInput, { response, db }: MyContext): Promise<User> => {
    const user = await db.user.findOne({ where: { email: email as string } })
    if (!user) throw new Error('email or password not valid')

    const validPassword = await verify(user.password, password as string)
    if (!validPassword) throw new Error('email or password not valid')

    const expiresIn = 1000 * 60 * 60 * 24 * 365 * 10
    const token = sign({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, process.env.JWT_SECRET!, { expiresIn })

    response.cookie('token', token, {
      expires: new Date(Date.now() + expiresIn),
      secure: __prod__,
      httpOnly: true,
      sameSite: __prod__ ? 'none' : 'lax',
    })

    return user
  },
  logout: (_parent: any, _args: any, { response }: MyContext): Boolean => {
    response.cookie('token', '', { expires: new Date(0), httpOnly: true })
    return true
  },
  deleteUser: (_parent: any, args: UserDeleteArgs, { db }: MyContext): Promise<User> => db.user.delete(args),
}
