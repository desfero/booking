import Schedule from '../models/Schedule';

class Schedules {
  static getList() {
    return Schedule.find().exec();
  }
}

export default Schedules;
