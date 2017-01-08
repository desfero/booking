import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  arrival: {type: Date, required: true},
  departure: {type: Date, required: true},
  from: {type: String, required: true},
  to: {type: String, required: true},
  price: {type: Number, required: true},
  seats: [{type: String}]
});

export default mongoose.model('Schedule', ScheduleSchema);