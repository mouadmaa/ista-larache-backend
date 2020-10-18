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

export const permissions = shield(
  {
    Query: {
      // User Queries
      users: isAdmin,

      // Student Queries
      student: isAuthenticated,
      students: isAuthenticated,

      // Note Queries
      notes: isAuthenticated,
    },
    Mutation: {
      // User Mutations
      register: isAdmin,
      deleteUser: isAdmin,

      // Formation Mutations
      createFormation: isAdmin,
      updateFormation: isAdmin,
      deleteFormation: isAdmin,

      // Module Mutations
      createModule: isAdmin,
      updateModule: isAdmin,
      deleteModule: isAdmin,

      // Class Mutations
      createClass: isAdmin,
      updateClass: isAdmin,
      deleteClass: isAdmin,

      // Student Mutations
      createStudent: isAuthenticated,
      updateStudent: isAuthenticated,
      deleteStudent: isAuthenticated,

      // Note Mutations
      createNote: isAuthenticated,
      updateNote: isAuthenticated,
      deleteNote: isAuthenticated,

      // Activity Mutations
      createActivity: isAuthenticated,
      updateActivity: isAuthenticated,
      deleteActivity: isAuthenticated,
    },
    // Module
    Module: {
      notes: isAuthenticated,
    },
    // Class
    Class: {
      teacher: isAuthenticated,
      students: isAuthenticated,
    },
    // Note
    Note: {
      student: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  },
)
