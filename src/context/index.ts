import { IncomingMessage } from 'http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface MyContext {
  prisma: PrismaClient
  req: IncomingMessage
}

interface RequestContext {
  req: IncomingMessage
}

export const context = ({ req }: RequestContext): MyContext => ({
  req, prisma,
})
