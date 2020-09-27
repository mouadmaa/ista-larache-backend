import gql from 'graphql-tag'

export const noteType = gql`
  type Note {
    id: String!
    note1: Float
    note2: Float
    note3: Float
    efm: Float
    student: Student!
    module: Module!
  }
`
