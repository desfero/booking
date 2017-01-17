import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
  GraphQLInt,
    GraphQLID
} from 'graphql';
import {
    GraphQLDateTime
} from 'graphql-custom-types';

//import userType from './users';
import scheduleType from './schedules';
import Bookings from '../lib/bookings';
import Schedules from '../lib/shedules';

const bookingType = new GraphQLObjectType({
  name: 'Booking',
  description: 'Representation of booking.',
  fields: () => ({
    _id: {
      description: 'Booking unique id.',
      type: GraphQLID
    },
    schedule: {
      description: 'Booking schedule.',
      type: scheduleType
    },
    adults: {
      description: 'Number of adults',
      type: GraphQLInt
    },
    childrens: {
      description: 'Number of childrens',
      type: GraphQLInt
    },
    infants: {
      description: 'Number of infants',
      type: GraphQLInt
    },
    seats: {
      description: 'Selected seats',
      type: new GraphQLList(GraphQLString)
    }
  })
});

const list = {
  description: 'Information about all bookings.',
  type: new GraphQLList(bookingType),
  resolve() {
    return Bookings.getList();
  }
};

const create = {
  description: 'Create new booking',
  type: bookingType,
  args: {
    schedule: {
      description: 'Selected schedule id.',
      type: GraphQLID
    },
    adults: {
      description: 'Number of adults',
      type: GraphQLInt
    },
    childrens: {
      description: 'Number of childrens',
      type: GraphQLInt
    },
    infants: {
      description: 'Number of infants',
      type: GraphQLInt
    },
    seats: {
      description: 'Selected seats',
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve(root, args) {
    Schedules.removeSeats(args.schedule, args.seats);

    return Bookings.addNew(args);
  }
};

export {
  list,
  create
};