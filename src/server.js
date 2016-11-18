import 'babel-polyfill';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoStore from 'connect-mongo';
import config from './config';
import passport from './middlewares/passport';
import graphql from './middlewares/graphql';
import notFound from './middlewares/notFound';

const port = config.port;
const server = express();

mongoose.connect(config.mongoDB);

server.set('port', config.port);
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// session middleware
const MongoStore = mongoStore(session);
server.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passport middleware
server.use(passport);

// graphql middleware
server.use(graphql);

// notFound middleware
server.use(notFound);

server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
});
