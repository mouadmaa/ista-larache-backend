import { and, rule, shield } from 'graphql-shield'
import { MyContext } from 'src/context'
import { getUser } from '../utils/getUser'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { request }: MyContext) => {
    return Boolean(getUser(request).userId)
  },
)

// const isAdmin = rule({ cache: 'contextual' })(
//   async (_parent, _args, { req }: MyContext) => {
//     return getUser(req).role === 'ADMIN'
//   },
// )

// const isTeacher = rule({ cache: 'contextual' })(
//   async (_parent, _args, { req }: MyContext) => {
//     return getUser(req).role === 'TEACHER'
//   },
// )

export const permissions = shield({
  Query: {
    me: and(isAuthenticated),
  },
})
