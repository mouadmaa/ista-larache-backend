import { IResolvers } from 'apollo-server'

import { register, users } from './userResolvers'

export const resolvers: IResolvers = {
  Query: {
    users,
  },
  Mutation: {
    register,
  },
}
