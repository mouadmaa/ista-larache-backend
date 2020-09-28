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

  input StudentCreateInput {
    name: String!
    cef: String
    cin: String
    password: String!
    dateBirth: String!
    finalNote1: Float
    finalNote2: Float
    class: ClassConnectStudentInput!
  }

  input StudentUpdateInput {
    name: String
    cef: String
    cin: String
    password: String
    dateBirth: String
    finalNote1: Float
    finalNote2: Float
    class: ClassConnectStudentInput
  }

  input ClassConnectStudentInput {
    connect: StudentWhereUniqueInput!
  }

  input StudentWhereUniqueInput {
    id: String!
  }
`
