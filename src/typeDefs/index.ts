import gql from 'graphql-tag'

import { mutation } from './mutation'
import { query } from './query'
import { types } from './types'

export const typeDefs = gql`
  ${query}
  ${mutation}
  ${types}
`
