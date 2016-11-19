import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
  firstPassenger: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    otherPassengers: [{
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }]
});

export default mongoose.model('Booking', BookingSchema);
