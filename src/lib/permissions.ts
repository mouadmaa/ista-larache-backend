import { and, rule, shield } from 'graphql-shield'
import { MyContext } from 'src/context'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { request }: MyContext) => {
    return Boolean(request.session.user)
  },
)

// const isAdmin = rule({ cache: 'contextual' })(
//   async (_parent, _args, { req }: MyContext) => {
//     return request.session!.user.role === 'ADMIN'
//   },
// )

// const isTeacher = rule({ cache: 'contextual' })(
//   async (_parent, _args, { req }: MyContext) => {
//     return request.session!.user.role === 'TEACHER'
//   },
// )

export const permissions = shield({
  Query: {
    me: and(isAuthenticated),
  },
})
