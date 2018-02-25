// login credentials peersview site
// u:gabriel@peersview.com
// p:Arsenal-40

// login credentials go-daddy
// u:Gafar_Ade
// p:Arsenal-40

// login credentials cloudinary
// u: ITdesk@peersview.com
// p: Peersview-40

// login credentials aws
// u: gabriel@peersview.com
// p: Arsenal-40

// peersview dev eb
// u: peersview-dev/peersview_dev
// p: peersview-dev

// peersview db
// u: peersviewDev
// p: peersview-dev

// login credentials for sendGrid
// u: Peersview.com
// p: Peersview-40
// api key: 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

// email of gabriel
// email: adekunle.amodu@yahoo.co.uk

// email templates
// https://docs.google.com/document/d/15GSE-QCkwsCR21LQoeFN9aNHVeZKlM5lyEJrxqXL9L8/edit?ts=5a303198

// api docs covered by phalecs
// https://docs.google.com/document/d/1dAky8wpdF_kqqNcth7_ld0GLf59PEhGpzO2GydZhH24/edit

// @bug to fix in db
// SELECT @@sql_mode;
// SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
// set global sql_mode='data_here'

// It's according to how you register. If you register as an undergraduate student, studying Biology
// You automatically should find yourself in the undergraduate section of the community and in the Biology Timeline
// You can now navigate all the courses within the undergraduate section
// But as an undergraduate student you can't post in the postgraduate section
// And viseversa
// So each study level works like this:
// Post secondary: General community & Courselist
//
// Undergraduate: General community & Courselist
//
// Postgraduate:General community & Courselist
// So they are separate sections in the community

// Search engine
// Create private community
// Events -create events, book tickets
// Top stories -News scrapper
// Registration for the campus

// animations: [
//   trigger('ngIfAnimation', [
//     transition('* => *', [ // each time the binding value changes
//       query(':leave', [
//         stagger(100, [
//           animate('0.5s', style({ opacity: 0 }))
//         ])
//       ], { optional: true }),
//       query(':enter', [
//         style({ opacity: 0 }),
//         stagger(100, [
//           animate('0.5s', style({ opacity: 1 }))
//         ])
//       ], { optional: true })
//     ])
//   ])
// ]
  // animations: [
//   trigger('ngIfAnimation', [
//     transition('* => *', [ // each time the binding value changes
//       query(':leave', [
//         stagger(100, [
//           animate('0.5s', style({ opacity: 0 }))
//         ])
//       ], { optional: true }),
//       query(':enter', [
//         style({ opacity: 0 }),
//         stagger(100, [
//           animate('0.5s', style({ opacity: 1 }))
//         ])
//       ], { optional: true })
//     ])
//   ])
// ]
  // animations: [
  // trigger('ngIfAnimation', [
  //     transition('void => *', [
  //         // query('*', style({ opacity: 0, background: 'blue' }), {optional: true}),
  //         query('.ngIfAnimation', stagger('300ms', [
  //             animate('0.8s ease-in', keyframes([
  //                 style({opacity: 0, offset: 0}),
  //                 style({opacity: .5,offset: 0.3}),
  //                 style({opacity: 1, offset: 1.0}),
  //                 ]))]), {optional: true}),
  //         ]),
  //     transition('* => void', [
  //         // query('*', style({ opacity: 1, background: 'red' }), {optional: true}),
  //         query('.ngIfAnimation', stagger('300ms', [
  //             animate('0.8s ease-out', keyframes([
  //                 style({opacity: 1, offset: 0}),
  //                 style({opacity: .5, offset: 0.3}),
  //                 style({opacity: 0, offset: 1.0}),
  //                 ]))]), {optional: true}),
  //         ])
  //     ])
  // ]
let db = require(__dirname + '/lib/db');

return db.models.course.findAll({
  include: [{
    model: db.models.courseClasses,
  }, {
    model: db.models.community,
    include: [{
      model: db.models.userCommunity
    }]
  }]
})
.then(function (result) {
  console.log(result[0].community.userCommunities);
})
.catch(error => {
  console.log(error);
})
