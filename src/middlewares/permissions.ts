import { rule, shield } from 'graphql-shield'

import { MyContext } from 'src/context'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, { user }: MyContext) => {
    return Boolean(user)
  },
)

const isAdmin = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, { user }: MyContext) => {
    return user?.role === 'ADMIN'
  },
)

const isTeacher = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, { user }: MyContext) => {
    return user?.role === 'TEACHER'
  },
)

export const permissions = shield(
  {
    Query: {
      users: isTeacher,
      me: isAuthenticated,
    },
    Mutation: {
      register: isAdmin,
      logout: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  }
)
