import { gql } from 'apollo-server'

export const userType = gql`
  type User {
    id: String
    name: String
  }
`
