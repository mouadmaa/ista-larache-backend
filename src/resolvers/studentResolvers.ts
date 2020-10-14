import {
  Class, FindOneStudentArgs, Note, Student, StudentCreateArgs,
  StudentDeleteArgs, StudentUpdateArgs, StudentWhereInput, StudentWhereUniqueInput
} from '@prisma/client'

import { MyContext } from '../context'

export const studentQueries = {
  student: (_parent: any, args: FindOneStudentArgs, { db }: MyContext): Promise<Student | null> => db.student.findOne(args),
  students: (_parent: any, _args: any, { db }: MyContext): Promise<Student[]> => db.student.findMany(),
}

export const studentMutations = {
  createStudent: (_parent: any, args: StudentCreateArgs, { db }: MyContext): Promise<Student> => db.student.create(args),
  updateStudent: (_parent: any, args: StudentUpdateArgs, { db }: MyContext): Promise<Student> => db.student.update(args),
  deleteStudent: (_parent: any, args: StudentDeleteArgs, { db }: MyContext): Promise<Student> => db.student.delete(args),
  studentNotes: async (_parent: any, { cin, cef, password }: StudentWhereInput, { db }: MyContext): Promise<Student | null> => {
    const where = cin ? { cin: cin as string } : { cef: cef as string }
    const student = await db.student.findOne({ where })
    if (student?.password !== password) throw new Error('cin or cef or password not valid')
    return student
  }
}

export const studentRes = {
  notes: (parent: StudentWhereUniqueInput, _args: any, { db }: MyContext): Promise<Note[]> => {
    return db.student.findOne({ where: { id: parent.id } }).notes()
  },
  class: (parent: StudentWhereUniqueInput, _args: any, { db }: MyContext): Promise<Class | null> => {
    return db.student.findOne({ where: { id: parent.id } }).class()
  },
}
