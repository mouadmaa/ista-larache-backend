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

  input NoteCreateInput {
    note1: Float
    note2: Float
    note3: Float
    efm: Float
    student: StudentConnectNoteInput!
    module: ModuleConnectNoteInput!
  }

  input NoteUpdateInput {
    note1: Float
    note2: Float
    note3: Float
    efm: Float
  }

  input StudentConnectNoteInput {
    connect: StudentWhereUniqueInput!
  }

  input ModuleConnectNoteInput {
    connect: ModuleWhereUniqueInput!
  }

  input NoteWhereUniqueInput {
    id: String!
  }
`
