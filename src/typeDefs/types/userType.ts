import gql from 'graphql-tag'

export const userType = gql`
  type User {
    id: String!
    name: String!
    email: String!
    role: Role!
  }

  enum Role {
    ADMIN
    TEACHER
  }

  input UserWhereUniqueInput {
    id: String!
  }
`
