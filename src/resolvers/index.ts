import { me, users, register, login, logout } from './userResolvers'
import { formation, formations, createFormation, updateFormation, deleteFormation, formationModules, formationClasses } from './formationResolvers'
import { modules, createModule, updateModule, deleteModule, moduleClasses, moduleFormation } from './moduleResolvers'
import { classes, createClass, formationClass, teacherClass, modulesClass, updateClass, deleteClass } from './classResolvers'
import { students } from './studentResolvers'
import { notes } from './noteResolvers'

export const resolvers = {
  Query: {
    me,
    users,
    formation,
    formations,
    modules,
    classes,
    students,
    notes,
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
