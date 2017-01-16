import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  adults: {
    type: Number,
    required: true
  },
  childrens: {
    type: Number,
    required: true
  },
  infants: {
    type: Number,
    required: true
  },
  seats: [{type: String, required: true}]

});

export default mongoose.model('Booking', BookingSchema);
