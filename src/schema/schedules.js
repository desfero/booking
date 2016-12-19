import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';
import {
  GraphQLDateTime
} from 'graphql-custom-types';

import Schedules from '../lib/shedules';

const scheduleType = new GraphQLObjectType({
  name: 'Schedule',
  description: 'Representation of flight schedule.',
  fields: () => ({
    _id: {
      description: 'Schedule unique id.',
      type: GraphQLID
    },
    departure: {
      description: 'Schedule departure date.',
      type: GraphQLDateTime
    },
    arrival: {
      description: 'Schedule arrival date.',
      type: GraphQLDateTime
    },
    from: {
      description: 'Schedule departure station.',
      type: GraphQLString
    },
    to: {
      description: 'Schedule arrival station.',
      type: GraphQLString
    }
  })
});

const list = {
  description: 'Information about all schedules.',
  type: new GraphQLList(scheduleType),
  resolve() {
    return Schedules.getList();
  }
};

export { scheduleType as default, list }
