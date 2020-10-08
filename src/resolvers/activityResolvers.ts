import { Activity, ActivityCreateArgs, ActivityUpdateArgs } from '@prisma/client'
import slugify from 'slugify'

import { MyContext, prisma } from '../context'

export const activityQueries = {
  activities: (_parent: any, _args: any, { db }: MyContext): Promise<Activity[]> => db.activity.findMany(),
}

export const activityMutations = {
  createActivity: (_parent: any, args: ActivityCreateArgs, { db }: MyContext): Promise<Activity> => db.activity.create(args),
}

prisma.$use((params, next) => {
  if (params.model === 'Activity' && (params.action === 'create' || params.action === 'update')) {
    const args = params.args as ActivityCreateArgs | ActivityUpdateArgs
    args.data.slug = slugify(args.data.title as string, { lower: true, strict: true })
  }
  return next(params)
})
