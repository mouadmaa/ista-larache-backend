import { me, users, register, login, logout } from './userResolvers'
import { formations, createFormation, updateFormation, deleteFormation } from './formationResolvers'

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
    createFormation,
    updateFormation,
    deleteFormation,
  },
}
