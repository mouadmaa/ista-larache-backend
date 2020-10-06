import { GraphQLServer } from 'graphql-yoga'

import dotenv from 'dotenv'
dotenv.config()

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

server.start(
  {
    cors: {
      origin: true,
      credentials: true,
    },
    bodyParserOptions: {
      limit: '3mb'
    },
  },
  ({ port }) => console.log(
    `> Server is running on http://localhost:${port}`
  )
)
