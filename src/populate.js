import ScheduleModel from  './models/Schedule';

export default function () {
  const schedules = [
    new ScheduleModel({
      arrival: new Date(2017, 1, 3, 12, 30),
      departure: new Date(2017, 2, 3, 11, 30),
      from: 'CTA',
      to: 'VCE',
      price: 20,
      seats: ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C']
    })
  ];

  ScheduleModel.find({})
    .then(data => {
      if (!data.length) {
        ScheduleModel.insertMany(schedules)
          .then(() => console.log('Default schedules added'))
          .catch(err => console.error('Something went wrong adding ' +
            'default schedules data', err));
      }
    })
}