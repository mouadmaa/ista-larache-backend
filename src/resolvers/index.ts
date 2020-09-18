import { IResolvers } from 'apollo-server'

import { login, register, me, users } from './userResolvers'

export const resolvers: IResolvers = {
  Query: {
    me,
    users,
  },
  Mutation: {
    register,
    login,
  },
}
