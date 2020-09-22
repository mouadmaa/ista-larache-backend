import { Formation, FormationCreateArgs, FormationDeleteArgs, FormationUpdateArgs } from '@prisma/client'

import { MyContext } from '../context'

export const formations = (_parent: any, _args: any, { db }: MyContext): Promise<Formation[]> => db.formation.findMany()
export const createFormation = (_parent: any, args: FormationCreateArgs, { db }: MyContext): Promise<Formation> => db.formation.create(args)
export const updateFormation = (_parent: any, args: FormationUpdateArgs, { db }: MyContext): Promise<Formation> => db.formation.update(args)
export const deleteFormation = (_parent: any, args: FormationDeleteArgs, { db }: MyContext): Promise<Formation> => db.formation.delete(args)
