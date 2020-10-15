import {
  Class, Formation, Module, ModuleCreateArgs, ModuleDeleteArgs,
  ModuleUpdateArgs, ModuleWhereUniqueInput, Note
} from '@prisma/client'

import { MyContext } from '../context'

export const moduleQueries = {
  modules: (_parent: any, _args: any, { db }: MyContext): Promise<Module[]> => db.module.findMany(),
}

export const moduleMutations = {
  createModule: (_parent: any, args: ModuleCreateArgs, { db }: MyContext): Promise<Module> => db.module.create(args),
  updateModule: (_parent: any, args: ModuleUpdateArgs, { db }: MyContext): Promise<Module> => db.module.update(args),
  deleteModule: (_parent: any, args: ModuleDeleteArgs, { db }: MyContext): Promise<Module> => db.module.delete(args),
}

export const moduleRes = {
  classes: (parent: ModuleWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<Class[]> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.module.findOne({ where: { id: parent.id } }).formation().classes()
  },
  notes: (parent: ModuleWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<Note[]> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.module.findOne({ where: { id: parent.id } }).notes()
  },
  formation: (parent: ModuleWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<Formation | null> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.module.findOne({ where: { id: parent.id } }).formation()
  },
}
