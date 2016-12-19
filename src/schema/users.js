import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';
import {
  GraphQLEmail,
  GraphQLPassword,
  GraphQLDateTime
} from 'graphql-custom-types';
import { GraphQLError } from 'graphql/error';
import Users from '../lib/users';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'Representation of public user data.',
  fields: () => ({
    _id: {
      description: 'Unique user id.',
      type: GraphQLID
    },
    name: {
      description: 'User name.',
      type: GraphQLString
    },
    surname: {
      description: 'User surname.',
      type: GraphQLString
    },
    createdAt: {
      description: 'Time of user creation.',
      type: GraphQLDateTime
    },
    updatedAt: {
      description: 'Time of last user update.',
      type: GraphQLDateTime
    },
    email: {
      description: 'E-Mail address.',
      type: GraphQLEmail
    }
  })
});

const self = {
  description: 'Information about the currently logged in user.',
  type: userType,
  resolve({ session }) {
    if (session.passport) {
      return session.passport.user;
    }

    return null;
  }
};

const list = {
  description: 'Information about all users.',
  type: new GraphQLList(userType),
  resolve(root, _) {
    return Users.getList();
  }
};

const updateMail = {
  description: 'Update mail address of the currently logged in user.',
  type: userType,
  args: {
    email: {
      description: 'Non empty, valid E-Mail address.',
      type: GraphQLEmail
    }
  },
  resolve(root, _) {
    if (root.session.passport) {
      return Users.updateMail(root.session.passport.user._id, _.email);
    }
    throw new GraphQLError('Query error: Not logged in');
  }
};

const signup = {
  description: 'Register a new user account. Returns newly created user or null if email is taken.',
  type: userType,
  args: {
    name: {
      description: 'User name for new account.',
      type: GraphQLString
    },
    surname: {
      description: 'Surname for new account.',
      type: GraphQLString
    },
    email: {
      description: 'Email for new account.',
      type: GraphQLEmail
    },
    password: {
      description: 'Password for new account.',
      type: new GraphQLPassword(6)
    }
  },
  resolve(root, args) {
    return Users.signup(args.name, args.surname, args.email, args.password);
  }
};

export {
  userType as default,
  self,
  list,
  updateMail,
  signup
};