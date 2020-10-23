import { GraphQLServer } from 'graphql-yoga'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import depthLimit from 'graphql-depth-limit'
import dotenv from 'dotenv'
dotenv.config()

import { __prod__ } from './constants'
import { context } from './context'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { permissions } from './middlewares/permissions'
import { refreshTokenRouter } from './utils/refreshTokenRouter'

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares: [
    permissions
  ],
})

server.express.use(cors({
  origin: true,
  credentials: true,
}))

server.express.use(cookieParser())
server.express.use(refreshTokenRouter)

server.start(
  {
    cors: false,
    bodyParserOptions: {
      limit: '3mb',
    },
    validationRules: [
      depthLimit(3)
    ]
  },
  ({ port }) => console.log(
    __prod__ ? `> 🚀🚀🚀 Server is up running 🔥`
      : `> 🚀🚀🚀 Server is up running on http://localhost:${port} 🔥`
  )
)
