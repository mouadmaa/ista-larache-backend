import { IResolvers } from 'apollo-server'

import { users } from './userResolvers'

export const resolvers: IResolvers = {
  Query: {
    users,
  },
}
