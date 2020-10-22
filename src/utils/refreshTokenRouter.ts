import { Router } from 'express'
import { verify } from 'jsonwebtoken'

import { TOKEN_NAME } from '../constants'
import { prisma } from '../context'
import { createAccessToken, createRefreshToken, sendRefreshToken } from './createToken'

interface Payload {
  userId: string
}

const route = Router()

export const refreshTokenRouter = route.post('/refresh_token', async (req, res) => {
  try {
    const token = req.cookies[TOKEN_NAME]
    if (!token) throw new Error()

    const { userId } = verify(token, process.env.REFRESH_TOKEN_SECRET!) as Payload

    const user = await prisma.user.findOne({ where: { id: userId } })
    if (!user) throw new Error()

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      success: true,
      accessToken: createAccessToken(user)
    })
  } catch {
    return res.send({ user: null, success: false, accessToken: '' })
  }
})
