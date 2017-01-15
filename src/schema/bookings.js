import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from 'graphql';
import {
    GraphQLDateTime
} from 'graphql-custom-types';

import userType from './users';
import scheduleType from './schedules';
import Bookings from '../lib/bookings';

const passengerType = new GraphQLObjectType({
  name: 'Passenger',
  description: 'Representation of booking passenger.',
  fields: () => ({
    firstName: {
      description: 'Passenger first name',
      type: GraphQLString
    },
    lastName: {
      description: 'Passenger last name',
      type: GraphQLString
    }
  })
});

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
    firstPassenger: {
      description: 'Booking holder.',
      type: userType
    },
    otherPassengers: {
      description: 'Passenger without booking holder (firstPassenger)',
      type: new GraphQLList(passengerType)
    },
    selectedSeats: {
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
    }
  },
  resolve(root, args) {
    console.log(args);
    //return Bookings.addNew(args);
  }
};

export {
  list,
  create
};