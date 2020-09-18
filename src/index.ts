import dotenv from 'dotenv'
import { GraphQLServer } from 'graphql-yoga'

import { context } from './context'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { permissions } from './lib/permissions'

dotenv.config()

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares: [
    permissions
  ],
})

server.start(
  () => console.log('> Server is running on http://localhost:4000')
)
