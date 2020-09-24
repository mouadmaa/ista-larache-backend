import gql from 'graphql-tag'

export const moduleType = gql`
  type Module {
    id: String!
    number: Int!
    name: String!
    classes: [Class!]!
    formation: Formation!
  }

  input ModuleCreateInput {
    number: Int!
    name: String!
    formation: FormationConnectModuleInput!
  }

  input FormationConnectModuleInput {
    connect: FormationWhereUniqueInput!
  }

  input ModuleUpdateInput {
    number: Int
    name: String
    formation: FormationConnectModuleInput
  }

  input ModuleWhereUniqueInput {
    id: String!
  }
`
