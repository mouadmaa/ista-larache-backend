import {
  Class, Formation, Module, ModuleCreateArgs, ModuleDeleteArgs,
  ModuleUpdateArgs, ModuleWhereUniqueInput
} from '@prisma/client'

import { MyContext } from '../context'

export const modules = (_parent: any, _args: any, { db }: MyContext): Promise<Module[]> => db.module.findMany()
export const createModule = (_parent: any, args: ModuleCreateArgs, { db }: MyContext): Promise<Module> => db.module.create(args)
export const updateModule = (_parent: any, args: ModuleUpdateArgs, { db }: MyContext): Promise<Module> => db.module.update(args)
export const deleteModule = (_parent: any, args: ModuleDeleteArgs, { db }: MyContext): Promise<Module> => db.module.delete(args)

export const moduleClasses = (parent: ModuleWhereUniqueInput, _args: any, { db }: MyContext): Promise<Class[]> => {
  return db.module.findOne({ where: { id: parent.id } }).formation().classes()
}
export const moduleFormation = (parent: ModuleWhereUniqueInput, _args: any, { db }: MyContext): Promise<Formation | null> => {
  return db.module.findOne({ where: { id: parent.id } }).formation()
}
