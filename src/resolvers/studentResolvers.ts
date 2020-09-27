import { Student } from '@prisma/client'

import { MyContext } from 'src/context'

export const students = (_parent: any, _args: any, { db }: MyContext): Promise<Student[]> => db.student.findMany()
