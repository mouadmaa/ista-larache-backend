import { GraphQLServer } from 'graphql-yoga'
import depthLimit from 'graphql-depth-limit'

import dotenv from 'dotenv'
dotenv.config()

import { __prod__ } from './constants'
import { context } from './context'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { sessions } from './middlewares/sessions'
import { permissions } from './middlewares/permissions'

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares: [
    permissions
  ],
})

server.express.use(
  sessions
)

// if (__prod__) {
//   server.express.enable('trust proxy')

//   const enforce = require('express-sslify')
//   server.express.use(enforce.HTTPS({ trustProtoHeader: true }))

//   const helmet = require('helmet')
//   server.express.use(helmet())
// }

server.start(
  {
    cors: {
      origin: true,
      credentials: true,
    },
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
