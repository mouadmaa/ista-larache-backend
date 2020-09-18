import dotenv from 'dotenv'
import { ApolloServer, gql } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const prisma = new PrismaClient()

const typeDefs = gql`
  type User {
    id: String
    name: String
  }

  type Query {
    users: [User!]!
  }
`

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`> 🚀  Server ready at ${url}`)
})
