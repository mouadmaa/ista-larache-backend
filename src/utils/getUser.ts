import { IncomingMessage } from 'http'
import { Role } from '@prisma/client'
import { verify } from 'jsonwebtoken'

interface Token {
  userId: string
  role: Role
}

export const getUser = (req: IncomingMessage) => {
  const authorization = req.headers.authorization
  if (!authorization) throw new Error('you must be logged in')

  const token = authorization.replace('Bearer ', '')
  const { userId, role } = verify(token, process.env.JWT_SECRET!) as Token

  return { userId, role, }
}
