import mongoose from 'mongoose';
import populate from './populate';
import config from './config';

// change Promise library to global one
mongoose.Promise = global.Promise;

// connect to mongodb
mongoose.connect(config.mongoDB);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.mongoDB);

  // populate model with default data if empty
  populate();
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export default {
  connection: mongoose.connection
};