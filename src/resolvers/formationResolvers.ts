import { Class, FindOneFormationArgs, Formation, FormationCreateArgs, FormationDeleteArgs, FormationUpdateArgs, FormationWhereUniqueInput, Module } from '@prisma/client'

import { MyContext } from '../context'

export const formation = (_parent: any, args: FindOneFormationArgs, { db }: MyContext): Promise<Formation | null> => db.formation.findOne(args)
export const formations = (_parent: any, _args: any, { db }: MyContext): Promise<Formation[]> => db.formation.findMany()

export const createFormation = (_parent: any, args: FormationCreateArgs, { db }: MyContext): Promise<Formation> => db.formation.create(args)
export const updateFormation = (_parent: any, args: FormationUpdateArgs, { db }: MyContext): Promise<Formation> => db.formation.update(args)
export const deleteFormation = (_parent: any, args: FormationDeleteArgs, { db }: MyContext): Promise<Formation> => db.formation.delete(args)

export const formationModules = (parent: FormationWhereUniqueInput, _args: any, { db }: MyContext): Promise<Module[]> => {
  return db.formation.findOne({ where: { id: parent.id } }).modules()
}
export const formationClasses = (parent: FormationWhereUniqueInput, _args: any, { db }: MyContext): Promise<Class[]> => {
  return db.formation.findOne({ where: { id: parent.id } }).classes()
}
