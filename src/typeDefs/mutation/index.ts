import gql from 'graphql-tag'

export const mutation = gql`
  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`
