import ScheduleModel from  './models/Schedule';

export default function () {
  const schedules = [
    new ScheduleModel({
      arrival: new Date(2017, 1, 3, 12, 30),
      departure: new Date(2017, 2, 3, 11, 30),
      from: 'CTA',
      to: 'VCE'
    })
  ]
}