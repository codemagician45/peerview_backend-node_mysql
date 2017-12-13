var utils = require('../common/utils');
var merge = require('merge');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, Promise, multer) {
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './uploads');
        },
        filename: function(req, file, callback) {
            var name = file.originalname;
            var fileminetype = name.split(".");
            callback(null, fileminetype[0] + '-' + Date.now() + '.' + fileminetype[1]);
        }
    });

    var upload = multer({ storage: storage }).single('poster_img');
    //Event request to inserts events
    router.post("/events/add", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.event_title == '') {
            return res.json({ "error": "body.event_title is required" });
        } else if (req.body.event_description == '') {
            return res.json({ "error": "body.event_description is required" });
        } else if (req.body.event_address == '') {
            return res.json({ "error": "body.event_address is required" });
        } else if (req.body.event_startdate == '') {
            return res.json({ "error": "body.event_startdate is required" });
        } else if (req.body.event_starttime == '') {
            return res.json({ "error": "body.event_starttime is required" });
        } else if (req.body.event_enddate == '') {
            return res.json({ "error": "body.event_enddate is required" });
        } else if (req.body.event_endtime == '') {
            return res.json({ "error": "body.event_endtime is required" });
        } else if (req.body.event_ticketclosedate == '') {
            return res.json({ "error": "body.event_ticketclosedate is required" });
        } else if (req.body.event_ticketclosetime == '') {
            return res.json({ "error": "body.event_ticketclosetime is required" });
        } else if (req.body.event_contactDetails == '') {
            return res.json({ "error": "body.event_contactDetails is required" });
        } else if (req.body.event_organiserBankaccount == '') {
            return res.json({ "error": "body.event_organiserBankaccount is required" });
        }

        //return res.json({body: req.body, file: req.file});
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.file) {
                    var filenamedata = req.file.filename;
                } else {
                    var filenamedata = "";
                }
                var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                var table = ["events", "author_id", "event_title", "event_description", "event_address", "event_city", "event_startdate", "event_starttime", "event_enddate", "event_endtime", "event_typeofadvert", "event_ticketclosedate", "event_ticketclosetime", "event_price", "event_institutionName", "event_dressCode", "event_contactDetails", "event_organiserBankaccount", result.user_id, req.body.event_title, req.body.event_description, req.body.event_address, req.body.event_city, req.body.event_startdate, req.body.event_starttime, req.body.event_enddate, req.body.event_endtime, req.body.event_typeofadvert, req.body.event_ticketclosedate, req.body.event_ticketclosetime, req.body.event_price, req.body.event_institutionName, req.body.event_dressCode, req.body.event_contactDetails, req.body.event_organiserBankaccount];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                        var table = ["event_media", "event_id", "type", "name", rows.insertId, '1', filenamedata];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {
                              var query = "SELECT first_name,last_name,id from ?? WHERE ?? = ?";
                              var table = ["users", "id",result.user_id];
                              query = mysql.format(query, table);
                              connection.query(query, function(err, response) {
                                if(err){
                                   return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                }else {
                                 let event_user = response[0].first_name + ' ' + response[0].last_name;
                                 let event_user_id = response[0].id;
                                 var query = "SELECT first_name,last_name,id from ?? WHERE ?? = ?";
                                 var query = "Select distinct users.* from ?? join ?? on follow.follower_id = users.id WHERE ?? = ?";
                                 var table = ["follow", "users", "user_id", event_user_id];
                                 query = mysql.format(query, table);
                                 console.log(query);
                                 connection.query(query, function(err, restt) {
                                   const userPromises = restt.map((user, index) => {
                                      return {
                                         reciever_id:user.id,
                                      }
                                    });
                                  Promise.all(userPromises).then(userData => {
                                   for(let i =0;i<userData.length;i++){
                                     var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                                     var table = ["Platform_notifications", "user_id", event_user_id, "table_id", userData[i].reciever_id,"reciever_id",userData[i].reciever_id,"type",8,"is_read",0];
                                     query = mysql.format(query, table);
                                     connection.query(query, function(err, resp){
                                      if(err){
                                           return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                      }else if(resp.length !== 0){

                                       }else{
                                           var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                                           var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",event_user_id,userData[i].reciever_id,userData[i].reciever_id,8,''+event_user+' Added Events',0];
                                           query = mysql.format(query, table);
                                           connection.query(query, function(err, ress) {
                                             if(err){
                                               return res.json({ "error": true, "Message": "Error executing MySQL query" ,"err":err });
                                            }else{

                                            }
                                          });
                                         }
                                       });
                                     }
                                     res.json({ "error": false, "Message": "Event Added successfully"});
                                   });
                                });
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


    //Put request to update Events
    router.put("/events/:eventId", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.event_title == '') {
            return res.json({ "error": "body.event_title is required" });
        } else if (req.body.event_description == '') {
            return res.json({ "error": "body.event_description is required" });
        } else if (req.body.event_address == '') {
            return res.json({ "error": "body.event_address is required" });
        } else if (req.body.event_startdate == '') {
            return res.json({ "error": "body.event_startdate is required" });
        } else if (req.body.event_starttime == '') {
            return res.json({ "error": "body.event_starttime is required" });
        } else if (req.body.event_enddate == '') {
            return res.json({ "error": "body.event_enddate is required" });
        } else if (req.body.event_endtime == '') {
            return res.json({ "error": "body.event_endtime is required" });
        } else if (req.body.event_ticketclosedate == '') {
            return res.json({ "error": "body.event_ticketclosedate is required" });
        } else if (req.body.event_ticketclosetime == '') {
            return res.json({ "error": "body.event_ticketclosetime is required" });
        } else if (req.body.event_contactDetails == '') {
            return res.json({ "error": "body.event_contactDetails is required" });
        } else if (req.body.event_organiserBankaccount == '') {
            return res.json({ "error": "body.event_organiserBankaccount is required" });
        }
        // return res.json({body: req.body, file: req.file});
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.file) {
                    var filenamedata = req.file.filename;
                } else {
                    var filenamedata = "";
                }
                var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                var table = ["events", "event_title", req.body.event_title, "event_description", req.body.event_description, "event_address", req.body.event_address, "event_city", req.body.event_city, "event_startdate", req.body.event_startdate, "event_starttime", req.body.event_starttime, "event_enddate", req.body.event_enddate, "event_endtime", req.body.event_endtime, "event_typeofadvert", req.body.event_typeofadvert, "event_ticketclosedate", req.body.event_ticketclosedate, "event_ticketclosetime", req.body.event_ticketclosetime, "event_price", req.body.event_price, "event_institutionName", req.body.event_institutionName, "event_dressCode", req.body.event_dressCode, "event_contactDetails", req.body.event_contactDetails, "event_organiserBankaccount", req.body.event_organiserBankaccount, "event_Id", req.params.eventId, "author_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "Don't seems to be your event" });
                    } else {
                        var query = "UPDATE ?? SET ??=? where ??=? and ??=?";
                        var table = ["event_media", "name", filenamedata, 'event_id', req.params.eventId, 'type', '1'];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {
                              res.json({ "error": false, "Message": "Event Updated successfully"});
                          }
                        });

                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //Delete request to delete Event
    router.delete("/events/:eventId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                var table = ["events", "event_Id", req.params.eventId, "author_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "Event has not deleted" });
                    } else {
                        res.json({ "error": false, "Message": "Event deleted successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //Book Ticket request to BUY  Event Ticket
    //Event request to inserts events
    router.post("/booking/:eventId", routeValidator.validate({
        body: {
            'price': { isRequired: true },
            'qty': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
                var table = ["book_event", "user_ID", "event_ID", "price", "qty", result.user_id, req.params.eventId, req.body.price, req.body.qty];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    }else {
                        // res.json({ "error": false, "Message": "Event ticket successfully booked" });
                      var query = "Select first_name,last_name from ?? WHERE ?? = ?";
                      var table = ["users", "id",result.user_id];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, response) {
                       if(err){
                         return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                      }else{
                        var UserName = response[0].first_name + ' ' + response[0].last_name;
                        var query = "SELECT events.author_id from ?? WHERE ?? = ?";
                        var table = ["events","event_id",req.params.eventId];
                        query = mysql.format(query,table);
                        connection.query(query,function(err,ress) {
                          if(err){
                            return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                          }else if(ress[0].author_id === result.user_id){
                           res.json({ "error": false, "Message": "Event ticket successfully booked" });
                         }else{
                           var authorId = ress[0].author_id;
                           var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                           var table = ["Platform_notifications", "user_id", result.user_id, "table_id", req.params.eventId,"reciever_id",authorId,"type",6,"is_read",0];
                           query = mysql.format(query, table);
                           connection.query(query, function(err, restt){
                             console.log(result.user_id);
                             if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query" ,"err":err });
                            }else if(restt.length !== 0) {
                              res.json({ "error": false, "Message": "Event ticket successfully booked" });
                          }else{
                              var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                              var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,authorId,req.params.eventId,6,''+UserName+' Booked Your Ticket',0];
                              query = mysql.format(query, table);
                              console.log(query);
                              connection.query(query, function(err, ress) {
                              if(err){
                                return res.json({ "error": true, "Message": "Error executing MySQL query" ,"err":err });
                             }else{
                                res.json({ "error": false, "Message": "Event ticket successfully booked" });
                              }
                             });
                            }
                          });
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

    //Event request to inserts events
    router.post("/bookingTrans", routeValidator.validate({
        body: {
            'trans_id': { isRequired: true },
            'event_id': { isRequired: true },
            'pay_status': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
                var table = ["book_trans", "trans_id", "event_id", "user_Id", "status", req.body.trans_id, req.body.event_id, result.user_id, req.body.pay_status];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Event transaction saved successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get all events details
    router.get("/events", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT events.*, users.first_name, users.last_name, users.email FROM ?? JOIN ?? ON events.author_id = users.id";
                var table = ["events", "users", "event_media"];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var media_array = [];
                        for (i = 0; i < rows.length; i++) {
                            rows[i].eventsMedia = "";
                            var query = "select * FROM ?? where ?? = ?";
                            var table = ["event_media", "event_ID", rows[i].event_Id];
                            query = mysql.format(query, table);
                            media_array.push(promise_query(query, connection));
                        }
                        Promise.all(media_array).then(values => {
                            rows = rows.map(function(forum, index) {
                                return merge(forum, { eventsMedia: values[index] })
                            });
                            res.json({ "error": false, "Message": "Event", "rows": rows });
                        });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get all events details of particular user
    router.get("/authorEvents/:authorID", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT events.*, users.first_name, users.last_name, users.email FROM ?? JOIN ?? ON events.author_id = users.id where events.author_id = ?";
                var table = ["events", "users", req.params.authorID];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var media_array = [];
                        var booked_User = [];
                        for (i = 0; i < rows.length; i++) {
                            rows[i].eventsMedia = "";
                            rows[i].bookedUser = "";
                            var query = "select * FROM ?? where ?? = ?";
                            var table = ["event_media", "event_ID", rows[i].event_Id];
                            query = mysql.format(query, table);
                            media_array.push(promise_query(query, connection));
                            /*Booked array*/
                            var query = "select book_event.event_ID, users.id, users.first_name, users.last_name, users.email, book_trans.* FROM ?? join ?? ON users.id = book_event.user_ID join book_trans ON book_event.event_ID = book_trans.event_id where book_event.event_ID = ?";
                            var table = ["users", "book_event", rows[i].event_Id];
                            query = mysql.format(query, table);
                            booked_User.push(promise_query(query, connection));
                        }
                        Promise.all(media_array).then(values => {
                            rows = rows.map(function(forum, index) {
                                return merge(forum, { eventsMedia: values[index] })
                            });
                            Promise.all(booked_User).then(values => {
                                rows = rows.map(function(forum, index) {
                                    return merge(forum, { bookedUser: values[index] })
                                });
                                res.json({ "error": false, "Message": "Success", "events": rows });
                            });
                        });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get all popular events details
    router.get("/popularEvents", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT events.*, users.first_name, users.last_name, users.email FROM ?? JOIN ?? ON events.author_id = users.id ORDER BY events.view_count DESC ";
                var table = ["events", "users", "event_media"];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var media_array = [];
                        for (i = 0; i < rows.length; i++) {
                            rows[i].eventsMedia = "";
                            var query = "select * FROM ?? where ?? = ?";
                            var table = ["event_media", "event_ID", rows[i].event_Id];
                            query = mysql.format(query, table);
                            media_array.push(promise_query(query, connection));
                        }
                        Promise.all(media_array).then(values => {
                            rows = rows.map(function(forum, index) {
                                return merge(forum, { eventsMedia: values[index] })
                            });
                            res.json({ "error": false, "Message": "Event", "rows": rows });
                        });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //put request to update share count of a post
    router.put("/eventCount/:eventID", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select view_count from ?? where ?? = ?";
                var table = ["events", "event_Id", req.params.eventID];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var view_count = rows[0].view_count + 1;
                        var query = "Update ?? SET ?? = ? WHERE ?? = ?";
                        var table = ["events", "view_count", view_count, "event_Id", req.params.eventID];
                        var json_text = "view count update successfully";
                    } else {
                        var json_text = "Error while updating share count";
                    }
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            res.json({ "error": false, "Message": json_text, updated_count: view_count });
                        }
                    });
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //post request to get search events details
    router.post("/searchEvents", routeValidator.validate({
        body: {
            post_searchContent: { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT events.*, users.first_name, users.last_name, users.email FROM ?? JOIN ?? ON events.author_id = users.id WHERE events.event_title LIKE '%" + req.body.post_searchContent + "%' OR events.event_description LIKE '%" + req.body.post_searchContent + "%'";
                var table = ["events", "users", "event_media"];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var media_array = [];
                        for (i = 0; i < rows.length; i++) {
                            rows[i].eventsMedia = "";
                            var query = "select * FROM ?? where ?? = ?";
                            var table = ["event_media", "event_ID", rows[i].event_Id];
                            query = mysql.format(query, table);
                            media_array.push(promise_query(query, connection));
                        }
                        Promise.all(media_array).then(values => {
                            rows = rows.map(function(forum, index) {
                                return merge(forum, { eventsMedia: values[index] })
                            });
                            res.json({ "error": false, "Message": "Event", "rows": rows });
                        });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    /*POST request to inserts events guest list*/
    router.post("/guestlist/:eventId", routeValidator.validate({
        body: {
            'name': { isRequired: true },
            'type': { isRequired: true },
            'location': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                var table = ["guest_list", "userID", "eventID", "name", "type", "location", result.user_id, req.params.eventId, req.body.name, req.body.type, req.body.location];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "User Added to guest list" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    /*get request to get events guest list*/
    router.get("/guestlist/:eventId", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["guest_list", "eventID", req.params.eventId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                res.json({ "error": false, "Message": "Guests List", "rows":rows});
            }
        });
    });

    /*POST request to inserts events guest list*/
    router.post("/vipguestlist/:eventId", routeValidator.validate({
        body: {
            'name': { isRequired: true },
            'phone': { isRequired: true },
            'email': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                var table = ["vipGuest_list", "userID", "eventID", "name", "email", "phone", result.user_id, req.params.eventId, req.body.name, req.body.email, req.body.phone];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "User Added to Vip guest list" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });



    /*get request to get events guest list*/
    router.get("/vipguestlist/:eventId", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["vipGuest_list", "eventID", req.params.eventId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                res.json({ "error": false, "Message": "Guests List", "rows":rows});
            }
        });
    });


    //put request to update share count of a post
    router.put("/vipguestlist/:eventID", routeValidator.validate({
      body: {
            'name': { isRequired: true },
            'phone': { isRequired: true },
            'email': { isRequired: true }
        },
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result){
            if (result.status == 1) {
                var query = "Update ?? SET ?? = ?, ?? = ?, ??=? WHERE ?? = ?";
                        var table = ["vipGuest_list", "name", req.body.name, "email", req.body.email, "phone", req.body.phone, "userID",result.user_id, "eventID", req.params.eventID];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            res.json({ "error": false, "Message": "update successfully" });
                        }
                    });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
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
