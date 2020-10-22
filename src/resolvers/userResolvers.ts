import { User, UserCreateInput, UserDeleteArgs, UserWhereInput } from '@prisma/client'
import { hash, verify } from 'argon2'

import { __prod__ } from '../constants'
import { MyContext } from '../context'
import { getUserPayload } from '../utils/getUserPayload'
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../utils/createToken'

interface LoginResponse {
  accessToken: string
  user: User
}

export const userQueries = {
  me: (_parent: any, _args: any, { request, db }: MyContext): Promise<User | null> => {
    const { userId } = getUserPayload(request)
    return db.user.findOne({ where: { id: userId } })
  },
  users: (_parent: any, _args: any, { db }: MyContext): Promise<User[]> => {
    return db.user.findMany()
  },
}

export const userMutations = {
  register: async (_parent: any, args: UserCreateInput, { db }: MyContext): Promise<User> => {
    const { name, email, password } = args
    const hashedPassword = await hash(password)

    const user = await db.user.create({
      data: { name, email, password: hashedPassword, }
    })

    return user
  },
  login: async (_parent: any, args: UserWhereInput, { response, db }: MyContext): Promise<LoginResponse> => {
    const { email, password } = args
    const user = await db.user.findOne({ where: { email: email as string } })
    if (!user) throw new Error('email or password not valid')

    const validPassword = await verify(user.password, password as string)
    if (!validPassword) throw new Error('email or password not valid')

    sendRefreshToken(response, createRefreshToken(user))
    return { accessToken: createAccessToken(user), user }
  },
  logout: (_parent: any, _args: any, { response }: MyContext): Boolean => {
    sendRefreshToken(response, '')
    return true
  },
  deleteUser: (_parent: any, args: UserDeleteArgs, { db }: MyContext): Promise<User> => {
    return db.user.delete(args)
  },
}
