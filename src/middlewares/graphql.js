import express from 'express';
import graphqlHTTP from 'express-graphql';
import { Schema } from '../schema';

const router = express.Router();

export default [
  router.use('/graphql', graphqlHTTP(request => ({
     schema: Schema,
     rootValue: {session: request.session},
     graphiql: true
  })))
];

