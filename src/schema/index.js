import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import * as users from './users';
import * as bookings from './bookings';
import * as schedules from './schedules';

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root for query operations.',
  fields: () => ({
    self: users.self,
    users: users.list,
    bookings: bookings.list,
    schedules: schedules.list
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root for mutation operations.',
  fields: () => ({
    signup: users.signup,
    updateEmail: users.updateMail,
    createBooking: bookings.create
  })
});

export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
