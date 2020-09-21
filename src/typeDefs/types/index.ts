import gql from 'graphql-tag'
import { formationType } from './formationType'

import { userType } from './userType'

export const types = gql`
  ${userType}
  ${formationType}
`
