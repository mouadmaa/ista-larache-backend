import gql from 'graphql-tag'

export const studentType = gql`
  type Student {
    id: String!
    name: String!
    cef: String
    cin: String
    password: String!
    dateBirth: String!
    notes: [Note!]!
    finalNote1: Float
    finalNote2: Float
    class: Class!
  }
`
