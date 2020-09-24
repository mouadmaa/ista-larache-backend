import gql from 'graphql-tag'

export const classType = gql`
  type Class {
    id: String!
    year: Year!
    group: Group!
    modules: [Module!]!
    formation: Formation!
    teacher: User!
  }

  enum Year {
    Premiere
    Deuxieme
  }

  enum Group {
    A B C D E
  }
`
