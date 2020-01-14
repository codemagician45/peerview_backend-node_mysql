const lib = require('../../lib');

function getUsers (req, res, next) {
  let courseId = req.params.courseId;
  const dataBaseTable = process.env.PEERSVIEW_DATABASE || 'peersview';
  return req.db.userCourse.sequelize.query(`SELECT UC.id as userCourseId, UC.courseId as courseId, 
   U.id as id, U.firstName as firstName, U.lastName as lastName, U.email as email, U.schoolName as schoolName,
   U.profilePicture as profilePicture, U.socialImage as socialImage FROM ${dataBaseTable}.user_course as UC, 
    ${dataBaseTable}.user as U WHERE UC.userId = U.id and UC.courseId = ${courseId}`,
  { type: req.db.userCourse.sequelize.QueryTypes.SELECT})
  .then(users => {
    req.$scope.courseUsers = users;
    next();
    return users;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'getUsersSearchViaCourseId.findAll Error - get-users-search-via-course-id');
  });
}
module.exports.getUsers = getUsers;