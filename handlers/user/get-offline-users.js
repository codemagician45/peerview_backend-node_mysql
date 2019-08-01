'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User
 */

const lib = require('../../lib');
const pug = require('pug');
const moment = require('moment');
const templates = require('../../templates');
/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */

function sendEmail (user, res) {
// let user_id = res.user.id;
// let email = res.user.email;
// let file = templates.userOfflinePosts;
  // eslint-disable-next-line no-console
  console.log('final user ->', user);
  let file = templates.emailPosts;
  let postStr = ``;
  let posts = user.getDataValue('posts');
  let timelineData = user.getDataValue('timelinePosts');
  //if(timelineData){
  // timelineData.forEach(function(timelinepost,index){
  postStr += `span(style='font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:600; margin-bottom:45px;')  
      p(style='margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#000; font-size:18px;line-height:27px;width:567px; margin-top:10px;text-align:left;letter-spacing:0.01em;') Posted on July 25, 2019.
      div(style='background:#f9f9f9; border-left: 10px solid #cccccc; padding:2%; margin-left:12px;     margin-top: -22px;')
        span(style='font-family:Arial, Helvetica, sans-serif; color:#000; margin-top:0;font-size:18px;line-height:27px;width:567px;height:330px;text-align:left;letter-spacing:0.01em; ')
          img(src='img1.png', style='position:relative; top:-15px; left: -5px;')
          img(src='img1.png', style='position:relative; top:-15px; left: -5px;')
          
          | timeline
          
          br
          
          br
          a(href='#', style='color:#000;font-size:18px;text-decoration:underline;', target='_blank', data-saferedirecturl='#') Read more>>

      br`;
  //});
  // }
  postStr = `h3 testing`;
  // eslint-disable-next-line no-console
  console.log('=====>here===>' + postStr);
  let values = {
    email: `sanjeev.nyxa@gmail.com`,
    username: `Sanjeev`,
    posts: postStr
  };
  let content = pug.compileFile(file, values);
  // eslint-disable-next-line no-console
  console.log(content);
  return lib.email.send(`Offline Posts`, 'sanjeev.nyxa@gmail.com', content);
}

function getOfflineUsers (req, res, next) {
  let currentDate = moment();
  let endDate = currentDate.format('YYYY-MM-DD');
  let startDate = currentDate.subtract(3, 'days').format('YYYY-MM-DD');
  // eslint-disable-next-line no-console
  console.log(startDate, '===', endDate);
  return req.db.user.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'last_logging_time', 'email_send_date'],
    where: {

      [req.Op.and]: {
        last_logging_time: {
          [req.Op.lte]: startDate,
        },
        [req.Op.or]: [{
          email_send_date: {
            [req.Op.eq]: null
          }
        }, {
          email_send_date: {
            [req.Op.lte]: startDate
          }
        }]

      }

    },
    limit: 5,
    // offset: !offset ? 0 : parseInt(offset),
    // limit: !limit ? 10 : parseInt(limit)
  })
  .then(user => {
    if(user.length == 0){
      return res.send(200, {
        status: 'ERROR',
        status_code: 0,
        http_code: 200,
      });
    }else{
      res.user = user;
      next();
    }
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - getOfflineUsers');
  });
}

function getPosts (req, res, next) {
  // return userId;
  let currentDate = moment();
  let endDate = currentDate;
  let startDate = currentDate.subtract(3, 'days');
  let totalUser = res.user.length;
  res.user.forEach(function (user, index){
    // eslint-disable-next-line no-console
    console.log('id=>', user.id, index);
    if(user.id){
      let posts = [];

      const sequelize = req.db.postv1.sequelize;
      const colRating = sequelize.col('rating');
      const colAVG = sequelize.fn('AVG', colRating);


      return req.db.postv1.findAll({
        attributes: [
          'id',
          'message',
          'title',
          'description',
          'question',
          'duration',
          'expiration',
          [sequelize.where(sequelize.col('postv1.userId'), user.id), 'isPostUser'],
          // [sequelize.where(sequelize.col('postv1.sharePostId'), userId), //check this if it is working or not
          //   'isUserPostShare'],
          // [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
          // [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('share.id'))), 'shareCount'],
          // //[sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('rating.id'))), 'likeCount'],
          // [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('countReplyVirtual.id'))), 'replyCount'],
        ],
        limit: 1,
        include: [{
          model: req.db.user,
          as: 'user',
          attributes: ['name', 'id', 'firstName', 'lastName']
        }],
        where: {

          [req.Op.and]: {
            updatedAt: {
              [req.Op.between]: [startDate, endDate],
            }

          }}

      })
      .then((timelineData) => {
        res.user[index].setDataValue('posts', timelineData);

        if(totalUser == index + 1){
          next();
        }
      })
      .catch(error => {
        req.log.error({
          error: error
        }, 'handlers.post get-post-list-v1 [postv1.findAll] Error');

        return res.status(lib.httpCodes.SERVER_ERROR)
        .send(new lib.rpc.InternalError(error));
      });
    }
  });
}


function getTimelinePosts (req, res, next) {
  // return userId;
  let currentDate = moment();
  let endDate = currentDate;
  let startDate = currentDate.subtract(3, 'days');
  let totalUser = res.user.length;
  return res.user.forEach(function (user, index){
    // eslint-disable-next-line no-console
    console.log('id=>', user.id, index);
    if(user.id){
      let posts = [];
      req.db.post.findAll({
        attributes: {
          include: [
            'id',
            'message',
            'title',
            'createdAt',
          ]
        },
        where: {
          postTo: {
            [req.Op.eq]: null
          },
          [req.Op.or]: [{
            pollExpiration: {
              [req.Op.eq]: null
            }
          }, {
            pollExpiration: {
              [req.Op.gt]: moment()
            }
          }]
        },
        group: ['post.id', 'post.userId'],
        order: [['createdAt', 'DESC']],
        limit: 1,
        include: [{
          model: req.db.user,
          as: 'user',
          attributes: ['name', 'id', 'firstName', 'lastName'],
        }],
        subQuery: false,
      })
      .then((timelineData) => {
        res.user[index].setDataValue('timelinePosts', timelineData);

        if(totalUser == index + 1){
          next();
        }
      })
      .catch(error => {
        req.log.error({
          error: error
        }, 'handlers.post get-post-list-v1 [postv1.findAll] Error');

        return res.status(lib.httpCodes.SERVER_ERROR)
        .send(new lib.rpc.InternalError(error));
      });
    }
  });
}

function sendMail (req, res, next) {
  let totalUser = res.user.length;
  let currentDate = moment();
  currentDate = currentDate.format('YYYY-MM-DD');
  return res.user.forEach(function (user, index){
    // eslint-disable-next-line no-console
    console.log('id=>', user.id, index);
    if(user.id){
      //send mail here
      //if mail true
      sendEmail(user, res);
      //user.email_send_date = currentDate;
      // eslint-disable-next-line no-console
      console.log(':::here');
      user.save().then(() => {
        if(totalUser == index + 1){
          next();
        }
      });
    }
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let user = res.user;
  let body = {
    date: moment(),
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: user,
  };

  res.status(200).send(body);
}

module.exports.getUser = getOfflineUsers;
module.exports.getUserPosts = getPosts;
module.exports.getUserTimelinePosts = getTimelinePosts;
module.exports.sendMail = sendMail;
module.exports.response = response;
