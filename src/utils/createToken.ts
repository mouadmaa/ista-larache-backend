import { Response } from 'express'
import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'

import { TOKEN_NAME, __prod__ } from '../constants'

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
  res.cookie(TOKEN_NAME, token, {
    expires: new Date(Date.now() + 864000000),
    httpOnly: true,
    secure: __prod__,
    sameSite: 'none',
  })
}
