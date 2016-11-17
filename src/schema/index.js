import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
  selfField,
  userListField,
  userSignupField,
  userUpdateMailField
} from './users';

import {
    bookingListField
} from './bookings';

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root for query operations.',
  fields: () => ({
    self: selfField,
    users: userListField,
    bookings: bookingListField
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root for mutation operations.',
  fields: () => ({
    signup: userSignupField,
    updateEmail: userUpdateMailField
  })
});

export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
