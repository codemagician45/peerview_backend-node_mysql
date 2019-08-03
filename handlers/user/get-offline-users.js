'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User
 */

const lib = require('../../lib');
const moment = require('moment');
const templates = require('../../templates');
const config = require('../../config');
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
  if(!posts && !timelineData) {
    return user;
  }
  if(posts){
    posts.forEach(function (post){
      if(post.question == null){
        postStr += `<span style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:600; margin-bottom:45px;"> ${post.user.name}</span>
        <p style="margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#000; font-size:18px;line-height:27px;width:567px; margin-top:10px;text-align:left;letter-spacing:0.01em;">Posted on July 25, 2019.</p>
        <div style="background:#f9f9f9; border-left: 10px solid #cccccc; padding:2%; margin-left:12px;     margin-top: -22px;">
        <span style="font-family:Arial, Helvetica, sans-serif; color:#000; margin-top:0;font-size:18px;line-height:27px;width:567px;height:330px;text-align:left;letter-spacing:0.01em; "><img src="img-top-email.png" / style="position:relative; top:-15px; left: -5px;"><img src="img1.png" style="position:relative; top:-15px; left: -5px;" />
        ${post.message}.<br /><br /><a href="#" style="color:#000;font-size:18px;text-decoration:underline;" target="_blank" data-saferedirecturl="#">Read more</a></span></div>
        <br>`;
      }else{
        postStr += `h3(style='margin-top:45px;font-family:Arial, Helvetica, sans-serif; color:#320f49; font-size:24px;line-height:27px;width:567px;height:20px;text-align:left;letter-spacing:0.01em; font-weight:600; margin-bottom:36px;')
      | ${post.question}
      br
    p(style='margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#000; font-size:18px;line-height:27px;width:567px;height:40px;text-align:left;letter-spacing:0.01em;')
      img(src='https://marketing-image-production.s3.amazonaws.com/uploads/5ed047d62402c553ec2ccfa44037315b329b54e85308ace14253b09438e477bac4040296b3ade9d2aefc687e947b40f4d3f003fac76a922296d4f4d5342de3bb.jpg', width='50', height='50', style='border-radius:50%; margin-top:10px; margin-right:10px;')
      span(style='font-family:Arial, Helvetica, sans-serif; font-size:25px; font-weight:600; margin-bottom:45px; bottom: 25px;position: relative;')
        | ${post.user.name}
        br
        span(style='margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#999999; font-size:12px;line-height:27px;width:567px; margin-top:10px;text-align:right;letter-spacing:0.01em; margin-left: 65px;    position: relative;\
        top: -5px;') Posted on ${post.createdAt}
    p(style='margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#000; font-size:18px;line-height:27px;width:567px;height:10px;text-align:left;letter-spacing:0.01em;')
    ol(style='color:#333333; font-size:18px;')`;
        postStr += `li Tendency to jumb around in conversation.`;
        postStr += `a(href=loginurl, style='color:#418be2;font-size:18px;text-decoration:none; margin-left:20px; ', target='_blank', data-saferedirecturl='#')
      | Read more
      span(style='font-size: 10px;margin-left: 2px;')
    p`;
      }
    });
  }

  if(timelineData){
    timelineData.forEach(function (timelinepost){
      if(timelinepost.question == null){
        postStr += `<span style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:600; margin-bottom:45px;"> ${timelinepost.user.name}</span>
        <p style="margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#000; font-size:18px;line-height:27px;width:567px; margin-top:10px;text-align:left;letter-spacing:0.01em;">Posted on ${timelinepost.createdAt}.</p>
        <div style="background:#f9f9f9; border-left: 10px solid #cccccc; padding:2%; margin-left:12px;     margin-top: -22px;">
        <span style="font-family:Arial, Helvetica, sans-serif; color:#000; margin-top:0;font-size:18px;line-height:27px;width:567px;height:330px;text-align:left;letter-spacing:0.01em; "><img src="img-top-email.png" / style="position:relative; top:-15px; left: -5px;"><img src="img1.png" style="position:relative; top:-15px; left: -5px;" />
        ${timelinepost.message}.<br /><br /><a href="#" style="color:#000;font-size:18px;text-decoration:underline;" target="_blank" data-saferedirecturl="#">Read more</a></span></div>
        <br>`;
      }else{
        postStr += `h3(style='margin-top:45px;font-family:Arial, Helvetica, sans-serif; color:#320f49; font-size:24px;line-height:27px;width:567px;height:20px;text-align:left;letter-spacing:0.01em; font-weight:600; margin-bottom:36px;')
      | ${timelinepost.question}
      br
    p(style='margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#000; font-size:18px;line-height:27px;width:567px;height:40px;text-align:left;letter-spacing:0.01em;')
      img(src='https://marketing-image-production.s3.amazonaws.com/uploads/5ed047d62402c553ec2ccfa44037315b329b54e85308ace14253b09438e477bac4040296b3ade9d2aefc687e947b40f4d3f003fac76a922296d4f4d5342de3bb.jpg', width='50', height='50', style='border-radius:50%; margin-top:10px; margin-right:10px;')
      span(style='font-family:Arial, Helvetica, sans-serif; font-size:25px; font-weight:600; margin-bottom:45px; bottom: 25px;position: relative;')
        | ${timelinepost.user.name}
        br
        span(style='margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#999999; font-size:12px;line-height:27px;width:567px; margin-top:10px;text-align:right;letter-spacing:0.01em; margin-left: 65px;    position: relative;\
        top: -5px;') Posted on ${timelinepost.createdAt}
    p(style='margin-top:0;font-family:Arial, Helvetica, sans-serif; color:#000; font-size:18px;line-height:27px;width:567px;height:10px;text-align:left;letter-spacing:0.01em;')
    ol(style='color:#333333; font-size:18px;')`;
        postStr += `li Tendency to jumb around in conversation.`;
        postStr += `a(href=loginurl, style='color:#418be2;font-size:18px;text-decoration:none; margin-left:20px; ', target='_blank', data-saferedirecturl='#')
      | Read more
      span(style='font-size: 10px;margin-left: 2px;')
    p`;
      }
    });
  }
  // eslint-disable-next-line no-console
  //console.log('=====>here===>' + postStr);
  let values = {
    email: `${user.email}`,
    username: `${user.name}`,
    loginurl: `${config.frontEnd.baseUrl}/community`,
    posts: postStr
  };
  lib.pug.convert(file, values).then((content) => {
    return lib.email.send(`Offline Posts`, user.email, content);
  });
  // eslint-disable-next-line no-console
}

function getOfflineUsers (req, res, next) {
  let currentDate = moment();
  let endDate = currentDate.format('YYYY-MM-DD');
  let startDate = currentDate.subtract(3, 'days').format('YYYY-MM-DD');
  // eslint-disable-next-line no-console
  console.log(startDate, '===', endDate);
  return req.db.user.findAll({
    attributes: ['id', 'name', 'firstName', 'lastName', 'email', 'last_logging_time', 'email_send_date'],
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
  let endDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
  let startDate = currentDate.subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
  // eslint-disable-next-line no-console
  console.log(startDate, '===', endDate);
  let totalUser = res.user.length;
  res.user.forEach(function (user, index){
    // eslint-disable-next-line no-console
    console.log('date is here ->=>', startDate, endDate);
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
        //limit: 1,
        include: [{
          model: req.db.user,
          as: 'user',
          attributes: ['name', 'id', 'firstName', 'lastName']
        }],
        where: {
          updatedAt: {
            [req.Op.between]: [startDate, endDate],
          }
        }
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
  let endDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
  let startDate = currentDate.subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
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
          }],
          [req.Op.and]: {
            updatedAt: {
              [req.Op.between]: [startDate, endDate],
            }
          }
        },
        group: ['post.id', 'post.userId'],
        order: [['createdAt', 'DESC']],
        //limit: 1,
        include: [{
          model: req.db.user,
          as: 'user',
          attributes: ['name', 'id', 'firstName', 'lastName'],
        },
        {
          model: req.db.postPollOption,
          as: 'postPollOption',
          attributes: ['name', 'id'],
        }
        ],
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
      user.email_send_date = currentDate;
      //eslint-disable-next-line no-console
      console.log(':::here');
      user.save().then(() => {
        if(totalUser == index + 1){
          next();
        }
      });
      //next();
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
