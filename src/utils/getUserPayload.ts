import { Role } from '@prisma/client'
import { Request } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  userId?: string
  userRole?: Role
}

export const getUserPayload = (request: Request) => {
  const authorization = request.headers['authorization']
  if (!authorization) throw new Error('Not Authorized!')

  const token = authorization.replace('Bearer ', '')
  const { userId, userRole } = verify(token, process.env.ACCESS_TOKEN_SECRET!) as Payload

  return { userId, userRole }
}
