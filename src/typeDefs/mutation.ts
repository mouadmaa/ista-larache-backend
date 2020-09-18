import { gql } from 'apollo-server'

export const mutation = gql`
  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`
