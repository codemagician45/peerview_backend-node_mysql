var utils = require('../common/utils');
var emailtemplate = require('../common/emailtemplate');
var path = require('path');
var email = require('../common/email');
var emailReminder = require('../common/emailPromise');
var url = require('url');
var CronJob = require('cron').CronJob;

module.exports.routes = function(router, routeValidator, mysql, connection, md5, randomstring, Email) {

     router.post("/invitebyemail", routeValidator.validate({
        body: {
            'email': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT * FROM ??  WHERE ?? = ?";
                var table = ["users", "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        //console.log(rows);
                        var sender_name = rows[0].first_name;
                        // var query = "SELECT first_name FROM ??  WHERE ?? = ?";
                        // var table = ["users", "email", req.body.email];
                        // query = mysql.format(query, table);
                        // connection.query(query, function(err, resp) {
                        //let reciever_name = resp[0].first_name
                        let hostname = req.headers.host;
                        let link = "http://" + hostname;
                        utils.convertPug(path.join(__dirname, '../templates/invitation.pug'), { name: sender_name,reciever_name:"",link: link })
                            .then(content => {
                                email.send(res, req.body.email, 'Invitation', content);
                                res.json({ "error": false, "Message": "Invite sent successfully" });
                            })
                            .catch(err => console.log(err));
                        return false;

                    //});
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    router.get("/searchInvite/:string", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT first_name, last_name, email, propic FROM ??  WHERE ?? like '" + req.params.string + "%'";
                var table = ["users", "first_name"];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Invitaion users", "rows": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    router.post("/invitebyemail/group", routeValidator.validate({
        body: {
            'emails': { isRequired: true },
            'groupId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT * FROM ??  WHERE ?? = ?";
                var table = ["users", "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        var query = "SELECT * FROM ??  WHERE ?? = ?";
                        var table = ["groups", "groupId", req.body.groupId];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, group) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query" });
                            } else if(group.length <= 0){
                              res.json({ "error": true, "Message": "group not found" });
                              return false;
                          }else {
                                let emailstring = req.body.emails;
                                let emails = emailstring.split(',');
                                let groupname = group[0].name;
                                emails.forEach((node, index) => {
                                   var query = "SELECT first_name FROM ??  WHERE ?? = ?";
                                   var table = ["users", "email", node];
                                   query = mysql.format(query, table);
                                   connection.query(query, function(err, userName) {
                                     if (err) {
                                       res.json({ "error": true, "Message": "Error executing MySQL query" });
                                   } else if(userName.length <= 0){
                                      res.json({ "error": true, "Message": "email id Not Found" });
                                   }else{
                                     let hostname = req.headers.host;
                                     let link = "http://" + hostname;
                                     utils.convertPug(path.join(__dirname, '../templates/invitationCourse.pug'), { username: userName[0].first_name, name: rows[0].first_name, link: link, groupname: groupname })
                                         .then(content => {
                                             email.send(res, node, 'Invitation', content);
                                             if (index == emails.length - 1) {
                                               res.on('end', function(){
                                                 ({ "error": false, "Message": "invite send successfully" });
                                               })
                                             }
                                         })
                                         .catch((error) => {
                                          console.log(error,"error");
                                       })
                                     }
                                   });
                                  });
                                }
                              });
                            }
                         });
                    } else {
                      res.json({ "error": true, "Messages": 'Invalid Token!' });
                  }
               });
            });

    router.post("/invitebyemail/forum", routeValidator.validate({
        body: {
            'emails': { isRequired: true },
            'forumId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT * FROM ??  WHERE ?? = ?";
                var table = ["users", "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                         return res.send({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        var query = "SELECT * FROM ??  WHERE ?? = ?";
                        var table = ["forumDetails", "forumDetails_Id", req.body.forumId];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, forum) {
                            if (err) {
                              return  res.json({ "error": true, "Message": "Error executing MySQL query" });
                            } else if(forum.length <= 0){
                             res.send({ "error": true, "Message": "forum not found" });
                          }else{
                                let emailstring = req.body.emails;
                                let emails = emailstring.split(',');
                                let forumname = forum[0].name;
                                emails.forEach((node, index) => {
                                   var query = "SELECT first_name FROM ??  WHERE ?? = ?";
                                   var table = ["users", "email", node];
                                   query = mysql.format(query, table);
                                   connection.query(query, function(err, firstName) {
                                     if (err) {
                                       res.json({ "error": true, "Message": "Error executing MySQL query" });
                                   } else if(firstName.length <= 0){
                                      res.json({ "error": true, "Message": "email id Not Found" });
                                   }else{
                                     let hostname = req.headers.host;
                                     let link = "http://" + hostname;
                                     utils.convertPug(path.join(__dirname, '../templates/invitationForum.pug'), { username: firstName[0].first_name, name: rows[0].first_name, link: link, forumname: forumname })
                                         .then(content => {
                                             email.send(res, node, 'Invitation', content);
                                             if (index == emails.length - 1) {
                                               res.on('end', function(){
                                                 ({ "error": false, "Message": "invite send successfully" });
                                               })
                                             }
                                         })
                                         .catch((error) => {
                                          console.log(error,"error");
                                       })
                                     }
                                   });
                                  });
                                  }
                               });
                             }
                          });
                      } else {
                            return res.send({ "error": true, "Messages": 'Invalid Token!' });
                    }
                 });
              });

  router.post("/invitebyemail/community", routeValidator.validate({
        body: {
            'emails': { isRequired: true },
            'communityId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT * FROM ??  WHERE ?? = ?";
                var table = ["users", "id", result.user_id];
                query = mysql.format(query, table);

                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        var query = "SELECT * FROM ??  WHERE ?? = ?";
                        var table = ["community", "communityId", req.body.communityId];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, community) {
                          if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query" });
                            } else if(community.length <= 0){
                              res.json({ "error": true, "Message": "forum not found" });
                          }else {
                                let sender_clg = community[0].institutionsName;
                                let emailstring = req.body.emails;
                                let emails = emailstring.split(',');
                                emails.forEach((node, index) => {
                                   var query = "SELECT id,first_name FROM ??  WHERE ?? = ?";
                                   var table = ["users", "email", node];
                                   query = mysql.format(query, table);
                                   connection.query(query, function(err, frstName) {
                                     if (err) {
                                       res.json({ "error": true, "Message": "Error executing MySQL query" });
                                    }else{
                                     let hostname = req.headers.host;
                                     let link = "http://" + hostname;
                                     utils.convertPug(path.join(__dirname, '../templates/invitationCommunity.pug'), { username: frstName[0].first_name, sender_clg: sender_clg, link: link })
                                         .then(content => {
                                              email.send(res, node, 'Invitation', content);
                                             if (index == emails.length - 1) {
                                               res.on('end', function(){
                                                 ({ "error": false, "Message": "invite send successfully" });
                                               })
                                             }
                                         }).catch((error) => {
                                            console.log(error,"error");
                                          })
                                          var reciever_email = node;
                                          var reciever_id = frstName[0].id;
                                          var reciever_firstName = frstName[0].first_name;
                                          var communityId = req.body.communityId
                                          var query = "SELECT email FROM ?? WHERE ?? = ?";
                                          var table = ["reminder","userId", frstName[0].id];
                                          query = mysql.format(query, table);
                                          connection.query(query, function(err, rows) {
                                            if(err){
                                              res.json({ "error": true, "Message": "Error executing MySQL query" });
                                            }else if(rows.length <= 0) {
                                              var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
                                              var table = ["reminder","userId","name","email","communityId", frstName[0].id,reciever_firstName,reciever_email,communityId];
                                              query = mysql.format(query, table);
                                              connection.query(query, function(err, rows) {
                                                if(err){
                                                  res.json({ "error": true, "Message": "Error executing MySQL query" });
                                                }else{

                                                }
                                              });
                                             }
                                          });
                                         }
                                      });
                                   });
                                  }
                               });
                              }
                          });
                       } else {
                          res.json({ "error": true, "Messages": 'Invalid Token!' });
                      }
                  });
              });

      /*POST requset to verified invite user in Campus*/
      router.post("/Community/InviteVerification/:userId", function(req, res) {
          var query = "SELECT * FROM ??  WHERE ?? = ?";
          var table = ["reminder", "userId", req.params.userId];
          query = mysql.format(query, table);
          connection.query(query, function(err, rows) {
              if (err) {
                  res.json({ "error": true, "Message": "Error executing MySQL query" });
              } else if (rows[0].is_checked != 0) {
                  res.json({ "error": true, "Message": "Link is expired" });
              } else {
                  var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                  var table = ["reminder", "is_checked", "1", "userId", req.params.userId];
                  query = mysql.format(query, table);
                  connection.query(query, function(err, row) {
                      if (err) {
                          res.json({ "error": true, "Message": "Error executing MySQL query" });
                      } else {
                          utils.convertPug(path.join(__dirname, '../templates/welcomeTemplate.pug'), {name: rows[0].name})
                              .then(content => {
                                  email.send(res, rows[0].email, 'Welcome To Peersview', content);
                                  res.json({ "error": false, "Message": "verified successfully" });
                              })
                              .catch(err => console.log(err));
                          return false;
                       }
                   });
                 }
             });
          });

  /*
  *  Reminder Email after 3 days by using node crone
  */

  var reminderemail = function(req, res){
    new CronJob('* * 3 * * *', function() {
       console.log('You will see this message every second');
           var query = "Select email,name from ?? WHERE is_checked = 0" ;
           var table = ["reminder"];
           query = mysql.format(query, table);
           connection.query(query, function(err, rows) {
              if (err) {
                   console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
               } else if(rows.length <= 0 || rows == "undefined"){
                  console.log({ "error": true, "Message": "No rows found"});
               }else {
                 for(var i=0;i<rows.length;i++){
                   var reciever_email = rows[i].email;
                   var reciever_name = rows[i].name;
                   emailtemplate.community_reminder_email(reciever_email,reciever_name,req,res,function(result){});
                 }
               }
           });
     }, null, true);
   }


 /*
 *   Morning Emails
 */

 var morningEmails = function(req, res){
   new CronJob('* 24 * * * *', function() {
      console.log('You will see this message every Minutes');
          var query = "Select * from ?? limit 1" ;
          var table = ["posts"];
          query = mysql.format(query, table);
          connection.query(query, function(err, rows) {
          if (err) {
                  console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
              } else if(rows.length <= 0 || rows == "undefined"){
                 console.log({ "error": true, "Message": "No rows found"});
              }else {
                var recent_post= rows[0].description;
                var query = "Select * from ?? limit 2" ;
                var table = ["newsnow_data"];
                query = mysql.format(query, table);
                connection.query(query, function(err, response) {
                if (err) {
                        console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if(response.length <= 0 || response == "undefined"){
                       console.log({ "error": true, "Message": "No rows found"});
                    }else {
                      var new_headlines = response[0].Title;
                      var top_stories = response[1].Title;
                      var recent_post= rows[0].description;
                      var query = "Select * from ??";
                      var table = ["users"];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, res) {
                      for(let i=0;i<res.length;i++){
                      let reciever_email = res[i].email;
                      let reciever_name = res[i].first_name;
                      var query = "select pl.post_id,GROUP_CONCAT(u.first_name SEPARATOR ',') as likers from ?? as pl JOIN ?? as p ON p.id = pl.post_id JOIN ?? as a ON a.id = p.author_id JOIN ?? as u on u.id = pl.user_id WHERE a.email = ? GROUP BY p.author_id limit 1";
                      var table = ["post_likes","posts","users","users",reciever_email];
                      query = mysql.format(query, table);
                      var result_post = [];
                      connection.query(query, function(err, restt) {
                        // let liker_name;
                        if(restt.length > 0){
                          let liker_name = restt[0].likers;
    emailtemplate.morning_emails(reciever_email,reciever_name,liker_name,recent_post,new_headlines,top_stories,liker_name,req,res,function(result){});
                        }


                      });

                    }
                 });
                }
             });
           }
        });
    }, null, true);
  }

  //Get request to get the Page Viewed

router.post("/user/PageViewd/ID", routeValidator.validate({
      body: {
          'userID': { isRequired: true }
      },
      headers: {
          'content-type': { isRequired: true, equals: 'application/json' },
          'token': { isRequired: true }
      }
  }), function(req, res) {
      utils.checkToken(req.headers.token, mysql, connection, function(result) {
          if (result.status == 1) {
              var query = "SELECT * FROM ??  WHERE ?? = ?";
              var table = ["users", "id", result.user_id];
              query = mysql.format(query, table);
              connection.query(query, function(err, rows) {
                  if (err) {
                    res.json({ "error": true, "Message": "Error executing MySQL query" });
                  } else {
                    var query = "SELECT * FROM ??  WHERE ?? = ?";
                    var table = ["users", "id", req.body.userID];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, response) {
                      for(var i=0;i<response.length;i++){
                      if(err){
                      res.json({ "error": true, "Message": "Error executing MySQL query" });
                      }else{
                        var visiter_name = response[i].first_name;
                        var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
                        var table = ["page_viewd","visiter_id",result.user_id,"user_id",req.body.userID];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, rows) {
                        if(err){
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                        }else if(rows.length <= 0) {
                          var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                          var table = ["page_viewd","user_id","visiter_id","visiter_name",req.body.userID,result.user_id,visiter_name];
                          query = mysql.format(query, table);
                          connection.query(query, function(err, response) {
                          if(err){
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                          }else{
                            res.json({ "error": false, "Message": "Successfulyy Viewed page" });
                          }
                          });
                        }
                        else{
                          res.json({ "error": false, "Message": "Successfully Viewed" });
                          }
                        });
                      }
                     }
                    });
                  }
              });
          } else {
              res.json({ "error": true, "Messages": 'Invalid Token!' });
          }
      });
  });

  /*
*   Evening Emails
*/

var eveningEmails = function(req, res){
  new CronJob('* 12 * * * *', function() {
     console.log('You will see this message every Minutes');
         var query = "Select communityId,institutionsName from ?? limit 1" ;
         var table = ["community"];
         query = mysql.format(query, table);
         connection.query(query, function(err, rows) {
         if (err) {
                 console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
             } else if(rows.length <= 0 || rows == "undefined"){
                console.log({ "error": true, "Message": "No rows found"});
             }else {
               var communityId = rows[0].communityId;
               var query = "Select * from ?? where ?? = ? limit 1" ;
               var table = ["posts","communityId",communityId];
               query = mysql.format(query, table);
               connection.query(query, function(err, response) {
               if (err) {
                      console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
                   } else if(response.length <= 0 || response == "undefined"){
                      console.log({ "error": true, "Message": "No rows found"});
                   }else {
                    var institutionsName = rows[0].institutionsName;
                    var Campus_Notifications = response[0].description;
                    var query = "Select * from ?? limit 1" ;
                    var table = ["newsnow_data"];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, restt) {
                    if (err) {
                        console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if(restt.length <= 0 || restt == "undefined"){
                        console.log({ "error": true, "Message": "No rows found"});
                    }else {
                     var topStory_title = restt[0].Title;
                     var query = "Select * from ?? limit 1";
                     var table = ["events"];
                     query = mysql.format(query, table);
                     connection.query(query, function(err, resp) {
                      var event_institutionName = resp[0]. event_institutionName;
                      var event_title = resp[0]. event_title;
                      var event_startdate = resp[0]. event_startdate;
                      var event_address = resp[0].event_address;
                      if (err) {
                         console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
                      } else if(resp.length <= 0 || resp == "undefined"){
                         console.log({ "error": true, "Message": "No rows found"});
                      }else {
                       var query = "Select * from ?? LEFT JOIN ?? ON users.id = page_viewd.user_id GROUP BY users.email";
                       var table = ["users","page_viewd"];
                       query = mysql.format(query, table);
                       connection.query(query, function(err, res) {
                       const userPromises = res.map((user, index) => {
                          return {
                             reciever_email: user.email,
                             reciever_name: user.first_name,
                             reciever_id:user.id,
                             visiter_name:user.visiter_name
                           }
                        });
                         Promise.all(userPromises).then(userData => {
                          for(var i =0;i<userData.length;i++){
                            var rec_email= userData[i].reciever_email;
                            var rec_name = userData[i].reciever_name;
                            var visiter_name = userData[i].visiter_name;
                            emailtemplate.evening_emails(rec_email,rec_name,visiter_name,Campus_Notifications,topStory_title,institutionsName,event_institutionName,event_title,event_startdate,event_address,req,res,function(result){});
                           }
                          });
                        });
                      }
                    });
                   }
                 });
                }
              });
            }
          });
     }, null, true);
 }

/*
* get top user Credits on the basis of weekly Bonaza
*/

var topUser_credits = function(req, res){
  new CronJob('* * 3 * * *', function() {
     console.log('You will see this message every second');
         var query = "SELECT * FROM ?? ORDER BY userCredits DESC LIMIT 3" ;
         var table = ["weekly_bonanza"];
         query = mysql.format(query, table);
         connection.query(query, function(err, rows) {
            if (err) {
                 console.log({ "error": true, "Message": "Error executing MySQL query", err: err });
             } else if(rows.length <= 0 || rows == "undefined"){
                console.log({ "error": true, "Message": "No rows found"});
             }else {
               for(var i=0;i<rows.length;i++){
                 var reciever_id = rows[i].userId;
                 console.log(reciever_id);
                 var query = "SELECT first_name,email FROM ?? WHERE ?? = ?" ;
                 var table = ["users","id",reciever_id];
                 query = mysql.format(query, table);
                 connection.query(query, function(err,response) {
                  for(let i=0;i<response.length;i++){
                    let reciever_email = response[i].email;
                    let reciever_name = response[i].first_name;
                    emailtemplate.topUser_credits_emails(reciever_email,reciever_name,req,res,function(result){});
                  }
                 });
               }
             }
         });
   }, null, true);
 }




//***************************Function Call*************************//
 /* reminderemail();
  morningEmails();
  eveningEmails();
  topUser_credits();*/

  /*
   *  invite by society
   */
  router.post("/invitebyemail/society", routeValidator.validate({
       body: {
           'emails': { isRequired: true },
           'socitiesclubsId': { isRequired: true }
       },
       headers: {
           'content-type': { isRequired: true, equals: 'application/json' },
           'token': { isRequired: true }
       }
   }), function(req, res) {
       utils.checkToken(req.headers.token, mysql, connection, function(result) {
           if (result.status == 1) {
               var query = "SELECT * FROM ??  WHERE ?? = ?";
               var table = ["users", "id", result.user_id];
               query = mysql.format(query, table);
               connection.query(query, function(err, rows) {
                   if (err) {
                        return res.send({ "error": true, "Message": "Error executing MySQL query" });
                   } else {
                       var query = "SELECT * FROM ??  WHERE ?? = ?";
                       var table = ["socitiesclubs", "socitiesclubsId", req.body.socitiesclubsId];
                       query = mysql.format(query, table);
                       connection.query(query, function(err, society) {
                           if (err) {
                             return  res.json({ "error": true, "Message": "Error executing MySQL query" });
                           } else if(society.length <= 0){
                            res.send({ "error": true, "Message": "socitiesclubsId not found" });
                         }else{
                               let emailstring = req.body.emails;
                               let emails = emailstring.split(',');
                               let socitiesname = society[0].name;
                               emails.forEach((node, index) => {
                                  var query = "SELECT first_name FROM ??  WHERE ?? = ?";
                                  var table = ["users", "email", node];
                                  query = mysql.format(query, table);
                                  connection.query(query, function(err, firstName) {
                                    if (err) {
                                      res.json({ "error": true, "Message": "Error executing MySQL query" });
                                  } else if(firstName.length <= 0){
                                     res.json({ "error": true, "Message": "email id Not Found" });
                                  }else{
                                    let hostname = req.headers.host;
                                    let link = "http://" + hostname;
                                    utils.convertPug(path.join(__dirname, '../templates/invitationSociety.pug'), { name: firstName[0].first_name, societyName:socitiesname, link: link})
                                        .then(content => {
                                            email.send(res, node, 'Invitation to Join the online Society on Peersview', content);
                                            if (index == emails.length - 1) {
                                              res.on('end', function(){
                                                ({ "error": false, "Message": "invite send successfully" });
                                              })
                                            }
                                        })
                                        .catch((error) => {
                                         console.log(error,"error");
                                      })
                                    }
                                  });
                                 });
                                 }
                              });
                            }
                         });
                     } else {
                           return res.send({ "error": true, "Messages": 'Invalid Token!' });
                   }
                });
             });






     /*promise to get values*/
     function promise_query(query, connection) {
         return new Promise(function(fulfill, reject) {
             connection.query(query, function(err1, rows1) {
                 if (err1) {
                     reject(err1);
                 } else {
                     fulfill(rows1);
                 }
             });
         });
     }
}
