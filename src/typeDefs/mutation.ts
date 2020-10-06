import gql from 'graphql-tag'

export const mutation = gql`
  type Mutation {
    # user
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean!

    # Formation
    createFormation(data: FormationCreateInput!): Formation!
    updateFormation(where: FormationWhereUniqueInput!, data: FormationUpdateInput!): Formation!
    deleteFormation(where: FormationWhereUniqueInput!): Formation!

    # Module
    createModule(data: ModuleCreateInput!): Module!
    updateModule(where: ModuleWhereUniqueInput!, data: ModuleUpdateInput!): Module!
    deleteModule(where: ModuleWhereUniqueInput!): Module!

    # Class
    createClass(data: ClassCreateInput!): Class!
    updateClass(where: ClassWhereUniqueInput!, data: ClassUpdateInput!, file: String): Class!
    deleteClass(where: ClassWhereUniqueInput!): Class!

    # Student
    createStudent(data: StudentCreateInput!): Student!
    updateStudent(where: StudentWhereUniqueInput!, data: StudentUpdateInput!): Student!
    deleteStudent(where: StudentWhereUniqueInput!): Student!

    # Note
    createNote(data: NoteCreateInput!): Note!
    updateNote(where: NoteWhereUniqueInput!, data: NoteUpdateInput!): Note!
    deleteNote(where: NoteWhereUniqueInput!): Note!
  }
`
