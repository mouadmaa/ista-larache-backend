import {
  Activity, ActivityCreateArgs, ActivityDeleteArgs, ActivityUpdateArgs, FindManyActivityArgs, FindOneActivityArgs
} from '@prisma/client'
import slugify from 'slugify'

import { MyContext } from '../context'
import { Cloudinary } from '../services/cloudinary'
import { getImagePublicId } from '../utils/getImagePublicId'

interface ActivityMeta { count: number }
interface ActivityCreateArgsWithFile extends ActivityCreateArgs { file?: string }
interface ActivityUpdateArgsWithFile extends ActivityUpdateArgs { file?: string }

export const activityQueries = {
  activity: (_parent: any, args: FindOneActivityArgs, { db }: MyContext): Promise<Activity | null> => db.activity.findOne(args),
  activities: (_parent: any, args: FindManyActivityArgs, { db }: MyContext): Promise<Activity[]> => db.activity.findMany(args),
  _activitiesMeta: async (_parent: any, _args: any, { db }: MyContext): Promise<ActivityMeta> => ({ count: await db.activity.count() }),
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
      Cloudinary.removeImage(getImagePublicId(args.data.image as string))
      args.data.image = await Cloudinary.uploadImage(args.file)
      delete args.file
    }
    return db.activity.update(args as ActivityUpdateArgs)
  },
  deleteActivity: async (_parent: any, args: ActivityDeleteArgs, { db }: MyContext): Promise<Activity> => {
    const deletedActivity = await db.activity.delete(args)
    Cloudinary.removeImage(getImagePublicId(deletedActivity.image))
    return deletedActivity
  },
}
