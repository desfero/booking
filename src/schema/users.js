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

const users = new Users();

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'Representation of public user data.',
  fields: () => ({
    _id: {
      description: 'Unique user id.',
      type: GraphQLID
    },
    username: {
      description: 'Unique username.',
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
    mail: {
      description: 'Optional E-Mail address.',
      type: GraphQLEmail
    }
  })
});

const _self = {
  description: 'Information about the currently logged in user.',
  type: userType,
  resolve(root, _) {
    if(root.session.passport) {
      return root.session.passport.user;
    }
    throw new GraphQLError('Query error: Not logged in');
  }
};

const _list = {
  description: 'Information about all users.',
  type: new GraphQLList(userType),
  resolve(root, _) {
    return users.getList();
  }
};

const _updateMail = {
  description: 'Update mail address of the currently logged in user.',
  type: userType,
  args: {
    mail: {
      description: 'Non empty, valid E-Mail address.',
      type: GraphQLEmail
    }
  },
  resolve(root, _) {
      if(root.session.passport) {
      return users.updateMail(root.session.passport.user._id, _.mail);
    }
    throw new GraphQLError('Query error: Not logged in');
  }
};

const _signup = {
  description: 'Register a new user account. Returns newly created user or null if username is taken.',
  type: userType,
  args: {
    username: {
      description: 'Username for new account.',
      type: GraphQLString
    },
    password: {
      description: 'Password for new account.',
      type: new GraphQLPassword(6)
    }
  },
  resolve(root, args) {
    return users.signup(args.username, args.password);
  }
};

export default userType;
export const selfField = _self;
export const userListField = _list;
export const userUpdateMailField = _updateMail;
export const userSignupField = _signup;
