import { me, users, register, login, logout } from './userResolvers'
import { formation, formations, createFormation, updateFormation, deleteFormation, formationModules, formationClasses } from './formationResolvers'
import { modules, createModule, updateModule, deleteModule, moduleClasses, moduleFormation } from './moduleResolvers'
import { classes, createClass, formationClass, teacherClass, modulesClass, updateClass, deleteClass } from './classResolvers'

export const resolvers = {
  Query: {
    me,
    users,
    formation,
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
    createModule,
    updateModule,
    deleteModule,
    createClass,
    updateClass,
    deleteClass,
  },
  Formation: {
    modules: formationModules,
    classes: formationClasses,
  },
  Module: {
    classes: moduleClasses,
    formation: moduleFormation,
  },
  Class: {
    formation: formationClass,
    teacher: teacherClass,
    modules: modulesClass,
  }
}
