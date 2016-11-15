import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from 'graphql';
import {
    GraphQLDateTime
} from 'graphql-custom-types';
import { GraphQLError } from 'graphql/error';

import Bookings from '../lib/bookings';
const bookings = new Bookings();

const bookingType = new GraphQLObjectType({
    name: 'Booking',
    description: 'Representation of booking.',
    fields: () => ({
        _id: {
            description: 'Booking unique id.',
            type: GraphQLID
        },
        departure: {
            description: 'Booking departure date.',
            type: GraphQLDateTime
        },
        arrival: {
            description: 'Booking arrival date.',
            type: GraphQLDateTime
        },
        from: {
            description: 'Booking departure station.',
            type: GraphQLString
        },
        to: {
            description: 'Booking arrival station.',
            type: GraphQLString
        },
        //firstPassenger: {
        //    description: 'Unique username.',
        //    type: ObjectId
        //},
    })
});

const _list = {
    description: 'Information about all bookings.',
    type: new GraphQLList(bookingType),
    resolve() {
        return bookings.getList();
    }
};

export const bookingListField = _list;
