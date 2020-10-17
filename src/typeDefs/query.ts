import gql from 'graphql-tag'

export const query = gql`
  type Query {
    # User
    me: User
    users: [User!]!

    # Formation
    formation(where: FormationWhereUniqueInput!): Formation
    formations: [Formation!]!
    teacherFormations: [Formation!]!

    # Module
    modules: [Module!]!

    # Class
    class(where: ClassWhereUniqueInput!): Class
    classes: [Class!]!

    # Student
    student(where: StudentWhereUniqueInput!): Student
    students: [Student!]!
    publicStudents(where: PublicStudentWhereClassInput!): [PublicStudent!]!

    # Note
    notes: [Note!]!

    # Activity
    activity(where: ActivityWhereInput!): Activity
    activities(skip: Int, take: Int, orderBy: ActivityOrderByInput): [Activity!]!
    _activitiesMeta: ActivitiesMeta!
  }
`
