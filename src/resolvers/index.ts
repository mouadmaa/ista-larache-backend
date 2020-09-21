import { me, users, register, login, logout } from './userResolvers'
import { formations } from './formationResolvers'

export const resolvers = {
  Query: {
    me,
    users,
    formations,
  },
  Mutation: {
    register,
    login,
    logout,
  },
}
