import gql from 'graphql-tag'

export const activityType = gql`
  type Activity {
    id: String!
    image: String!
    title: String!
    desc:  String!
    date: String!
    creator: String!
    slug: String!
  }

  input ActivityCreateInput {
    image: String!
    title: String!
    desc:  String!
    date: String!
    creator: String!
  }

  input ActivityUpdateInput {
    image: String
    title: String
    desc:  String
    date: String
    creator: String
  }

  input ActivityWhereUniqueInput {
    id: String!
  }
`
