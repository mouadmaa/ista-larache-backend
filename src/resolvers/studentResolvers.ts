import {
  FindOneStudentArgs, Note, Student, StudentCreateArgs, FindManyStudentArgs,
  StudentDeleteArgs, StudentUpdateArgs, StudentWhereUniqueInput
} from '@prisma/client'

import { MyContext } from '../context'

interface StudentNotesArgs {
  cinOrCef: string
  password: string
}

export const studentQueries = {
  student: (_parent: any, args: FindOneStudentArgs, { db }: MyContext): Promise<Student | null> => db.student.findOne(args),
  students: (_parent: any, _args: any, { db }: MyContext): Promise<Student[]> => db.student.findMany(),
  publicStudents: (_parent: any, args: FindManyStudentArgs, { db }: MyContext): Promise<Student[]> => db.student.findMany(args),
}

export const studentMutations = {
  createStudent: (_parent: any, args: StudentCreateArgs, { db }: MyContext): Promise<Student> => db.student.create(args),
  updateStudent: (_parent: any, args: StudentUpdateArgs, { db }: MyContext): Promise<Student> => db.student.update(args),
  deleteStudent: (_parent: any, args: StudentDeleteArgs, { db }: MyContext): Promise<Student> => db.student.delete(args),
  studentNotes: async (_parent: any, { cinOrCef, password }: StudentNotesArgs, { db }: MyContext): Promise<Student | null> => {
    let student = await db.student.findOne({ where: { cin: cinOrCef } })
    if (!student) student = await db.student.findOne({ where: { cef: cinOrCef } })
    if (student?.password !== password) throw new Error('cin or cef or password not valid')
    return student
  }
}

export const studentRes = {
  notes: (parent: StudentWhereUniqueInput, _args: any, { db }: MyContext): Promise<Note[]> => {
    return db.student.findOne({ where: { id: parent.id } }).notes()
  },
  class: (parent: StudentWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<Note[]> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.student.findOne({ where: { id: parent.id } }).notes()
  },
}
