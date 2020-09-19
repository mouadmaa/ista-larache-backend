import { GraphQLServer } from 'graphql-yoga'

import { context } from './context'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { permissions } from './lib/permissions'
import { sessionMiddleware } from './middlewares/session'

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares: [
    permissions
  ],
})

server.express.use(
  sessionMiddleware
)

server.start(
  {
    cors: {
      origin: true,
      credentials: true,
    },
  },
  ({ port }) => console.log(`> Server is running on http://localhost:${port}`)
)
