import session from 'express-session'

import { COOKIE_NAME, __prod__ } from '../constants'

export const sessions = session({
  name: COOKIE_NAME,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    sameSite: 'lax',
    secure: __prod__,
  },
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: true,
  resave: false,
})
