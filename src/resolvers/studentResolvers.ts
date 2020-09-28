import { Class, Note, Student, StudentCreateArgs, StudentDeleteArgs, StudentUpdateArgs, StudentWhereUniqueInput } from '@prisma/client'

import { MyContext } from 'src/context'

export const studentQueries = {
  students: (_parent: any, _args: any, { db }: MyContext): Promise<Student[]> => db.student.findMany(),
}

export const studentMutations = {
  createStudent: (_parent: any, args: StudentCreateArgs, { db }: MyContext): Promise<Student> => db.student.create(args),
  updateStudent: (_parent: any, args: StudentUpdateArgs, { db }: MyContext): Promise<Student> => db.student.update(args),
  deleteStudent: (_parent: any, args: StudentDeleteArgs, { db }: MyContext): Promise<Student> => db.student.delete(args),
}

export const studentRes = {
  notes: (parent: StudentWhereUniqueInput, _args: any, { db }: MyContext): Promise<Note[]> => {
    return db.student.findOne({ where: { id: parent.id } }).notes()
  },
  class: (parent: StudentWhereUniqueInput, _args: any, { db }: MyContext): Promise<Class | null> => {
    return db.student.findOne({ where: { id: parent.id } }).class()
  },
}
