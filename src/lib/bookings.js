import Booking from '../models/Booking';

class Bookings {
  static getList() {
    return Booking.find({}).populate('schedule').exec();
  }

  static addNew(booking) {
    return Booking.create(booking);
  }
}

export default Bookings;
