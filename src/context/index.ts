import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface MyContext {
  prisma: PrismaClient
}

export const context: MyContext = {
  prisma
}
