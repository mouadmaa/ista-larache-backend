import { Class, Note, Student, StudentCreateArgs, StudentDeleteArgs, StudentUpdateArgs, StudentWhereUniqueInput } from '@prisma/client'

import { MyContext } from 'src/context'

export const students = (_parent: any, _args: any, { db }: MyContext): Promise<Student[]> => db.student.findMany()
export const createStudent = (_parent: any, args: StudentCreateArgs, { db }: MyContext): Promise<Student> => db.student.create(args)
export const updateStudent = (_parent: any, args: StudentUpdateArgs, { db }: MyContext): Promise<Student> => db.student.update(args)
export const deleteStudent = (_parent: any, args: StudentDeleteArgs, { db }: MyContext): Promise<Student> => db.student.delete(args)

export const studentNotes = (parent: StudentWhereUniqueInput, _args: any, { db }: MyContext): Promise<Note[]> => {
  db.$use(async (params, next) => {
    console.log(params)
    return next(params)
  })
  return db.student.findOne({ where: { id: parent.id } }).notes()
}
export const studentClass = (parent: StudentWhereUniqueInput, _args: any, { db }: MyContext): Promise<Class | null> => {
  return db.student.findOne({ where: { id: parent.id } }).class()
}
