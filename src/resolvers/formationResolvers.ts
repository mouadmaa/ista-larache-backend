import { Formation } from '@prisma/client'

import { MyContext } from 'src/context'

export const formations = (_parent: any, _args: any, { db }: MyContext): Promise<Formation[]> => db.formation.findMany()
