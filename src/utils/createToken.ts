import { Response } from 'express'
import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'

import { TOKEN_NAME } from '../constants'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id, userRole: user.role },
    process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' }
  )
}

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id },
    process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' }
  )
}

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(TOKEN_NAME, token, { httpOnly: true, path: '/refresh_token', })
}
