var utils = require('../common/utils');
var emailtemplate = require('../common/emailtemplate');

var path = require('path');
var email = require('../common/email');
var url = require('url');var merge = require('merge');
var uuid = require('uuid');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, Promise, multer, randomstring) {
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './uploads');
        },
        filename: function(req, file, callback) {
            var name = file.originalname;
            var fileminetype = name.split(".");
            callback(null, fileminetype[0] + '-' + uuid.v4() + '.' + fileminetype[1]);
        }
    });

    var upload = multer({ storage: storage }).single('file');
    var multipleUpload = multer({ storage: storage }).array('file');

    /* post requiest to join user with community*/

    // router.post("/community/user", routeValidator.validate({
    //     body: {
    //         'communityId': { isRequired: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    //             var table = ["user_comuunity", "userId", "communityId", result.user_id, req.body.communityId];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Community joined successfully, please wait for admin approval" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    // /* post requiest to join user with community*/

    // router.put("/community/userApproval", routeValidator.validate({
    //   body: {
    //       'userId': { isRequired: true }
    //   },
    //   headers: {
    //       'content-type': { isRequired: true, equals: 'application/json' },
    //       'token': { isRequired: true }
    //   }
    // }), function(req, res) {
    //   utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //       if (result.status == 1) {
    //           var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
    //           var table = ["user_comuunity", "is_approved", "1", "userId", req.body.userId, "communityId", result.user_id];
    //           query = mysql.format(query, table);
    //           connection.query(query, function(err, rows) {
    //               if (err) {
    //                   res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //               } else {
    //                 var query = "SELECT institutionsName FROM ?? WHERE ??=?";
    //                 var table = ["community", "communityId", result.user_id];
    //                 query = mysql.format(query, table);
    //                 connection.query(query, function(err, response) {
    //                   if(err){
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 }else{
    //                     var query = "SELECT email,first_name FROM ?? WHERE ??=?";
    //                     var table = ["users", "id", req.body.userId];
    //                     query = mysql.format(query, table);
    //                     connection.query(query, function(err, rows) {
    //                       if(err){
    //                         res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                       }else{
    //                         var institutions_Name = response[0].institutionsName;
    //                         var user_email = rows[0].email;
    //                         var user_name = rows[0].first_name;
    //                         emailtemplate.user_approved(user_email,user_name,institutions_Name,req,res,function(result){});
    //
    //                       }
    //                     });
    //                   }
    //                 });
    //
    //               }
    //           });
    //       } else {
    //           res.json({ "error": true, "Messages": 'Invalid Token!' });
    //       }
    //   });
    // });


    //post request to add a forum
    // router.post("/community/register", routeValidator.validate({
    //     body: {
    //         'institutionsName': { isRequired: true },
    //         'institutionsEmail': { isRequired: true },
    //         'password': { isRequired: true, isAscii: true, isLength: { min: 8, max: 24 }, message: 'Minimum 8 and maximum 24 characters are allowed!' }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //
    //     //Executing query to select user email from users.
    //     var query = "SELECT institutionsEmail FROM ?? WHERE ??=?";
    //     var table = ["community", "institutionsEmail", req.body.institutionsEmail];
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
    //                 var table = ["community", "institutionsName", "institutionsEmail", "password", "token", req.body.institutionsName, req.body.institutionsEmail, md5(req.body.password), randomstring.generate()];
    //                 query = mysql.format(query, table);
    //                 console.log(query);
    //                 //Sending Reesponse
    //                 connection.query(query, function(err, rows) {
    //                     if (err) {
    //                         res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                     } else {
    //                         res.json({ "error": false, "Message": "community has been Added successfully!" });
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // });


    //POST request to login a user
    // router.post("/community/login", routeValidator.validate({
    //
    //     //Validations
    //     body: {
    //         email: { isRequired: true, isEmail: true, normalizeEmail: true },
    //         password: { isRequired: true, isAscii: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //     }
    // }), function(req, res) {
    //     var query = "SELECT communityId, institutionsName, institutionsEmail, token, created_at, updated_at FROM ?? WHERE ??=? AND ??=?";
    //     var table = ["community", "institutionsEmail", req.body.email, "password", md5(req.body.password)];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //         } else {
    //             if (rows.length > 0)
    //                 res.json({ "error": false, "Message": "Success", "Users": rows });
    //             else
    //                 res.json({ "error": true, "Message": "Invalid email or password" });
    //         }
    //     });
    // });

    /*Post request to update details*/
    // router.post("/community/updateDetails", routeValidator.validate({
    //     //Validations
    //     body: {
    //         institutionsName: { isRequired: true, isAscii: true },
    //         institutionsEmail: { isRequired: true, isAscii: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true, isAscii: true }
    //     }
    // }), function(req, res) {
    //
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
    //             var table = ["community", "institutionsName", req.body.institutionsName, "institutionsEmail", req.body.institutionsEmail, "communityId", result.user_id];
    //             query = mysql.format(query, table);
    //
    //             //Sending Response
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "community details has been updated successfully." });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    //
    // });

    /*POST requset to update password*/
    // router.post("/community/updatePassword", routeValidator.validate({
    //     //Validations
    //     body: {
    //         password: { isRequired: true },
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     var query = "UPDATE ?? SET ?? = ?,?? = ? WHERE ?? = ?";
    //     var table = ["community", "change_pwd", "0", "password", md5(req.body.password), "token", req.headers.token];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query" });
    //         } else {
    //             res.json({ "error": false, "Message": "Password changed successfully" });
    //         }
    //     });
    // });

    //POST request to set new password for a user
    // router.post("/community/setnewpassword", routeValidator.validate({
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
    //     utils.checkCommunityCurrentPassword(req.headers.token, md5(req.body.current_password), mysql, connection, function(result) {
    //         if (!result.status) {
    //             res.status(400);
    //             res.json({ 'error': true, 'message': 'Invalid Current Password!' });
    //             res.end();
    //             return;
    //         } else {
    //             utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //                 if (result.status == 1) {
    //                     var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    //                     var table = ["community", "password", md5(req.body.password), "communityId", result.user_id];
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

    //Post request to inserts courses
    router.post("/community/Course", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.name == '') {
            return res.json({ "error": "body.name is required" });
        } else if (req.body.description == '') {
            return res.json({ "error": "body.description is required" });
        } else if (req.body.courseType == '') {
            return res.json({ "error": "body.courseType is required" });
        } else if (req.body.universityId == '') {
            return res.json({ "error": "body.universityId is required" });
        }
        //return res.json({body: req.body, file: req.file});
        utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.file) {
                    var filenamedata = req.file.filename;
                } else {
                    var filenamedata = "";
                }
                var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                var table = ["cources", "name", "description", "image", "courseType", "universityId", req.body.name, req.body.description, filenamedata, req.body.courseType, req.body.universityId];
                query = mysql.format(query, table);

                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var query = "Select community.institutionsName,user_comuunity.userID From ?? JOIN ?? ON community.communityId = user_comuunity.communityId WHERE ?? = ? ";
                        var table = ["community", "user_comuunity","community.communityId",req.body.universityId];
                        query = mysql.format(query, table);

                        connection.query(query, function(err, rest) {
                        if(err){
                          return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                       }else{
                         let institutionsName = rest[0].institutionsName;
                         for(let i=0;i<rest.length;i++){
                           var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                           var table = ["Platform_notifications", "user_id", req.body.universityId, "table_id", req.body.universityId,"reciever_id",rest[i].userID,"type",9,"is_read",0];
                           query = mysql.format(query, table);
                           connection.query(query, function(err, response){
                            if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            }else if(response.length !== 0){

                            }else{
                              var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                              var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",req.body.universityId,rest[i].userID,req.body.universityId,9,''+institutionsName+' Added New Courses',0];
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
                       }
                   });
                    res.json({ "error": false, "Message": "Course saved successfully" });
                   }
              });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //Put request to update posts
    // router.put("/community/Course/:courseId", upload, routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     if (req.body.name == '') {
    //         return res.json({ "error": "body.name is required" });
    //     } else if (req.body.description == '') {
    //         return res.json({ "error": "body.description is required" });
    //     } else if (req.body.courseType == '') {
    //         return res.json({ "error": "body.courseType is required" });
    //     } else if (req.body.universityId == '') {
    //         return res.json({ "error": "body.universityId is required" });
    //     }
    //     //return res.json({body: req.body, file: req.file});
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             if (req.file) {
    //                 var filenamedata = req.file.filename;
    //                 var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?,  ?? = ?, ?? = ? WHERE ?? = ?";
    //                 var table = ["cources", "name", req.body.name, "description", req.body.description, "image", filenamedata, "courseType", req.body.courseType, "universityId", req.body.universityId, "courseId", req.params.courseId];
    //             } else {
    //                 var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?,  ?? = ? WHERE ?? = ?";
    //                 var table = ["cources", "name", req.body.name, "description", req.body.description, "courseType", req.body.courseType, "universityId", req.body.universityId, "courseId", req.params.courseId];
    //             }
    //
    //             query = mysql.format(query, table);
    //             console.log(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "Don't seems to be your Course" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Course updated successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //Delete request to delete posts
    // router.delete("/community/Course/:courseId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "DELETE from ?? WHERE ??=?";
    //             var table = ["cources", "courseId", req.params.courseId];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "Course has not deleted" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Course deleted successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //post request to get all and alphabet courses
    // router.post("/community/getCourse/", routeValidator.validate({
    //     body: {
    //         communityId: { isRequired: true },
    //         type: { isRequired: true },
    //         searchString: { isRequired: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             if (req.body.searchString == "all") {
    //                 var query = "SELECT * from ?? WHERE ??=? AND ??=?";
    //             } else {
    //                 var query = "SELECT * from ?? WHERE ??=? AND ??=? AND name like '" + req.body.searchString + "%'";
    //             }
    //             var table = ["cources", "universityId", req.body.communityId, "courseType", req.body.type];
    //             query = mysql.format(query, table);
    //             //return res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Courses", "posts": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    /* post requiest to add classes*/

    router.post("/community/course/classes", routeValidator.validate({
        body: {
            'courseId': { isRequired: true },
            'name': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["courseClasses", "courseId", "universityId", "name", req.body.courseId, result.user_id, req.body.name];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var query = "SELECT distinct cources.name,cources.universityId, community.institutionsName, courseClasses.name as className,user_comuunity.userID from ?? JOIN ?? ON cources.courseId = courseClasses.courseId left join ?? on cources.universityId = community.communityId join ?? on cources.universityId = user_comuunity.communityId WHERE ?? = ?";
                        var table = ["cources","courseClasses", "community","user_comuunity","cources.courseId", req.body.courseId];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, response) {
                        for(var i =0;i<response.length;i++){
                        let courceName = response[i].name;
                        let admin_userTableID = response[i].universityId;
                        let communityName = response[i].institutionsName;
                        let className = response[i].className;
                        let reciever_id = response[i].userID; // receiever id as user_id becausekey same for get
                        var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                        var table = ["Platform_notifications", "user_id", admin_userTableID, "table_id", admin_userTableID,"reciever_id",reciever_id,"type",10,"is_read",0];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, restt){
                        if(err){
                          return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        }else if(restt.length !== 0){

                        }else{
                          var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                          var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",admin_userTableID,reciever_id,admin_userTableID,10,''+className+' class added Under Course '+courceName+' in '+communityName+'',0];
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
                         res.json({ "error": false, "Message": "class added successfully!" });
                       });
                      }
                    });
                    } else {
                        res.json({ "error": true, "Messages": 'Invalid Token!' });
                    }
                  });
              });





    /* post request to update classes*/

    // router.put("/community/course/classes/:classId", routeValidator.validate({
    //     body: {
    //         'courseId': { isRequired: true },
    //         'name': { isRequired: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "UPDATE ?? SET ?? = ?, ?? = ?  WHERE ?? = ? AND ?? = ?";
    //             var table = ["courseClasses", "courseId", req.body.courseId, "name", req.body.name, "universityId", result.user_id, "classId", req.params.classId];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Class Update successfully!" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    //Delete request to delete class
    // router.delete("/community/course/classes/:classId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "DELETE from ?? WHERE ??=? AND ?? = ?";
    //             var table = ["courseClasses", "classId", req.params.classId, "universityId", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "Class hasnot deleted" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Class deleted successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //post request to add users class
    // router.post("/community/user/classes/", routeValidator.validate({
    //     body: {
    //         "classIds": { isRequired: true }
    //     },
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var class_str = req.body.classIds;
    //             var class_array = class_str.split(',');
    //             if (class_array.length > 7) {
    //                 return res.json({ "error": true, "Message": "Classes must be less than 7" });
    //             }
    //             var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    //             var table = ["userClasses", "userId", "classIds", result.user_id, req.body.classIds];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "classes added successfully!" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //put request to update users class
    // router.put("/community/user/classes/", routeValidator.validate({
    //     body: {
    //         "classIds": { isRequired: true }
    //     },
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var class_str = req.body.classIds;
    //             var class_array = class_str.split(',');
    //             if (class_array.length > 7) {
    //                 return res.json({ "error": true, "Message": "Classes must be less than 7" });
    //             }
    //             var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    //             var table = ["userClasses", "classIds", req.body.classIds, "userId", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "classes updated successfully!" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //get request to check users class
    // router.get("/community/user/classes/", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "SELECT * FROM ?? WHERE ?? = ?";
    //             var table = ["userClasses", "userId", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Check Classes", "rows": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //Post request to inserts courses
    router.post("/groups/", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.name == '') {
            return res.json({ "error": "body.name is required" });
        } else if (req.body.description == '') {
            return res.json({ "error": "body.description is required" });
        } else if (req.body.adminEmail == '') {
            return res.json({ "error": "body.adminEmail is required" });
        } else if (req.body.privacy == '') {
            return res.json({ "error": "body.privacy is required" });
        } else if (req.body.instituteId == '') {
            return res.json({ "error": "body.instituteId is required" });
        }
        //return res.json({body: req.body, file: req.file});
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.file) {
                    var filenamedata = req.file.filename;
                } else {
                    var filenamedata = "";
                }
                if (req.body.privacy == "1") {
                    var is_active = 0;
                } else {
                    var is_active = 1;
                }
                var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
                var table = ["groups", "name", "userId", "instituteId", "description", "adminEmail", "image", "privacy", "is_active", req.body.name, result.user_id, req.body.instituteId, req.body.description, req.body.adminEmail, filenamedata, req.body.privacy, is_active];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                  }else {
                   var query = "SELECT DISTINCT groups.name,groups.userId as makerID,groups.groupId,community.institutionsName,community.communityId,user_comuunity.userID FROM ?? JOIN ?? ON groups.instituteId = community.communityId JOIN ?? on community.communityId = user_comuunity.communityId WHERE ?? = ?";
                   var table = ["groups","community","user_comuunity","groups.instituteId", req.body.instituteId];
                   query = mysql.format(query, table);
                   connection.query(query, function(err, resp) {
                    for(let i =0;i<resp.length;i++){
                     let groupName = resp[i].name;
                     let makerID = resp[i].makerID;
                     let reciever_id = resp[i].userID;
                     let tableId = resp[i].groupId;
                     let communityName = resp[i].institutionsName;
                     let message = ''+groupName+' group added in '+communityName+'';
                     var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                     var table = ["Platform_notifications", "user_id", makerID,"reciever_id",reciever_id,"type",11,"is_read",0,"message",message];
                     query = mysql.format(query, table);
                     connection.query(query, function(err, restt){
                     if(err){
                       return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                     }else if(restt.length !== 0){

                     }else{
                       var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                       var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",makerID,reciever_id,tableId,11,''+groupName+' group added in '+communityName+'',0];
                       query = mysql.format(query, table);
                       connection.query(query, function(err, ress) {});
                     }
                     });
                    }
                    res.json({ "error": false, "Message": "Group saved successfully" });

                   });
                  }
                });
              } else {
                  res.json({ "error": true, "Messages": 'Invalid Token!' });
              }
          });
      });

    //Put request to update posts
    // router.put("/groups/:groupId", upload, routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     if (req.body.name == '') {
    //         return res.json({ "error": "body.name is required" });
    //     } else if (req.body.description == '') {
    //         return res.json({ "error": "body.description is required" });
    //     } else if (req.body.adminEmail == '') {
    //         return res.json({ "error": "body.adminEmail is required" });
    //     } else if (req.body.privacy == '') {
    //         return res.json({ "error": "body.privacy is required" });
    //     } else if (req.body.instituteId == '') {
    //         return res.json({ "error": "body.instituteId is required" });
    //     }
    //     //return res.json({body: req.body, file: req.file});
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             if (req.file) {
    //                 var filenamedata = req.file.filename;
    //                 var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?,  ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?";
    //                 var table = ["groups", "name", req.body.name, "instituteId", req.body.instituteId, "description", req.body.description, "adminEmail", req.body.adminEmail, "image", filenamedata, "privacy", req.body.privacy, "userId", result.user_id, "groupId", req.params.groupId];
    //             } else {
    //                 var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?,  ?? = ? WHERE ?? = ? AND ?? = ?";
    //                 var table = ["groups", "name", req.body.name, "instituteId", req.body.instituteId, "description", req.body.description, "adminEmail", req.body.adminEmail, "privacy", req.body.privacy, "userId", result.user_id, "groupId", req.params.groupId];
    //             }
    //
    //             query = mysql.format(query, table);
    //             //console.log(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "Don't seems to be your Group" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Group updated successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    //Delete request to delete class
    // router.delete("/groups/:groupId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "DELETE from ?? WHERE ??=? AND ?? = ?";
    //             var table = ["groups", "groupId", req.params.groupId, "userId", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "Group hasnot deleted" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Group deleted successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //get request to get all groups
    // router.get("/groups/:privacyId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "select * from ?? where ??=? AND ??=?";
    //             var table = ["groups", "userId", result.user_id, "privacy", req.params.privacyId];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Users Group", "groups": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //put request to update group privacy
    // router.put("/approvegroup/:groupId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "update ?? set ?? = ? WHERE ??=? AND ?? = ?";
    //             var table = ["groups", "is_active", "1", "groupId", req.params.groupId, "instututeId", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "Group hasnot approved" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Group approved successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });




    /* socities and clubs */

    //Post request to inserts courses
    router.post("/socitiesclubs/", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.name == '') {
            return res.json({ "error": "body.name is required" });
        } else if (req.body.description == '') {
            return res.json({ "error": "body.description is required" });
        } else if (req.body.instituteId == '') {
            return res.json({ "error": "body.instituteId is required" });
        }
        //return res.json({body: req.body, file: req.file});
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.file) {
                    var filenamedata = req.file.filename;
                } else {
                    var filenamedata = "";
                }
                var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                var table = ["socitiesclubs", "userId", "instituteId", "name", "description", "image", result.user_id, req.body.instituteId, req.body.name, req.body.description, filenamedata];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        //
                     var query = "SELECT distinct socitiesclubs.name,socitiesclubs.userId as makerID,socitiesclubs.instituteId,socitiesclubs.socitiesclubsId,community.institutionsName,user_comuunity.userID FROM ?? JOIN ?? ON socitiesclubs.instituteId = community.communityId JOIN ?? ON user_comuunity.communityId = community.communityId WHERE ?? = ?";
                      var table = ["socitiesclubs","community","user_comuunity","socitiesclubs.instituteId", req.body.instituteId];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, resp) {
                        for(let i =0;i<resp.length;i++){
                        let societyName = resp[i].name;
                        let userId = result.user_id;
                        let reciever_id = resp[i].userID;
                        let tableId = resp[i].socitiesclubsId;
                        let communityName = resp[i].institutionsName;
                        let message = ''+societyName+' added in '+communityName+'';
                        var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                        var table = ["Platform_notifications", "user_id", result.user_id,"reciever_id",reciever_id,"type",12,"is_read",0,"message",message];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, restt){
                        if(err){
                          return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        }else if(restt.length !== 0){

                        }else{
                          var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                          var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,reciever_id,tableId,12,message,0];
                          query = mysql.format(query, table);
                          connection.query(query, function(err, ress) {});
                        }
                        });
                       }
                       res.json({ "error": false, "Message": "Socities and Clubs saved successfully" });

                      });
                    }
              });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //Put request to update posts
    // router.put("/socitiesclubs/:socitiesclubsId", upload, routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     if (req.body.name == '') {
    //         return res.json({ "error": "body.name is required" });
    //     } else if (req.body.description == '') {
    //         return res.json({ "error": "body.description is required" });
    //     } else if (req.body.adminEmail == '') {
    //         return res.json({ "error": "body.adminEmail is required" });
    //     } else if (req.body.privacy == '') {
    //         return res.json({ "error": "body.privacy is required" });
    //     } else if (req.body.instituteId == '') {
    //         return res.json({ "error": "body.instituteId is required" });
    //     }
    //     //return res.json({body: req.body, file: req.file});
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             if (req.file) {
    //                 var filenamedata = req.file.filename;
    //                 var query = "UPDATE ?? SET ?? = ?, ?? = ?,  ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?";
    //                 var table = ["socitiesclubs", "name", req.body.name, "instituteId", req.body.instituteId, "description", req.body.description, "image", filenamedata, "userId", result.user_id, "socitiesclubsId", req.params.socitiesclubsId];
    //             } else {
    //                 var query = "UPDATE ?? SET  ?? = ?, ?? = ?,  ?? = ? WHERE ?? = ? AND ?? = ?";
    //                 var table = ["socitiesclubs", "name", req.body.name, "instituteId", req.body.instituteId, "description", req.body.description, "userId", result.user_id, "socitiesclubsId", req.params.socitiesclubsId];
    //             }
    //
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "Don't seems to be your Socitity" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Socitity updated successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    //Delete request to delete class
    // router.delete("/socitiesclubs/:socitiesclubsId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "DELETE from ?? WHERE ??=? AND ?? = ?";
    //             var table = ["socitiesclubs", "socitiesclubsId", req.params.socitiesclubsId, "userId", result.user_id];
    //             query = mysql.format(query, table);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else if (rows.affectedRows == 0) {
    //                     res.json({ "error": true, "Message": "socitity hasnot deleted" });
    //                 } else {
    //                     res.json({ "error": false, "Message": "socitity deleted successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    //get request to get all groups
    // router.get("/socitiesclubs/:instituteId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "select * from ?? where ??=? AND ??=?";
    //             var table = ["socitiesclubs", "userId", result.user_id, "instituteId", req.params.instituteId];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Users Group", "groups": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //get request to get all groups
    // router.get("/socitiesclubs/all/:instituteId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "select * from ?? where ??=?";
    //             var table = ["socitiesclubs", "instituteId", req.params.instituteId];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Users Group", "groups": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    // POST request to follow a socitiesclubs
    router.post("/socitiesclubs/user/follow/", routeValidator.validate({
        body: {
            socitiesclubsId: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ?? (??,??) VALUES (?,?)";
                var table = ["socitiesclubsFollows", "userId", "socitiesclubsId", result.user_id, req.body.socitiesclubsId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                     var query = "SELECT socitiesclubsFollows.userID as followerUserId ,socitiesclubs.name,socitiesclubs.userId as followRecieverId,socitiesclubsFollows.socitifollowId as tableId,users.first_name,users.last_name FROM ?? JOIN ?? ON socitiesclubsFollows.socitiesclubsId = socitiesclubs.socitiesclubsId JOIN ?? ON users.id = socitiesclubsFollows.userID WHERE ?? = ?";
                      var table = ["socitiesclubsFollows","socitiesclubs","users","socitiesclubsFollows.socitiesclubsId",req.body.socitiesclubsId];
                      query = mysql.format(query, table);
                      console.log(query);
                    connection.query(query, function(err, resp) {
                       for(let i =0;i<resp.length;i++){
                        let societyName = resp[i].name;
                        let userID = resp[i].followerUserId;
                        let receieverID = resp[i].followRecieverId;
                        let tableId = resp[i].tableId;
                        let userFollowerName = resp[i].first_name + ' ' + resp[i].last_name;
                        let message = ''+userFollowerName+' follows your '+societyName+'';
                        var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                        var table = ["Platform_notifications", "user_id", userID,"reciever_id",receieverID,"type",13,"is_read",0,"message",message];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, restt){
                          if(err){
                            return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                          }else if(restt.length !== 0){

                          }else{
                            var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                            var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",userID,receieverID,tableId,13,message,0];
                            query = mysql.format(query, table);
                            connection.query(query, function(err, ress) {});
                          }
                        });
                      }
                        res.json({ "error": false, "Message": "Success" });
                      });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });



    // delete request to unfollow a user
    // this one has been change to delete route in the new implementation
    // router.post("/socitiesclubs/user/unfollow/", routeValidator.validate({
    //     body: {
    //         socitiesclubsId: { isRequired: true },
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true, isAscii: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "DELETE FROM ?? WHERE ?? = ? AND ?? = ? ";
    //             var table = ["socitiesclubsFollows", "userId", result.user_id, "socitiesclubsId", req.body.socitiesclubsId];
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

    //get request to get all groups
    router.get("/userclubs/", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select socitiesclubsId from ?? where ??=?";
                var table = ["socitiesclubsFollows", "userID", result.user_id];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var array = rows.map(function(value, index) {
                            return [value.socitiesclubsId];
                        });
                        var string_arr = array.join(" OR socitiesclubsId = ");

                        var query = "select * from ?? where ??= " + string_arr + "";
                        var table = ["socitiesclubs", "socitiesclubsId"];
                        query = mysql.format(query, table);
                        //res.json(query);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {
                                res.json({ "error": false, "Message": "Users Group", "groups": rows });
                            }
                        });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* Market Place campus */

    //Post request to inserts courses
    // router.post("/marketplace/", multipleUpload, routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //
    //     var image = req.files && req.files.map(image => image.filename);
    //
    //     if(image !== undefined )
    //     {
    //        image = image.join(',');
    //     } else {
    //         image ="";
    //     }
    //
    //     if (req.body.name == '') {
    //         return res.json({ "error": "body.name is required" });
    //     } else if (req.body.description == '') {
    //         return res.json({ "error": "body.description is required" });
    //     } else if (req.body.Email == '') {
    //         return res.json({ "error": "body.adminEmail is required" });
    //     } else if (req.body.phone == '') {
    //         return res.json({ "error": "body.phone is required" });
    //     } else if (req.body.instituteId == '') {
    //         return res.json({ "error": "body.instituteId is required" });
    //     }
    //     //return res.json({body: req.body, file: req.file});
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             if (req.file) {
    //                 var filenamedata = req.file.filename;
    //             } else {
    //                 var filenamedata = "";
    //             }
    //             if (req.body.privacy == "1") {
    //                 var is_active = 0;
    //             } else {
    //                 var is_active = 1;
    //             }
    //             var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    //             var table = ["marketPlace", "userId", "instituteId", "name", "description", "email", "phone", "image", "price", "location", "author", "edition", result.user_id, req.body.instituteId, req.body.name, req.body.description, req.body.email, req.body.phone, image, req.body.price, req.body.location, req.body.author, req.body.edition];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             console.log(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Add saved successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    // delete request to unfollow a user
    // router.delete("/marketplace/:addId", routeValidator.validate({
    //     headers: {
    //         //'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true, isAscii: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "DELETE FROM ?? WHERE ?? = ? AND ?? = ? ";
    //             var table = ["marketPlace", "userId", result.user_id, "marketplaceId", req.params.addId];
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



    //get request to get all groups
    // router.get("/marketplace/all/:instituteId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "select * from ?? where ??=?";
    //             var table = ["marketPlace", "instituteId", req.params.instituteId];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "adds", "adds": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //get request to get all groups
    // router.get("/marketplace/:addId", routeValidator.validate({
    //     headers: {
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "select * from ?? where ??=?";
    //             var table = ["marketPlace", "marketplaceId", req.params.addId];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "adds", "adds": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    /* Jobs */

    // router.post("/jobs/", routeValidator.validate({
    //     body: {
    //         'title': { isRequired: true },
    //         'description': { isRequired: true },
    //         'type': { isRequired: true },
    //         'hoursPerWeek': { isRequired: true },
    //         'pricePerHour': { isRequired: true },
    //         'location': { isRequired: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     /*utils.checkToken(req.headers.token, mysql, connection, function (result) {
    //         if(result.status == 1) {*/
    //     var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
    //     var table = ["jobs", "title", "description", "type", "hoursPerWeek", "pricePerHour", "location", req.body.title, req.body.description, req.body.type, req.body.hoursPerWeek, req.body.pricePerHour, req.body.location];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "job added successfully" });
    //         }
    //     });
    //     /*} else {
    //             res.json({"error" : true, "Messages" : 'Invalid Token!'});
    //         }
    //     });*/
    // });

    /* put requiest to join user with community*/

    // router.put("/jobs/:jobId", routeValidator.validate({
    //     body: {
    //         'title': { isRequired: true },
    //         'description': { isRequired: true },
    //         'type': { isRequired: true },
    //         'hoursPerWeek': { isRequired: true },
    //         'pricePerHour': { isRequired: true },
    //         'location': { isRequired: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         //'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     /*utils.checkCommunityToken(req.headers.token, mysql, connection, function (result) {
    //         if(result.status == 1) {*/
    //     var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
    //     var table = ["jobs", "title", req.body.title, "description", req.body.description, "type", req.body.type, "hoursPerWeek", req.body.hoursPerWeek, "pricePerHour", req.body.pricePerHour, "location", req.body.location, "jobId", req.params.jobId];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "Success" });
    //         }
    //     });
    //     /*} else {
    //             res.json({"error" : true, "Messages" : 'Invalid Token!'});
    //         }
    //     });*/
    // });


    //Delete request to delete posts
    // router.delete("/jobs/:jobId", function(req, res) {
    //     /*utils.checkCommunityToken(req.headers.token, mysql, connection, function (result) {
    //         if(result.status == 1) {*/
    //     var query = "DELETE from ?? WHERE ??=?";
    //     var table = ["jobs", "jobId", req.params.jobId];
    //     query = mysql.format(query, table);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else if (rows.affectedRows == 0) {
    //             res.json({ "error": true, "Message": "job hasnot deleted" });
    //         } else {
    //             res.json({ "error": false, "Message": "job deleted successfully" });
    //         }
    //     });
    //     /* } else {
    //             res.json({"error" : true, "Messages" : 'Invalid Token!'});
    //         }
    //     });*/
    // });

    //get request to get all groups
    // router.get("/section/jobs/all/", function(req, res) {
    //     /*utils.checkToken(req.headers.token, mysql, connection, function (result) {
    //          if(result.status == 1) {*/
    //     var query = "select * from ??";
    //     var table = ["jobs"];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "adds", "adds": rows });
    //         }
    //     });
    //     /*} else {
    //             res.json({"error" : true, "Messages" : 'Invalid Token!'});
    //         }
    //     });*/
    // });

    //get request to get all groups
    // router.get("/jobs/single/:jobId", function(req, res) {
    //     /*utils.checkToken(req.headers.token, mysql, connection, function (result) {
    //          if(result.status == 1) {*/
    //     var query = "select * from ?? WHERE ?? = ?";
    //     var table = ["jobs", "jobId", req.params.jobId];
    //     query = mysql.format(query, table);
    //     //res.json(query);
    //     connection.query(query, function(err, rows) {
    //         if (err) {
    //             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //         } else {
    //             res.json({ "error": false, "Message": "adds", "adds": rows });
    //         }
    //     });
    //     /*} else {
    //             res.json({"error" : true, "Messages" : 'Invalid Token!'});
    //         }
    //     });*/
    // });


    //get request to get all groups
    // router.get("/community/getUser/class/:classId", routeValidator.validate({
    //     headers: {
    //         //'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "select userID from ?? WHERE ?? like '%" + req.params.classId + "%'";
    //             var table = ["userClasses", "classIds"];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     var array = rows.map(function(value, index) {
    //                         return [value.userID];
    //                     });
    //                     var ids = array.join(' OR `id`=');
    //                     var query = "select * from ?? WHERE ?? = " + ids;
    //                     var table = ["users", "id"];
    //                     query = mysql.format(query, table);
    //                     //res.json(query);
    //                     connection.query(query, function(err, rows) {
    //                         if (err) {
    //                             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                         } else {
    //                             res.json({ "error": false, "Message": "adds", "adds": rows });
    //                         }
    //                     });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //get request to get all groups
    // router.get("/community/getUser/socities/:sacid", routeValidator.validate({
    //     headers: {
    //         //'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "select userID from ?? WHERE ?? like '%" + req.params.sacid + "%'";
    //             var table = ["socitiesclubsFollows", "socitiesclubsId"];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     var array = rows.map(function(value, index) {
    //                         return [value.userID];
    //                     });
    //                     var ids = array.join(' OR `id`=');
    //                     var query = "select * from ?? WHERE ?? = " + ids;
    //                     var table = ["users", "id"];
    //                     query = mysql.format(query, table);
    //                     //res.json(query);
    //                     connection.query(query, function(err, rows) {
    //                         if (err) {
    //                             res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                         } else {
    //                             res.json({ "error": false, "Message": "adds", "adds": rows });
    //                         }
    //                     });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    /*Polls*/
    /*Post requset to create polls*/
    router.post("/polls/", routeValidator.validate({
        body: {
            'name': { isRequired: true },
            'classId': { isRequired: true },
            'options': { isRequired: true },
            'timeLimit': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var poll_option_string = req.body.options;
                var poll_option_array = poll_option_string.split(',');

                var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
                var table = ["polls", "name", "userId", "classId", "timeLimit", req.body.name, result.user_id, req.body.classId, req.body.timeLimit];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                if (err) {
                    res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                } else {
                    var pollId = rows.insertId
                    poll_option_array.forEach(node => {
                        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                        var table = ["polls_options", "name", "pollId", node, pollId];
                        query = mysql.format(query, table);
                        // res.json(query);
                        connection.query(query, function(err, rows) {
                          if (err) {
                              res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                          } else {
                                    //res.json({ "error": false, "Message": "poll added successfully" });
                var query = "SELECT polls.name as pollName,polls.userId as makerID,polls.classId ,polls.pollId,courseClasses.name as   className,courseClasses.universityId,user_comuunity.userID,users.first_name,users.last_name,community.institutionsName FROM ?? JOIN ?? ON polls.classId = courseClasses.classId JOIN ?? ON courseClasses.universityId = community.communityId JOIN ?? ON user_comuunity.communityId = courseClasses.universityId JOIN ?? ON users.id = user_comuunity.userID WHERE ?? = ?";
                var table = ["polls","courseClasses","community","user_comuunity","users","polls.classId",req.body.classId];
                query = mysql.format(query, table);
                connection.query(query, function(err, resp) {
              for(let i=0;i<resp.length;i++){
                 let pollName = resp[i].pollName;
                 let userId = resp[i].makerID;
                 let classId = resp[i].classId;
                 let pollId = resp[i].pollId;
                 let recieverId = resp[i].userID;
                 let userName = resp[i].first_name + ' ' + resp[i].last_name;
                 let communityName = resp[i].institutionsName;
                 let className = resp[i].className;
                 let message = ''+pollName+' added in '+className+' under '+communityName+'';
                 var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                 var table = ["Platform_notifications", "user_id", userId,"reciever_id",recieverId,"type",14,"is_read",0,"message",message];
                 query = mysql.format(query, table);
                 connection.query(query, function(err, restt){
                   if(err){
                     return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                   }else if(restt.length !== 0){

                   }else{
                     var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                     var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",userId,recieverId,pollId,14,message,0];
                     query = mysql.format(query, table);
                     connection.query(query, function(err, ress) {});
                   }
                 });
                }
              });
             }
          });
        });
         res.json({ "error": false, "Message": "poll added successfully" });
       }
    });
  } else {
          res.json({ "error": true, "Messages": 'Invalid Token!' });
      }
  });
});


    /* put requiest to join user with community*/

    router.put("/polls/:PollId", routeValidator.validate({
        body: {
            'name': { isRequired: true },
            'timeLimit': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?";
                var table = ["polls", "name", req.body.name, "timeLimit", req.body.timeLimit, "PollId", req.params.PollId, "userId", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Success" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* put requiest to join user with community*/

    router.put("/pollsOptions/:optionId", routeValidator.validate({
        body: {
            'name': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["polls_options", "name", req.body.name, "optionId", req.params.optionId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Success" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request for polls
    router.get("/polls/all/:classId", function(req, res) {

        var query = "select * from ?? WHERE ??=? AND ?? = ?";
        var table = ["polls", "classId", req.params.classId, "is_active", "1"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var thread_array = [];
                var j;
                var k;
                var count_arr = [];
                for (i = 0; i < rows.length; i++) {
                    rows[i].options = "";
                    var query = "select * from ?? WHERE ??=?";
                    var table = ["polls_options", "pollId", rows[i].pollId];
                    query = mysql.format(query, table);
                    thread_array.push(promise_query(query, connection));
                }

                Promise.all(thread_array).then(values => {
                    rows = rows.map(function(forum, index) {
                        return merge(forum, { options: values[index] })
                    });

                    for (j = 0; j < rows.length; j++) {
                        var option_array = rows[j].options;
                        for (var k = 0; k < option_array.length; k++) {
                            option_array[k].count = "";
                            var query = "select count(*) as count from ?? WHERE ??=?";
                            var table = ["userspolls", "optionId", option_array[k].optionId];
                            query = mysql.format(query, table);
                            count_arr[j] = count_arr[j] || [];
                            count_arr[j].push(promise_query(query, connection));
                        }
                    }

                    reslovePromises(count_arr)
                        .then(values => {

                            final = rows.map((forum, index) => {

                                forum.options = option_array.map((option, ind) => {
                                    return merge(option, { count: values[index][ind] });
                                });

                                return forum
                            });

                            res.json({ "error": false, "Message": "polls", "rows": final });
                        })
                });
            }
        });

    });



    //get request for polls
    router.get("/polls/:pollId", function(req, res) {

        var query = "select * from ?? WHERE ??=? AND ??=?";
        var table = ["polls", "pollId", req.params.pollId, "is_active", "1"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var thread_array = [];
                for (var i = 0; i < rows.length; i++) {
                    rows[i].options = "";
                    var query = "select * from ?? WHERE ??=?";
                    var table = ["polls_options", "pollId", rows[i].pollId];
                    query = mysql.format(query, table);
                    thread_array.push(promise_query(query, connection));
                }
                Promise.all(thread_array).then(values => {
                    rows = rows.map(function(forum, index) {
                        return merge(forum, { options: values[index] })
                    });
                    for (let j = 0; j < rows.length; j++) {
                        let option_array = rows[j].options;
                        for (let k = 0; k < option_array.length; k++) {
                            option_array[k].count = '';
                            var query = "select count(*) as count from ?? WHERE ??=?";
                            var table = ["userspolls", "optionId", option_array[k].optionId];
                            query = mysql.format(query, table);
                            connection.query(query, function(err, countRows) {
                                if (err) {
                                    res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                } else {
                                    option_array[k].count = countRows;
                                }
                                if ((k == option_array.length - 1) && (j == rows.length - 1)) {
                                    res.json({ "error": false, "Message": "polls", "rows": rows });
                                }
                            });
                        }

                    }

                });
            }
        });

    });


    /*Post requset to create polls*/
    router.post("/UserPolls/", routeValidator.validate({
        body: {
            'pollId': { isRequired: true },
            'optionId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {

                var query = "select * FROM ?? WHERE ?? = ? AND ?? = ?";
                var table = ["userspolls", "userId", result.user_id, "pollId", req.body.pollId];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length > 0) {
                        res.json({ "error": false, "Message": "you already vote for this poll" });
                    } else {
                        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                        var table = ["userspolls", "userId", "pollId", "optionId", result.user_id, req.body.pollId, req.body.optionId];
                        query = mysql.format(query, table);
                        // res.json(query);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {
                                res.json({ "error": false, "Message": "vote added successfully" });
                            }
                        });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request for polls
    router.get("/checkpolls/", function(req, res) {

        var query = "select * from ??";
        var table = ["polls"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                let rowsCount = rows.length;
                for (let i = 0; i < rowsCount; i++) {
                    var date_txt = rows[i].updated_at;
                    var today = new Date(date_txt);
                    var newdate = new Date();
                    newdate.setDate(today.getDate() + rows[i].timeLimit);

                    var modified_date = new Date(newdate);
                    var today_date = new Date();
                    if (modified_date <= today_date) {
                        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                        var table = ["polls", "is_active", "0", "pollId", rows[i].pollId];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {

                            }
                        });
                    }
                    if (i == rowsCount - 1) {
                        res.json({ "error": false, "Message": "success" });
                    }
                }
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

    function reslovePromises(Promises) {

        let PromiseValues = [];

        return new Promise((res, rej) => {
            Promises.forEach((query, index) => {

                Promise.all(query).then(values => {

                    PromiseValues.push(values);

                    if (index == Promises.length - 1) {
                        res(PromiseValues)
                    }

                })

            })
        })

    }

}
