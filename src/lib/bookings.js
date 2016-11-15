import Booking from '../models/Booking';

class Bookings {
    getList() {
        return Booking.find({}).exec();
    }
}

export default Bookings;
