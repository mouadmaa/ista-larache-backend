import { Class, ClassCreateArgs, ClassDeleteArgs, ClassUpdateArgs, ClassWhereUniqueInput, FindOneClassArgs, Formation, Module, Student, User } from '@prisma/client'

import { MyContext } from '../context'

export const classQueries = {
  class: (_parent: any, args: FindOneClassArgs, { db }: MyContext): Promise<Class | null> => db.class.findOne(args),
  classes: (_parent: any, _args: any, { db }: MyContext): Promise<Class[]> => db.class.findMany(),
}

export const classMutations = {
  createClass: (_parent: any, args: ClassCreateArgs, { db }: MyContext): Promise<Class> => db.class.create(args),
  updateClass: (_parent: any, args: ClassUpdateArgs, { db }: MyContext): Promise<Class> => db.class.update(args),
  deleteClass: (_parent: any, args: ClassDeleteArgs, { db }: MyContext): Promise<Class> => db.class.delete(args),
}

export const classRes = {
  formation: (parent: ClassWhereUniqueInput, _args: any, { db }: MyContext): Promise<Formation | null> => {
    return db.class.findOne({ where: { id: parent.id } }).formation()
  },
  teacher: (parent: ClassWhereUniqueInput, _args: any, { db }: MyContext): Promise<User | null> => {
    return db.class.findOne({ where: { id: parent.id } }).teacher()
  },
  students: (parent: ClassWhereUniqueInput, _args: any, { db }: MyContext): Promise<Student[]> => {
    return db.class.findOne({ where: { id: parent.id } }).students()
  },
  modules: (parent: ClassWhereUniqueInput, _args: any, { db }: MyContext): Promise<Module[]> => {
    return db.class.findOne({ where: { id: parent.id } }).formation().modules()
  },
}
