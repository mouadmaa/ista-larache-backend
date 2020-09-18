import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server'

import { context } from './context'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`> 🚀  Server ready at ${url}`)
})
