import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn'],
  errorFormat: 'minimal',
})

interface ContextParameter {
  request: Request
  response: Response
}

export interface MyContext extends ContextParameter {
  db: PrismaClient
}

export const context = ({ request, response }: ContextParameter): MyContext => ({
  request, response, db: prisma,
})
