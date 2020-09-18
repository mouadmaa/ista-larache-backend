import { login, register, me, users } from './userResolvers'

export const resolvers = {
  Query: {
    me,
    users,
  },
  Mutation: {
    register,
    login,
  },
}
