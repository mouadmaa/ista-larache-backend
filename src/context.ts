import { PrismaClient, User } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn'],
  errorFormat: 'minimal',
})

interface Session extends Express.Session {
  user: User | null
}

interface ContextParameter {
  request: Request & { session: Session }
  response: Response
}

export interface MyContext extends ContextParameter {
  db: PrismaClient
}

export const context = ({ request, response }: ContextParameter): MyContext => ({
  request, response, db: prisma,
})
