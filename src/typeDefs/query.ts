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
    class(where: ClassWhereUniqueInput!): Class
    classes: [Class!]!

    # Student
    student(where: StudentWhereUniqueInput!): Student
    students: [Student!]!

    # Note
    notes: [Note!]!
  }
`
