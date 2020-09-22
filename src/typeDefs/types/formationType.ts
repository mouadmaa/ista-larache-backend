import gql from 'graphql-tag'

export const formationType = gql`
  type Formation {
    id: String!
    name: String!
    descUrl: String!
    level: Level!
  }

  enum Level {
    Specialist_Technician
    Technician
    Qualification
    Specialization
    Professional_Baccalaureate
    College_Courses
    Formation_Qualification
  }

  input CreateFormationInput {
    name: String!
    descUrl: String!
    level: Level!
  }

  input FormationUpdateInput {
    name: String
    descUrl: String
    level: Level
  }

  input FormationWhereUniqueInput {
    id: String!
  }
`
