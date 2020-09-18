import { gql } from 'apollo-server'

export const mutation = gql`
  type Mutation {
    register(data: RegisterUserInput!): AuthPayload
  }
`
