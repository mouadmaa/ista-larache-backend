import gql from 'graphql-tag'

import { userType } from './userType'
import { formationType } from './formationType'
import { moduleType } from './moduleType'
import { classType } from './classType'

export const types = gql`
  ${userType}
  ${formationType}
  ${moduleType}
  ${classType}
`
