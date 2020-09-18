import { gql } from 'apollo-server'
import { authType } from './authType'

import { userType } from './userType'

export const types = gql`
  ${userType}
  ${authType}
`
