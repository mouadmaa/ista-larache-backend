import { Class, ClassCreateArgs, ClassDeleteArgs, ClassUpdateArgs, ClassWhereUniqueInput, Formation, Module, User } from '@prisma/client'

import { MyContext } from '../context'

export const classes = (_parent: any, _args: any, { db }: MyContext): Promise<Class[]> => db.class.findMany()
export const createClass = (_parent: any, args: ClassCreateArgs, { db }: MyContext): Promise<Class> => db.class.create(args)
export const updateClass = (_parent: any, args: ClassUpdateArgs, { db }: MyContext): Promise<Class> => db.class.update(args)
export const deleteClass = (_parent: any, args: ClassDeleteArgs, { db }: MyContext): Promise<Class> => db.class.delete(args)

export const formationClass = async (parent: ClassWhereUniqueInput, _args: any, { db }: MyContext): Promise<Formation | null> => {
  return db.class.findOne({ where: { id: parent.id } }).formation()
}
export const teacherClass = (parent: ClassWhereUniqueInput, _args: any, { db }: MyContext): Promise<User | null> => {
  return db.class.findOne({ where: { id: parent.id } }).teacher()
}
export const modulesClass = (parent: ClassWhereUniqueInput, _args: any, { db }: MyContext): Promise<Module[]> => {
  return db.class.findOne({ where: { id: parent.id } }).formation().modules()
}

