import { User } from '@prisma/client'
import { Request } from 'express'
import { verify } from 'jsonwebtoken'

interface Token {
  user: User | null
}

export const getUser = (request: Request) => {
  const { token } = request.cookies

  if (!token) throw new Error('Not Authorised!')

  const { user } = verify(token, process.env.JWT_SECRET!) as Token

  return user
}
