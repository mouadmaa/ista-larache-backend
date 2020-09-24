import { Class } from '@prisma/client'

import { MyContext } from 'src/context'

export const classes = (_parent: any, _args: any, { db }: MyContext): Promise<Class[]> => db.class.findMany()
