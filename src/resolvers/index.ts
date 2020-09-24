import { me, users, register, login, logout } from './userResolvers'
import { formations, createFormation, updateFormation, deleteFormation } from './formationResolvers'
import { modules } from './moduleResolvers'
import { classes } from './classResolvers'

export const resolvers = {
  Query: {
    me,
    users,
    formations,
    modules,
    classes,
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
