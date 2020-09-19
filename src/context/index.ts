import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export interface MyContext {
  request: Request & { session: Session }
  response: Response
  db: PrismaClient
}

interface Session extends Express.Session {
  user: User | null
}

export const context = ({ request, response }: any): MyContext => ({
  request, response, db: prisma,
})
