import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'

const prisma = new PrismaClient()

export type MyContext = {
  db: PrismaClient
} & ContextParameters

export const context = (request: ContextParameters): MyContext => ({
  ...request, db: prisma,
})
