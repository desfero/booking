import 'babel-polyfill';
import express from 'express';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoStore from 'connect-mongo';
import cors from 'cors';
import config from './config';
import db from './db';
import passport from './middlewares/passport';
import graphql from './middlewares/graphql';
import notFound from './middlewares/notFound';

const port = config.port;
const server = express();

server.set('port', config.port);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// session middleware
const MongoStore = mongoStore(session);
server.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: db.connection})
}));

// enable cors
server.use(cors({
  origin: 'http://127.0.0.1:4200',
  credentials: true
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
