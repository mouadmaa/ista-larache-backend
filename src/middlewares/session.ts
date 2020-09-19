import dotenv from 'dotenv'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'

import { COOKIE_NAME, __prod__ } from '../constants'

dotenv.config()

const RedisStore = connectRedis(session)
const redisClient = redis.createClient()

export const sessionMiddleware = session({
  name: COOKIE_NAME,
  store: new RedisStore({
    client: redisClient,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    sameSite: 'lax',
    secure: __prod__,
  },
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: false,
  resave: false,
})
