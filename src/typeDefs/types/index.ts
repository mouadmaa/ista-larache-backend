import gql from 'graphql-tag'

import { userType } from './userType'
import { formationType } from './formationType'
import { moduleType } from './moduleType'
import { classType } from './classType'
import { studentType } from './studentType'
import { noteType } from './noteType'

export const types = gql`
  ${userType}
  ${formationType}
  ${moduleType}
  ${classType}
  ${studentType}
  ${noteType}
`
