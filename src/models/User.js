import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  password: { type: String, required: true },
  email: {type: String, required: true, index: {unique: true}},
  createdAt: { type: Date },
  updatedAt: {type: Date}
});

UserSchema.set('toJSON', { virtuals: true, getters: true });
UserSchema.set('toObject', { virtuals: true, getters: true });
UserSchema.pre('save', function(next) {
  var user = this;

  user.updatedAt = new Date();

  if(!user.isModified('password')) return next();
  bcrypt.genSalt(null, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, match) {
      if (err) reject(err);
      (match) ? resolve() : reject('Passwords do not match');
    });
  });
};
export default mongoose.model('User', UserSchema);
