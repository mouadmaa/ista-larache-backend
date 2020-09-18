import { IncomingMessage } from 'http'
import { verify } from 'jsonwebtoken'

interface Token {
  userId: string
}

export const getUserId = (req: IncomingMessage) => {
  const authorization = req.headers.authorization
  if (!authorization) throw new Error('you must be logged in')

  const token = authorization.replace('Bearer ', '')
  const { userId } = verify(token, process.env.JWT_SECRET!) as Token

  return userId
}
