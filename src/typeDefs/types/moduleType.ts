import gql from 'graphql-tag'

export const moduleType = gql`
  type Module {
    id: String!
    number: Int!
    name: String!
    classes: [Class!]!
    formation: Formation!
  }
`
