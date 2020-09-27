import { Note } from '@prisma/client'

import { MyContext } from 'src/context'

export const notes = (_parent: any, _args: any, { db }: MyContext): Promise<Note[]> => db.note.findMany()
