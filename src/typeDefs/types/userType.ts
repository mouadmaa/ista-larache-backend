import gql from 'graphql-tag'

export const userType = gql`
  type User {
    id: String!
    name: String!
    email: String!
    role: String!
    createdAt: String!
  }
`
