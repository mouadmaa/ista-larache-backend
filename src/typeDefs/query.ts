import gql from 'graphql-tag'

export const query = gql`
  type Query {
    # User
    me: User
    users: [User!]!

    # Formation
    formation(where: FormationWhereUniqueInput!): Formation
    formations: [Formation!]!

    # Module
    modules: [Module!]!

    # Class
    classes: [Class!]!
  }
`
