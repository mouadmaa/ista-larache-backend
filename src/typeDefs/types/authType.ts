import { User } from '@prisma/client'
import { gql } from 'apollo-server'

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
