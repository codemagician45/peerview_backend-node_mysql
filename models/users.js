var utils = require('../common/utils');
var emailtemplate = require('../common/emailtemplate');

var path = require('path');
var email = require('../common/email');
var url = require('url');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, Promise,  multer, sequelize) {

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

    var upload = multer({ storage: storage }).single('file');
     //PUT request to update profilepic
     // user-profile-picture
    // router.put("/usersprofilepic/", upload, routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             if (req.file) {
    //                 var filenamedata = req.file.filename;
    //             } else {
    //                 var filenamedata = "";
    //             }
    //             var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    //             var table = ["users", "propic", filenamedata, "id", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "User has been updated successfully!" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    router.get("/testapi", function(req, res){

        var User = sequelize.define('user', {
                      firstName: {
                        type: Sequelize.STRING,
                        field: 'first_name'
                     },
                      lastName: {
                        type: Sequelize.STRING,
                        field: 'first_name'
                      }
                    }, {
                      freezeTableName: true // Model tableName will be the same as the model name
                    });

        User.findAll();

    });
    //get request to get propic
    // router.get("/usersprofilepic/:userId", function(req, res) {
    //
    //     var query = "Select propic from ?? WHERE ?? = ?";
    //     var table = ["users", "id", req.params.userId];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "Propic", "propic": rows });
    //         }
    //     });
    //
    // });



    router.get("/convert", (req, res) => {
        let id = 28;
        let hostname = req.headers.host;
        let link = "http://" + hostname + "/app/confirmation/" + id
        utils.convertPug(path.join(__dirname, '../templates/confirmation.pug'), { link: link })
            .then(content => {
                console.log(content);
                //email.send(res, 'prashant.techindustan@gmail.com', 'confirmation', content);
            })
            .catch(err => console.loog(err));
        return false;
    })


    //POST request to insert users
    // router.post("/users", routeValidator.validate({
    //     //Validations
    //     body: {
    //         first_name: { isRequired: true, isAscii: true },
    //         last_name: { isRequired: true, isAscii: true },
    //         email: { isRequired: true, isEmail: true },
    //         password: { isRequired: true, isAscii: true, isLength: { min: 8, max: 24 }, message: 'Minimum 8 and maximum 24 characters are allowed!' }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //
    //     //Executing query to select user email from users.
    //     var query = "SELECT email FROM ?? WHERE ??=?";
    //     var table = ["users", "email", req.body.email];
    //     query = mysql.format(query, table);
    //
    //     //Sending Reesponse
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //         } else {
    //             if (rows.length) {
    //                 res.json({ "error": "Email already exists!" });
    //             } else {
    //                 //Executing query to insert the data in users.
    //                 var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
    //                 var table = ["users", "first_name", "last_name", "email", "password", req.body.first_name, req.body.last_name, req.body.email, md5(req.body.password)];
    //                 query = mysql.format(query, table);
    //
    //                 //Sending Reesponse
    //                 connection.query(query, function(err, rows) {
    //                     if (err) {
    //                         res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                     } else {
    //                         res.json({ "error": false, "Message": "User has been added successfully!" });
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // });

    //GET request to get all users
    // router.get("/users", routeValidator.validate({
    //     //Validations
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     var query = "SELECT id, first_name, last_name, email, is_active, created_at, updated_at FROM ??";
    //     var table = ["users"];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "Success", "Users": rows });
    //         }
    //     });
    // });



    //Get request to get the user by it's id
    // router.get("/users/:id", function(req, res) {
    //     var query = "SELECT first_name, last_name, email, is_active, created_at, updated_at FROM ?? WHERE ??=?";
    //     var table = ["users", "id", req.params.id];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //         } else {
    //             res.json({ "error": false, "Message": "Success", "User": rows });
    //         }
    //     });
    // });

    //PUT request to update the user by id
    router.put("/users/:id", routeValidator.validate({
        //Validations
        body: {
            first_name: { isRequired: true, isAscii: true },
            last_name: { isRequired: true, isAscii: true },
            language: { isRequired: true, isAscii: true },
            current_employment_place: { isRequired: true, isAscii: true },
            course: { isRequired: true, isAscii: true },
            DOB: { isRequired: true, isAscii: true },
            city: { isRequired: true, isAscii: true },
            website: { isRequired: true, isAscii: true },
            student_type: { isRequired: true, isAscii: true },
            email: { isRequired: true, isAscii: true, isEmail: true, message: 'Email is invalid' },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {
        var query = "Update ?? set ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?  WHERE ??=?";
        var table = ["users", "first_name", req.body.first_name, "last_name", req.body.last_name, "email", req.body.email, "language", req.body.language, "employment_place", req.body.current_employment_place, "course_id", req.body.course, "DOB", req.body.DOB, "city", req.body.city, "website", req.body.website, "student_type", req.body.student_type, "id", req.params.id];
        query = mysql.format(query, table);
        //res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "error": false, "Message": "User has been updated successfully!" });
            }
        });
    });

    //Check Token
    router.get("/checkToken/", routeValidator.validate({
        //Validations
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                res.json({ "error": false, "Message": "Success", "userId": result.user_id });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //GET request to get account settings
    router.get("/accountSettings/", routeValidator.validate({
        //Validations
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {

                var query = "SELECT id, users.first_name, users.last_name, users.email, users.DOB, users.website, users.city, users.course_id, cources.name, users.employment_place, users.language, users.student_type, users.protect_post, users.profile_privacy, users.contact_privacy, users.email_me_when, users.activity_related_to_account, users.billing_method, users.name_on_card, users.card, users.card_expiry, users.is_active, users.created_at, users.updated_at FROM ?? left join ?? on users.course_id = cources.courseId WHERE ?? = ?";
                var table = ["users", "cources", "users.id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var query = "SELECT user_block.*, users.first_name, users.last_name FROM ?? left join ?? on user_block.blocked = users.id WHERE user_block.blocked_by = ?";
                        var table = ["user_block", "users", result.user_id];
                        query = mysql.format(query, table);
                        //return res.json(query);
                        connection.query(query, function(err2, rows2) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {
                                rows[0].blocked = rows2;
                                res.json({ "error": false, "Message": "Success", "Settings": rows });
                            }
                        });

                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    // function setValue(values) {
    //     console.log(values);
    // }
    //
    // router.put("/users/:id/security", routeValidator.validate({
    //     //Validations
    //     body: {
    //         protect_post: { isRequired: true },
    //         contact_privacy: { isRequired: true },
    //         profile_privacy: { isRequired: true },
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
    //     var table = ["users", "protect_post", req.body.protect_post, "contact_privacy", req.body.contact_privacy, "profile_privacy", req.body.profile_privacy, "id", req.params.id];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //         } else {
    //             res.json({ "error": false, "Message": "User has been updated successfully!" });
    //         }
    //     });
    // });

    //DELETE request to delete the user
    // router.delete("/users/:id", routeValidator.validate({
    //     //Validations
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     var query = "DELETE from ?? WHERE ??=?";
    //     var table = ["user_block", "id", req.params.id];
    //     console.log(query);
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //         } else {
    //             res.json({ "error": false, "Message": "User has been deleted successfully!" });
    //         }
    //     });
    // });

    // block user

    router.post("/users/:id/block", routeValidator.validate({
        body: {
            block_id: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ?? (??,??) VALUES (?,?)";
                var table = ["user_block", "blocked_by", "blocked", result.user_id, req.body.block_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Success", "Blocked": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    router.delete("/users/:id/unblock", routeValidator.validate({
        //Validations
        body: {
            unblock_id: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {
        var query = "DELETE FROM ?? WHERE ?? = ? AND ?? = ? ";
        var table = ["user_block", "blocked_by", req.params.id, "blocked", req.body.unblock_id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "error": false, "Message": "Success", "Blocked": rows });
            }
        });
    });

    /*POST requset to update password*/
    // router.post("/users/updatePassword", routeValidator.validate({
    //     //Validations
    //     body: {
    //         password: { isRequired: true },
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     var query = "UPDATE ?? SET ?? = ?,?? = ? WHERE ?? = ?";
    //     var table = ["users", "change_pwd", "0", "password", md5(req.body.password), "token", req.body.token];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //         } else {
    //             res.json({ "error": false, "Message": "Password changed successfully" });
    //         }
    //     });
    // });

    //POST request to get emailId user details
    router.post("/users/CheckEmail", routeValidator.validate({
        //Validations
        body: {
            email: { isRequired: true, isEmail: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {
        var query = "SELECT  ?? FROM ?? where ?? = ?";
        var table = ["email", "users", "email", req.body.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                if (rows.length > 0) {
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    var table = ["users", "change_pwd", "1", "email", req.body.email];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                        } else {
                            res.json({ "error": false, "Message": "success" });
                        }
                    });
                } else {
                    res.json({ "error": false, "Message": "fails", "User": "" });
                }
            }
        });
    });

    //POST request to set new password for a user
    // router.post("/users/setnewpassword", routeValidator.validate({
    //
    //     //Validations
    //     body: {
    //         current_password: { isRequired: true, isAscii: true },
    //         password: { isRequired: true, isAscii: true, isLength: { min: 8, max: 24 }, message: 'Minimum 8 and maximum 24 characters are allowed!' },
    //         confirm_password: { isRequired: true, isAscii: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true, isAscii: true, message: { isRequired: 'Token is required!' } }
    //     }
    // }), function(req, res) {
    //
    //     if (req.body.confirm_password !== req.body.password) {
    //         res.status(400);
    //         res.json({ 'message': 'confirm_password and password doesn\'t match' });
    //         res.end();
    //         return;
    //     }
    //
    //     utils.checkCurrentPassword(req.headers.token, md5(req.body.current_password), mysql, connection, function(result) {
    //         if (!result.status) {
    //             res.status(400);
    //             res.json({ 'error': true, 'message': 'Invalid Current Password!' });
    //             res.end();
    //             return;
    //         } else {
    //             utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //                 if (result.status == 1) {
    //                     var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    //                     var table = ["users", "password", md5(req.body.password), "id", result.user_id];
    //                     query = mysql.format(query, table);
    //
    //                     //Sending Response
    //                     connection.query(query, function(err, rows) {
    //                         if (err) {
    //                             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                         } else {
    //                             res.json({ "error": false, "Message": "Password has been changed successfully." });
    //                         }
    //                     });
    //                 } else {
    //                     res.json({ "error": true, "Messages": 'Invalid Token!' });
    //                 }
    //             });
    //         }
    //     });
    // });




    //POST request to update notification settings for a user
    router.post("/users/notifications", routeValidator.validate({

        //Validations
        body: {
            new_followers: { isRequired: true, isAscii: true },
            page_view: { isRequired: true, isAscii: true },
            post_media_like:{ isRequired: true, isAscii: true },
            tags_post_media: { isRequired: true, isAscii: true },
            events: { isRequired: true, isAscii: true },
            account_suggestions: { isRequired: true, isAscii: true },
            account_follow: { isRequired: true, isAscii: true },
            community_notify: { isRequired: true, isAscii: true },
            top_posts: { isRequired: true, isAscii: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {

                var query = "UPDATE ?? SET ?? = ?, ?? = ?,?? =? ,?? = ?, ?? = ?,?? =? ,?? = ?, ?? = ?,?? =?  WHERE ?? = ?";
                var table = ["users", "new_followers", req.body.new_followers, "page_view", req.body.page_view,"post_media_like",req.body.post_media_like,"tags_post_media",req.body.tags_post_media,"events",req.body.events,"account_suggestions",req.body.account_suggestions,"account_follow",req.body.account_follow,"community_notify",req.body.community_notify,"top_post_interest",req.body.top_posts,"id",result.user_id];
                query = mysql.format(query, table);
                console.log(query);
                  //Sending Response
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" ,"err":err });
                    } else {
                        res.json({ "error": false, "Message": "Notification settings has been updated successfully." });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });

    });


     // POST request to follow a user(email template)
    router.post("/users/follow", routeValidator.validate({
        body: {
            user_id: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ?? (??,??) VALUES (?,?)";
                var table = ["follow", "user_id", "follower_id", req.body.user_id, result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    }else {
                      var query = "SELECT * FROM ??  WHERE ?? = ?";
                      var table = ["users", "id", result.user_id];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, rest){
                        if(err){
                          res.json({ "error": true, "Message": "Error executing MySQL query" });
                        }else{
                          var query = "SELECT * FROM ??  WHERE ?? = ?";
                          var table = ["users", "id", req.body.user_id];
                          query = mysql.format(query, table);
                          connection.query(query, function(err,rows){
                            let email = rows[0].email;
                            let firstName = rows[0].first_name;
                            let tableID = rows[0].id;
                            let followerId = rest[0].first_name + ' ' + rest[0].last_name;
                            // emailtemplate.user_follow(email,firstName,followerId,req,res,function(result){});
                            var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                            var table = ["Platform_notifications", "user_id", result.user_id, "table_id", tableID,"reciever_id",req.body.user_id,"type",7,"is_read",0];
                            query = mysql.format(query, table);
                            connection.query(query, function(err, response){
                              if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query","err":err });
                              }else if(response.length!==0){
                              emailtemplate.user_follow(email,firstName,followerId,req,res,function(result){});
                              }else{
                                var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                                var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,req.body.user_id,tableID,7,''+followerId+' Follows you',0];
                                query = mysql.format(query, table);
                                console.log(query);
                                connection.query(query, function(err, ress) {
                                if(err){
                                  return res.json({ "error": true, "Message": "Error executing MySQL query" ,"err":err });
                                }else{
                                emailtemplate.user_follow(email,firstName,followerId,req,res,function(result){});
                                }
                               });
                              }
                           });
                          });
                        }
                      });
                      res.on('end', function(){
                        ({ "error": false, "Message": "User follow successfully" });
                      });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });



    // POST request to unfollow a user
    // router.post("/users/unfollow", routeValidator.validate({
    //     body: {
    //         user_id: { isRequired: true },
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true, isAscii: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "DELETE FROM ?? WHERE ?? = ? AND ?? = ? ";
    //             var table = ["follow", "user_id", req.body.user_id, "follower_id", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Success" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    // POST request update billing method
    router.post("/users/billing", routeValidator.validate({
        body: {
            billing_method: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {
        if (req.body.billing_method == 1) {
            if (req.body.name == undefined) {
                res.status(400);
                res.json({ 'error': true, 'message': 'Name on card is required!' });
                res.end();
                return;
            }
            if (req.body.card == undefined) {
                res.status(400);
                res.json({ 'error': true, 'message': 'Card no. is required!' });
                res.end();
                return;
            }
            if (req.body.card_expiry == undefined) {
                res.status(400);
                res.json({ 'error': true, 'message': 'Card expiry is required!' });
                res.end();
                return;
            }
        }
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.body.billing_method) {
                    var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
                    var table = ["users", "billing_method", req.body.billing_method, "card", req.body.card, "card_expiry", req.body.card_expiry, "name_on_card", req.body.name, "id", result.user_id];
                } else {
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    var table = ["users", "billing_method", req.body.billing_method, "id", result.user_id];
                }
                query = mysql.format(query, table);

                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Payment method ed successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    // POST request to add user details
    router.post("/users/details/add", routeValidator.validate({
        body: {
            student_type: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {
        if (req.body.student_type == 1) {
            if (req.body.course == undefined) {
                res.status(400);
                res.json({ 'error': true, 'message': 'Course is required!' });
                res.end();
                return;
            }
            if (req.body.education_institute == undefined) {
                res.status(400);
                res.json({ 'error': true, 'message': 'Education institute is required!' });
                res.end();
                return;
            }

        } else {
            if (req.body.expertise == undefined) {
                res.status(400);
                res.json({ 'error': true, 'message': 'Area of expertise is required!' });
                res.end();
                return;
            }
            if (req.body.employment_place == undefined) {
                res.status(400);
                res.json({ 'error': true, 'message': 'Place of employment is required!' });
                res.end();
                return;
            }
        }

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
                if (req.body.student_type == 1) {
                    var table = ["users", "student_type", req.body.student_type, "course_id", req.body.course, "institution_name", req.body.education_institute, "id", result.user_id];
                } else {
                    var table = ["users", "student_type", req.body.student_type, "area_of_expertise", req.body.expertise, "employment_place", req.body.employment_place, "id", result.user_id];
                }
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Data saved successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    // POST request to update about me
    router.post("/users/about/add", routeValidator.validate({
        body: {
            about_me: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {

        if (req.body.about_me.length > 100) {
            res.status(400);
            res.json({ 'error': true, 'message': 'Description should be less than 100 words!' });
            res.end();
            return;
        }

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["users", "about_me", req.body.about_me, "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Data saved successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    // POST request to add/update accomplishments
    router.post("/users/accomplishments/add", routeValidator.validate({
        body: {
            accomplishments: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["users", "accomplishments", req.body.accomplishments, "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Data saved successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    // POST request to add/update interests
    // router.post("/users/interests/add", routeValidator.validate({
    //     body: {
    //         interests: { isRequired: true },
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true, isAscii: true }
    //     }
    // }), function(req, res) {
    //     if (req.body.interests.constructor !== Array) {
    //         res.status(400);
    //         res.json({ 'error': true, 'message': 'Interests should be in array format!' });
    //         res.end();
    //         return;
    //     }
    //     if (req.body.interests.length < 5) {
    //         res.status(400);
    //         res.json({ 'error': true, 'message': 'Atleast 5 interests are required!' });
    //         res.end();
    //         return;
    //     }
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    //             var table = ["users", "interests", req.body.interests.join(), "id", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Data saved successfully!" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    // POST request to delete interests
    router.delete("/users/interests/delete/:id", routeValidator.validate({
        body: {

        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["users", "interests", req.body.interests.join(), "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Data saved successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    // POST request to add/update course type
    router.post("/users/coursetype/add", routeValidator.validate({
        body: {
            coursetype: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["users", "course_type", req.body.coursetype, "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Data saved successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    // Report user

    router.post("/users/report", routeValidator.validate({
        body: {
            reason: { isRequired: true },
            user_id: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
                var table = ["report_user", "user_id", "reported_by", "reason", req.body.user_id, result.user_id, req.body.reason];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Data has been saved successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    // user social links

    router.post("/users/social", routeValidator.validate({
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
                var table = ["users", "facebook", req.body.facebook, "linkedin", req.body.linkedin, "twitter", req.body.twitter, "snapchat", req.body.snapchat, "id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Message": "Data has been saved successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    // get user's profile

    router.get("/user/profile", routeValidator.validate({
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) as Username, (SELECT GROUP_CONCAT(title) from interests where id in (users.interests)) as interests, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? FROM ?? left join ?? on ?? = ?? where ?? = ?";
                var table = ["users.email", "users.language", "users.about_me", "users.accomplishments", "users.protect_post", "users.profile_privacy", "users.contact_privacy", "users.is_active", "users.course_id", "cources.name", "users.DOB", "users.institution_name", "users.student_type", "users.area_of_expertise", "users.employment_place", "users.facebook", "users.linkedin", "users.twitter", "users.snapchat", "users", "cources", "users.course_id", "cources.courseId", "users.id", result.user_id];
                query = mysql.format(query, table);
                console.log(query)
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        console.log("Retrieved User Profile");
                        //var interests = rows[0].interests;
                        //var interests_array = interests.split(",");
                        //var i;
                        //var j;
                        //var interests_text = [];
                        //var query1 = "SELECT * FROM ??";
                        //var table1 = ["interests"];
                        //query1 = mysql.format(query1, table1);
                        // getinterests(query1, connection).then(values => {
                        //     console.log("Getting All Interests");
                        //     for (i = 0; i < interests_array.length; i++) {
                        //         interests_text.push(values[interests_array[i] - 1].title);
                        //     }
                        //     rows[0].interests = interests_text;

                        // });
                        console.log("End Of Interest Retrieval");
                        res.json({ "error": false, "Message": "Success", "Users": rows });

                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    function getinterests(query, connection) {
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




    //post request to add credits
    router.post("/user/credits/", routeValidator.validate({
        body: {
            user_id: { isRequired: true },
            credits: { isRequired: true },
            type: { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "Select credits from ?? WHERE ?? = ?";
                var table = ["user_credits", "userId", req.body.user_id];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var old_credits = rows[0].credits;
                        if (req.body.type == "add") {
                            var new_credits = +old_credits + +req.body.credits;
                        } else {
                            var new_credits = +old_credits - +req.body.credits;
                        }
                        var query = "update ?? set ?? = ? WHERE ?? = ?";
                        var table = ["user_credits", "credits", new_credits, "userID", req.body.user_id];
                    } else {
                        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                        var table = ["user_credits", "userID", "credits", req.body.user_id, new_credits];
                    }
                    query = mysql.format(query, table);
                    //res.json(query);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            res.json({ "error": false, "Message": "user credits successfully" });
                        }
                    });
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //post request to add credits in weekly Bonaza
    router.post("/user/weekly_Bonaza/Credits/", routeValidator.validate({
        body: {
            user_id: { isRequired: true },
            credits: { isRequired: true },
            type: { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "Select userCredits from ?? WHERE ?? = ?";
                var table = ["weekly_bonanza", "userId", req.body.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                   if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var old_credits = rows[0].userCredits;
                        console.log(old_credits);
                        if (req.body.type == "add") {
                            var new_credits = +old_credits + +req.body.credits;
                        } else {
                            var new_credits = +old_credits - +req.body.credits;
                        }
                        var query = "update ?? set ?? = ? WHERE ?? = ?";
                        var table = ["weekly_bonanza", "userCredits", new_credits, "userID", req.body.user_id];
                    } else {
                        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                        var table = ["weekly_bonanza", "userID", "userCredits", req.body.user_id, req.body.credits];
                    }
                    query = mysql.format(query, table);
                    console.log(query,req.body.credits);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            res.json({ "error": false, "Message": "user credits successfully" });
                        }
                    });
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //get request to get credits
    router.get("/user/credits/", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "Select credits from ?? WHERE ?? = ?";
                var table = ["user_credits", "userID", result.user_id];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "user Credits", "cedits": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //get request to get intrests
    // router.get("/interests", function(req, res) {
    //     var query = "Select * from ??";
    //     var table = ["interests"];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "all interests", "interests": rows });
    //         }
    //     });
    // });

    //get request to get subintrest
    // router.get("/subinterests/:interestId", function(req, res) {
    //     var query = "Select * from ?? WHERE ?? = ?";
    //     var table = ["subinterests", "interest_id", req.params.interestId];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "all subinterests with interestId", "subinterests": rows });
    //         }
    //     });
    // });

    //get request to get followers
    // router.get("/user/followers/:userId", function(req, res) {
    //     var query = "Select users.* from ?? join ?? on follow.follower_id = users.id WHERE ?? = ?";
    //     var table = ["follow", "users", "user_id", req.params.userId];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "all followers", "followers": rows });
    //         }
    //     });
    // });
    //
    // //get request to get follow
    // router.get("/user/following/:userId", function(req, res) {
    //     var query = "Select users.* from ?? join ?? on follow.user_id = users.id WHERE ?? = ?";
    //     var table = ["follow", "users", "follower_id", req.params.userId];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //
    //             res.json({ "error": false, "Message": "all followers", "followers": rows });
    //         }
    //     });
    // });

    /* put request to update gender */
    // router.put("/updategender/", upload, routeValidator.validate({
    //     body: {
    //         gender: { isRequired: true }
    //     },
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    //             var table = ["users", "gender", req.body.gender, "id", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "User has been updated successfully!" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //get request to get people you may know course, location, gender
    router.get("/user/mayknow/all/:userId", function(req, res) {
        var query = "Select course_id,employment_place,gender  from ?? WHERE ?? = ?";
        var table = ["users", "id", req.params.userId];
        query = mysql.format(query, table);
        //res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {

                var course_id = rows[0].course_id;
                var location = rows[0].employment_place;
                var gender = rows[0].gender;

                var query = "Select users.id,users.first_name,users.last_name,users.email,users.gender,users.propic,users.institution_name, users.employment_place, users.course_id, courses.course as courseName from ?? left join ?? on users.course_id = courses.id WHERE users.employment_place = ? or users.gender !=? or users.course_id = ? and users.id != ?";
                var table = ["users", "courses", location, gender, course_id, req.params.userId];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        let i = 0;
                        rows.forEach((node, index) => {
                            var priority = 0;
                            rows[index].priority = 0;
                            if (location == node.employment_place) {
                                priority = parseInt(priority) + 3;
                            }
                            if (gender != node.gender) {
                                priority = parseInt(priority) + 2;
                            }
                            if (course_id == node.course_id) {
                                priority = parseInt(priority) + 1;
                            }
                            rows[index].priority = priority;
                            rows.sort(function(a, b) {
                                return a.priority - b.priority;
                            });
                            if (index == rows.length - 1) {

                                res.json({ "error": false, "Message": "people you may know", users: rows.reverse() });
                            }

                        });



                    }
                });
            }
        });
    });

    /*
    * Total City User Count
    *
    */
    router.get("/user/cityCount", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select count(id) as users ,?? from ?? GROUP BY ??"
                var table = [ "city","users", "city"];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "City Count Fetched successfully", "city": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


}
