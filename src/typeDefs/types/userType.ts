import gql from 'graphql-tag'

export const userType = gql`
  type User {
    id: String!
    name: String!
    email: String!
    role: Role!
  }

  type LoginResponse {
    accessToken: String
    user: User
  }

  enum Role {
    ADMIN
    TEACHER
  }

  input UserWhereUniqueInput {
    id: String!
  }
`
