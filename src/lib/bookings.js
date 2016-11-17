import Booking from '../models/Booking';

class Bookings {
    getList() {
        return Booking.find({}).populate('firstPassenger').exec();
    }
}

export default Bookings;
