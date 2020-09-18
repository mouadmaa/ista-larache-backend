import gql from 'graphql-tag'

import { authType } from './authType'
import { userType } from './userType'

export const types = gql`
  ${userType}
  ${authType}
`
