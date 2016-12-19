import User from '../models/User';

class Users {
  static getList() {
    return User.find({}).exec();
  }

  static signup(name, surname, email, password) {
    var user = new User({
      name, surname, email, password
    });

    return user.save();
  }

  static login(email, password, done) {
    var findUser = User.findOne({email: email}).exec();
    var user = {};
    findUser.then((data) => {
      user = data;
      return user.validPassword(password);
    }).then(()=> {
      return done(null, user);
    }, (err)=> {
      return done(null, false, { message: 'Username and password do not match.' });
    });
  }

  static updateMail(id, mail) {
    const getUser = User.findOne({_id: id}).exec();
    return getUser.then((user) => {
      user.mail = mail;
      return user.save();
    });
  }
}

export default Users;
