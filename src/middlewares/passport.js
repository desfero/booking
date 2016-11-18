import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import Users from './../lib/users';

const LocalStrategy = passportLocal.Strategy;
const router = express.Router();

passport.use(new LocalStrategy(
  function(username, password, done) {
    const users = new Users();
    users.login(username, password, done);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default [
  passport.initialize(),
  passport.session(),
  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.sendStatus(200);
  }),
  router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
  })
];