import { Activity, ActivityCreateArgs, ActivityDeleteArgs, ActivityUpdateArgs } from '@prisma/client'
import slugify from 'slugify'

import { MyContext } from '../context'
import { Cloudinary } from '../services/cloudinary'
import { CLOUDINARY_FOLDER_NAME } from '../constants'

interface ActivityCreateArgsWithFile extends ActivityCreateArgs { file?: string }
interface ActivityUpdateArgsWithFile extends ActivityUpdateArgs { file?: string }

export const activityQueries = {
  activities: (_parent: any, _args: any, { db }: MyContext): Promise<Activity[]> => db.activity.findMany(),
}

export const activityMutations = {
  createActivity: async (_parent: any, args: ActivityCreateArgsWithFile, { db }: MyContext): Promise<Activity> => {
    args.data.slug = slugify(args.data.title as string, { lower: true, strict: true })
    args.data.image = await Cloudinary.uploadImage(args.file as string)
    delete args.file
    return db.activity.create(args as ActivityCreateArgs)
  },
  updateActivity: async (_parent: any, args: ActivityUpdateArgsWithFile, { db }: MyContext): Promise<Activity> => {
    args.data.slug = slugify(args.data.title as string, { lower: true, strict: true })
    if (args.file) {
      Cloudinary.removeImage(getPublicId(args.data.image as string))
      args.data.image = await Cloudinary.uploadImage(args.file)
      delete args.file
    }
    return db.activity.update(args as ActivityUpdateArgs)
  },
  deleteActivity: async (_parent: any, args: ActivityDeleteArgs, { db }: MyContext): Promise<Activity> => {
    const deletedActivity = await db.activity.delete(args)
    Cloudinary.removeImage(getPublicId(deletedActivity.image))
    return deletedActivity
  },
}

const getPublicId = (image: string) => {
  return `${CLOUDINARY_FOLDER_NAME}/${image?.split('/')[8].split('.')[0]}`
}
