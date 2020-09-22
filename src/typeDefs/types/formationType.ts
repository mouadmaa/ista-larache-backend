import gql from 'graphql-tag'

export const formationType = gql`
  type Formation {
    id: String!
    name: String!
    descUrl: String!
    level: Level!
  }

  enum Level {
    Technicien_Specialise
    Technicien
    Qualification
    Specialisation
    Bac_Professionnel
    Parcours_Collegial
    Formation_Qualifiante
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
