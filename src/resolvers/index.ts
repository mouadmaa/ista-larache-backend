import { me, users, register, login, logout } from './userResolvers'
import { formation, formations, createFormation, updateFormation, deleteFormation, formationModules, formationClasses } from './formationResolvers'
import { modules, createModule, updateModule, deleteModule, moduleClasses, moduleFormation, moduleNotes } from './moduleResolvers'
import { classes, createClass, formationClass, teacherClass, modulesClass, updateClass, deleteClass } from './classResolvers'
import { students, createStudent, updateStudent, deleteStudent, studentNotes, studentClass } from './studentResolvers'
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
    createStudent,
    updateStudent,
    deleteStudent,
  },
  Formation: {
    modules: formationModules,
    classes: formationClasses,
  },
  Module: {
    formation: moduleFormation,
    classes: moduleClasses,
    notes: moduleNotes,
  },
  Class: {
    formation: formationClass,
    teacher: teacherClass,
    modules: modulesClass,
  },
  Student: {
    notes: studentNotes,
    class: studentClass,
  },
}
