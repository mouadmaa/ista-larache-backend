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

  type ActivitiesMeta {
    count: Int!
  }

  input ActivityCreateInput {
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

  input ActivityWhereInput {
    id: String
    title: String
    slug: String
  }

  enum Sort {
    asc
    desc
  }

  input ActivityOrderByInput {
    title: Sort
    date: Sort
  }

`
