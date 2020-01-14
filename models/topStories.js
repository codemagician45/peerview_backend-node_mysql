var utils = require('../common/utils');
var CronJob = require('cron').CronJob;

module.exports.routes = function(router, routeValidator, mysql, connection) {
    router.get("/topStories", function(req, res) {
        var query = "Select * from ?? ORDER BY RAND() LIMIT 20" ;
        var table = ["newsnow_data"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                res.json({ "error": false, "Message": "News Items", "news": rows });
            }
        });
      });

  //get request to get category single
  router.get("/newnow_data/:category", function(req, res) {
      var query = "Select * from ?? WHERE ?? = ? LIMIT 20" ;
      var table = ["newsnow_data", "category", req.params.category];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows) {
          if (err) {
              res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
          } else {
              res.json({ "error": false, "Message": "Propic", "propic": rows });
          }
      });
    });

    //get request to get category Multiples
    router.get("/newnow_data/getMultiple/:category", function(req, res) {
        let name = req.params.category.split(',');
        var query = "Select * from ?? WHERE ?? IN (?) LIMIT 20" ;
        var table = ["newsnow_data", "category", name];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                res.json({ "error": false, "Message": "Multiple Category Fetched Successfully", "news_data": rows });
            }
        });
      });


    //get request to get Platform Multiples
    router.post("/users/platform/Notifications", routeValidator.validate({
       body:{
          'start': { isRequired: true },
          'limit': { isRequired: true }
       },
        headers: {
            'token': { isRequired: true }
        }
    }),function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
             if (result.status == 1) {
             var query = "Select count(*) as TotalCount from ?? where ?? = ?";
             var table = ["Platform_notifications", "reciever_id", result.user_id];
              query = mysql.format(query, table);
              connection.query(query, function(err, rows) {
                  if (err) {
                      res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                  } else {
                    var totalCount = rows[0].TotalCount
                    if(req.body.start == '' || req.body.limit == ''){
                      var startNum = 0;
                      var LimitNum = 10;
                    }else{
                      var startNum = parseInt(req.body.start);
                      var LimitNum = parseInt(req.body.limit);
                    }
                    var query = "Select * from ?? where ?? = ?  ORDER BY created_at DESC limit ? OFFSET ?";
                    var table = ["Platform_notifications", "reciever_id", result.user_id,LimitNum,startNum];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rest) {
                    if(err){
                      return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    }else{
                        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                        var table = ["Platform_notifications", "is_read", "1", "reciever_id", result.user_id];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, response) {
                        if(err){
                          return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                       }else{
                          res.json({ "error": false, "Message": "Post rating", "Total Count": totalCount , "Notifications":rest });
                        }
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

  //get messages Count of Particular user
  router.get("/user/messagesCount", routeValidator.validate({
      headers: {
          'token': { isRequired: true }
      }
  }),function(req, res) {
     utils.checkToken(req.headers.token, mysql, connection, function(result) {
          if (result.status == 1) {
            var query = "Select count(*) as TotalCount from ?? where ?? = ?";
            var table = ["messages", "receiver_id", result.user_id];
            query = mysql.format(query, table);
              connection.query(query, function(err, rows) {
                  if (err) {
                      res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                  } else {
                    var totalCount = rows[0].TotalCount
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    var table = ["messages", "is_read", "1", "receiver_id", result.user_id];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, response) {
                    if(err){
                      return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                   }else{
                      res.json({ "error": false, "Message": "Message Count", "User Message Count": totalCount});
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
    * Landing page email
    */
    router.post("/landing/emails", routeValidator.validate({
        body: {
            email: { isRequired: true, isEmail: true, normalizeEmail: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        var query = "SELECT email from ?? WHERE ?? = ?";
        var table = ["landing_emails","email",req.body.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length) {
                    res.json({ "error": "Email already exists!" });
                } else {
                    //Executing query to insert the data in users.
                    var query = "INSERT INTO ??(??) VALUES (?)";
                    var table = ["landing_emails",  "email", req.body.email];
                    query = mysql.format(query, table);

                    //Sending Reesponse
                    connection.query(query, function(err, result) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                        } else {
                            res.json({ "error": false, "Message": "email has been added successfully!" });
                        }
                    });
                }
            }
        });
    });

/*
*  Get email Landing page
*/

router.post("/landing/emails/get", routeValidator.validate({
   body:{
      'start': { isRequired: true },
      'limit': { isRequired: true }
   },
}),function(req, res) {
         var query = "Select count(*) as TotalCount from ??";
         var table = ["landing_emails"];
          query = mysql.format(query, table);
          connection.query(query, function(err, rows) {
              if (err) {
                  res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
              } else {
                var totalCount = rows[0].TotalCount
                if(req.body.start == '' || req.body.limit == ''){
                  var startNum = 0;
                  var LimitNum = 10;
                }else{
                  var startNum = parseInt(req.body.start);
                  var LimitNum = parseInt(req.body.limit);
                }
                var query = "Select * from ?? ORDER BY created_at DESC limit ? OFFSET ?";
                var table = ["landing_emails",LimitNum,startNum];
                query = mysql.format(query, table);
                connection.query(query, function(err, rest) {
                if(err){
                  return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                }else{
                    res.json({ "error": false, "Message": "Post rating", "Total Count": totalCount , "Data":rest });
                    }
                  });
                 }
               });

          });




}
