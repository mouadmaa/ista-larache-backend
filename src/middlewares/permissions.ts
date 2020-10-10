import { rule, shield } from 'graphql-shield'

import { MyContext } from '../context'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, { request }: MyContext) => {
    return Boolean(request.session.user)
  },
)

const isAdmin = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, { request }: MyContext) => {
    return request.session.user?.role === 'ADMIN'
  },
)

// const isTeacher = rule({ cache: 'contextual' })(
//   async (_parent: any, _args: any, { request }: MyContext) => {
//     return request.session.user?.role === 'TEACHER'
//   },
// )

export const permissions = shield(
  {
    Query: {
      users: isAuthenticated,
      me: isAuthenticated,
    },
    Mutation: {
      register: isAdmin,
      logout: isAuthenticated,
      deleteUser: isAdmin,
      createFormation: isAdmin,
      updateFormation: isAdmin,
      deleteFormation: isAdmin,
    },
  },
  {
    allowExternalErrors: true,
  }
)
