import { User } from '@prisma/client'
import gql from 'graphql-tag'

export interface AuthPayload {
  token: String,
  user: User
}

export const authType = gql`
  type AuthPayload {
    token: String!
    user: User!
  }
`
