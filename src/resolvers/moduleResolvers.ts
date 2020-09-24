import { Module } from '@prisma/client'

import { MyContext } from 'src/context'

export const modules = (_parent: any, _args: any, { db }: MyContext): Promise<Module[]> => db.module.findMany()
