import { Module, ModuleCreateArgs, ModuleDeleteArgs, ModuleUpdateArgs } from '@prisma/client'

import { MyContext } from '../context'

export const modules = (_parent: any, _args: any, { db }: MyContext): Promise<Module[]> => db.module.findMany()
export const createModule = (_parent: any, args: ModuleCreateArgs, { db }: MyContext): Promise<Module> => db.module.create(args)
export const updateModule = (_parent: any, args: ModuleUpdateArgs, { db }: MyContext): Promise<Module> => db.module.update(args)
export const deleteModule = (_parent: any, args: ModuleDeleteArgs, { db }: MyContext): Promise<Module> => db.module.delete(args)
