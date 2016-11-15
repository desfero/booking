import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    departure: { type: Date, required: true },
    arrival: { type: Date, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    firstPassenger: { type: Schema.Types.ObjectId, ref: 'User' },
    otherPassengers: [{
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }]
});

export default mongoose.model('Booking', BookingSchema);
