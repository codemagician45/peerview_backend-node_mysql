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
