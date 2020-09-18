import { gql } from 'apollo-server'

export const userType = gql`
  type User {
    id: String!
    name: String!
    email: String!
    role: String!
    createdAt: String!
  }
`
