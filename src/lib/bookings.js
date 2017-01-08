import Booking from '../models/Booking';

class Bookings {
  static getList() {
    return Booking.find({}).populate('firstPassenger').exec();
  }
}

export default Bookings;
