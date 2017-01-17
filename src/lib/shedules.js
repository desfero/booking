import Schedule from '../models/Schedule';

class Schedules {
  static getList() {
    return Schedule.find().exec();
  }

  static removeSeats(id, seats) {
    Schedule.findById(id, function (err, schedule) {
      schedule.seats = schedule.seats.filter(s => !seats.includes(s));
      schedule.save();
    });
  }
}

export default Schedules;
