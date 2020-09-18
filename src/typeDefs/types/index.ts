import { gql } from 'apollo-server'

import { userType } from './userType'

export const types = gql`
  ${userType}
`
