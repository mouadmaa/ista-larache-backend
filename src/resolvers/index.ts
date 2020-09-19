import { me, users, register, login, logout } from './userResolvers'

export const resolvers = {
  Query: {
    me,
    users,
  },
  Mutation: {
    register,
    login,
    logout,
  },
}
