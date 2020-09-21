import gql from 'graphql-tag'

export const query = gql`
  type Query {
    me: User
    users: [User!]!
    formations: [Formation!]!
  }
`
