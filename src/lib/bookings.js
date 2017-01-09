import Booking from '../models/Booking';

class Bookings {
  static getList() {
    return Booking.find({}).populate('firstPassenger').exec();
  }

  static addNew(booking) {
    return Booking.create(booking);
  }
}

export default Bookings;
