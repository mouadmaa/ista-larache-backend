import gql from 'graphql-tag'

export const studentType = gql`
  type Student {
    id: String!
    fullName: String!
    cef: String
    cin: String
    password: String!
    notes: [Note!]!
    finalNote1: Float
    finalNote2: Float
    class: Class!
  }

  type PublicStudent {
    id: String!
    fullName: String!
    cef: String
    cin: String
  }

  input StudentCreateInput {
    fullName: String!
    cef: String
    cin: String
    password: String!
    finalNote1: Float
    finalNote2: Float
    class: ClassConnectStudentInput!
  }

  input StudentUpdateInput {
    fullName: String
    cef: String
    cin: String
    password: String
    finalNote1: Float
    finalNote2: Float
    class: ClassConnectStudentInput
  }

  input ClassConnectStudentInput {
    connect: ClassWhereUniqueInput!
  }

  input StudentWhereUniqueInput {
    id: String!
  }

  input PublicStudentWhereClassInput {
    classId: String!
  }
`
