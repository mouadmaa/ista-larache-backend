import gql from 'graphql-tag'

export const mutation = gql`
  type Mutation {
    # user
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean

    # Formation
    createFormation(data: CreateFormationInput!): Formation!
    updateFormation(where: FormationWhereUniqueInput!, data: FormationUpdateInput!): Formation!
    deleteFormation(where: FormationWhereUniqueInput!): Formation!
  }
`
