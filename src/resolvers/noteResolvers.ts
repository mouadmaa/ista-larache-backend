import { Module, Note, NoteCreateArgs, NoteDeleteArgs, NoteUpdateArgs, NoteWhereUniqueInput, Student } from '@prisma/client'

import { MyContext } from 'src/context'

export const noteQueries = {
  notes: (_parent: any, _args: any, { db }: MyContext): Promise<Note[]> => db.note.findMany(),
}

export const noteMutations = {
  createNote: (_parent: any, args: NoteCreateArgs, { db }: MyContext): Promise<Note> => db.note.create(args),
  updateNote: (_parent: any, args: NoteUpdateArgs, { db }: MyContext): Promise<Note> => db.note.update(args),
  deleteNote: (_parent: any, args: NoteDeleteArgs, { db }: MyContext): Promise<Note> => db.note.delete(args),
}

export const noteRes = {
  student: (parent: NoteWhereUniqueInput, _args: any, { db }: MyContext): Promise<Student | null> => {
    return db.note.findOne({ where: { id: parent.id } }).student()
  },
  module: (parent: NoteWhereUniqueInput, _args: any, { db }: MyContext): Promise<Module | null> => {
    return db.note.findOne({ where: { id: parent.id } }).module()
  },
}
