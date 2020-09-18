import { IResolvers } from 'apollo-server'

import { login, register, users } from './userResolvers'

export const resolvers: IResolvers = {
  Query: {
    users,
  },
  Mutation: {
    register,
    login,
  },
}
