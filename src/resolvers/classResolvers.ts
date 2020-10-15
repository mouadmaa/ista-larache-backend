import {
  Class, ClassCreateArgs, ClassDeleteArgs, ClassUpdateArgs, ClassWhereUniqueInput,
  FindOneClassArgs, Formation, Module, Student, User
} from '@prisma/client'

import { MyContext } from '../context'
import { Cloudinary } from '../services/cloudinary'
import { CLOUDINARY_FOLDER_NAME } from '../constants'

interface ClassUpdateArgsWithFile extends ClassUpdateArgs { file?: string }

export const classQueries = {
  class: (_parent: any, args: FindOneClassArgs, { db }: MyContext): Promise<Class | null> => db.class.findOne(args),
  classes: (_parent: any, _args: any, { db }: MyContext): Promise<Class[]> => db.class.findMany(),
}

export const classMutations = {
  createClass: async (_parent: any, args: ClassCreateArgs, { db }: MyContext): Promise<Class> => db.class.create(args),
  updateClass: async (_parent: any, args: ClassUpdateArgsWithFile, { db }: MyContext): Promise<Class> => {
    if (args.file && !args.data.timetable) {
      args.data.timetable = await Cloudinary.uploadImage(args.file)
    } else if (args.file && args.data.timetable) {
      Cloudinary.removeImage(getPublicId(args.data.timetable as string))
      args.data.timetable = await Cloudinary.uploadImage(args.file)
    } else if (!args.file && args.data.timetable) {
      Cloudinary.removeImage(getPublicId(args.data.timetable as string))
      args.data.timetable = null
    }
    delete args.file
    return db.class.update(args as ClassUpdateArgs)
  },
  deleteClass: async (_parent: any, args: ClassDeleteArgs, { db }: MyContext): Promise<Class> => {
    const deletedClass = await db.class.delete(args)
    Cloudinary.removeImage(getPublicId(deletedClass.timetable as string))
    return deletedClass
  }
}

export const classRes = {
  formation: (parent: ClassWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<Formation | null> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.class.findOne({ where: { id: parent.id } }).formation()
  },
  teacher: (parent: ClassWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<User | null> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.class.findOne({ where: { id: parent.id } }).teacher()
  },
  students: (parent: ClassWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<Student[]> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.class.findOne({ where: { id: parent.id } }).students()
  },
  modules: (parent: ClassWhereUniqueInput, _args: any, { db, request }: MyContext): Promise<Module[]> => {
    if (!Boolean(request.session.user)) throw new Error('Not Authorised!')
    return db.class.findOne({ where: { id: parent.id } }).formation().modules()
  },
}

const getPublicId = (timetable?: string) => {
  return `${CLOUDINARY_FOLDER_NAME}/${timetable?.split('/')[8].split('.')[0]}`
}
