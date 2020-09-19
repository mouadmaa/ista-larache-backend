import gql from 'graphql-tag'

import { userType } from './userType'

export const types = gql`
  ${userType}
`
