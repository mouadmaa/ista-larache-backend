import { userQueries, userMutations } from './userResolvers'
import { formationQueries, formationMutations, formationRes } from './formationResolvers'
import { moduleQueries, moduleMutations, moduleRes } from './moduleResolvers'
import { classQueries, classMutations, classRes } from './classResolvers'
import { studentQueries, studentMutations, studentRes } from './studentResolvers'
import { noteQueries, noteMutations, noteRes } from './noteResolvers'

export const resolvers = {
  Query: {
    ...userQueries,
    ...formationQueries,
    ...moduleQueries,
    ...classQueries,
    ...studentQueries,
    ...noteQueries,
  },
  Mutation: {
    ...userMutations,
    ...classMutations,
    ...moduleMutations,
    ...formationMutations,
    ...studentMutations,
    ...noteMutations,
  },
  Formation: { ...formationRes },
  Module: { ...moduleRes },
  Class: { ...classRes },
  Student: { ...studentRes },
  Note: { ...noteRes },
}
