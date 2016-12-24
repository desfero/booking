import ScheduleModel from  './models/Schedule';

export default function () {
  const schedules = [
    new ScheduleModel({
      arrival: new Date(2017, 1, 3, 12, 30),
      departure: new Date(2017, 2, 3, 11, 30),
      from: 'CTA',
      to: 'VCE'
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