import {
  Class, FindOneFormationArgs, Formation, FormationCreateArgs, FormationDeleteArgs,
  FormationUpdateArgs, FormationWhereUniqueInput, Module
} from '@prisma/client'

import { MyContext } from '../context'
import { TOKEN_NAME } from '../constants'
import { getUserPayload } from '../utils/getUserPayload'

export const formationQueries = {
  formation: (_parent: any, args: FindOneFormationArgs, { db }: MyContext): Promise<Formation | null> => db.formation.findOne(args),
  formations: (_parent: any, _args: any, { db }: MyContext): Promise<Formation[]> => db.formation.findMany(),
  teacherFormations: (_parent: any, _args: any, { db, request }: MyContext): Promise<Formation[]> => {
    const teacherId = getUserPayload(request).userId
    return db.formation.findMany({ where: { classes: { some: { teacherId } } } })
  }
}

export const formationMutations = {
  createFormation: (_parent: any, args: FormationCreateArgs, { db }: MyContext): Promise<Formation> => db.formation.create(args),
  updateFormation: (_parent: any, args: FormationUpdateArgs, { db }: MyContext): Promise<Formation> => db.formation.update(args),
  deleteFormation: (_parent: any, args: FormationDeleteArgs, { db }: MyContext): Promise<Formation> => db.formation.delete(args),
}

export const formationRes = {
  modules: (parent: FormationWhereUniqueInput, _args: any, { db }: MyContext): Promise<Module[]> => {
    return db.formation.findOne({ where: { id: parent.id } }).modules()
  },
  classes: async (parent: FormationWhereUniqueInput, _args: any, { request, db }: MyContext): Promise<Class[]> => {
    if (request.cookies[TOKEN_NAME]) {
      const { userId, userRole } = getUserPayload(request)
      if (userRole === 'TEACHER') return db.class.findMany({ where: { formationId: parent.id, teacherId: userId } })
    }
    return db.formation.findOne({ where: { id: parent.id } }).classes()
  },
}
