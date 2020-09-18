import { gql } from 'apollo-server'
import { DocumentNode } from 'graphql'
import { mutation } from './mutation'

import { query } from './query'
import { types } from './types'

export const typeDefs: DocumentNode = gql`
  ${query}
  ${mutation}
  ${types}
`
