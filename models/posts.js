var utils = require('../common/utils');
var emailtemplate = require('../common/emailtemplate');

var path = require('path');
var email = require('../common/email');
var url = require('url');

var merge = require('merge');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, Promise, multer) {
    //Image upload middleware
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

    //Post request to inserts posts
    router.post("/post/add", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.category_id == '') {
            return res.json({ "error": "body.category_id is required" });
        } else if (req.body.title == '') {
            return res.json({ "error": "body.title is required" });
        } else if (req.body.description == '') {
            return res.json({ "error": "body.description is required" });
        } else if (req.body.type == '') {
            return res.json({ "error": "body.type is required" });
        } else if (req.body.type == 2) {
            if (req.body.courseId == "") {
                return res.json({ "error": "body.courseId is required" });
            } else if (req.body.classId == "") {
                return res.json({ "error": "body.classId is required" });
            }
        } else if (req.body.type == 3) {
            if (req.body.groupId == "") {
                return res.json({ "error": "body.groupId is required" });
            }
        } else if (req.body.type == 4) {
            if (req.body.socityclubId == "") {
                return res.json({ "error": "body.socityclubId is required" });
            }
        }
        //return res.json({body: req.body, file: req.file});
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.file) {
                    var filenamedata = req.file.filename;
                } else {
                    var filenamedata = "";
                }
                if (req.body.type == 2) {
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
                    var table = ["posts", "author_id", "category_id", "title", "description", "image", "type", "courseId", "classId", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, req.body.courseId, req.body.classId, "1"];
                } else if (req.body.type == 3) {
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
                    var table = ["posts", "author_id", "category_id", "title", "description", "image", "type", "groupId", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, req.body.groupId, "1"];
                } else if (req.body.type == 4) {
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
                    var table = ["posts", "author_id", "category_id", "title", "description", "image", "type", "sacId", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, req.body.socityclubId, "1"];
                } else {
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
                    var table = ["posts", "author_id", "category_id", "title", "description", "image", "type", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, "1"];
                }

                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {

                        // res.json({ "error": false, "Message": "Post saved successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //Put request to update posts
    router.put("/post/:postId", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.category_id == '') {
            return res.json({ "error": "body.category_id is required" });
        } else if (req.body.title == '') {
            return res.json({ "error": "body.title is required" });
        } else if (req.body.description == '') {
            return res.json({ "error": "body.description is required" });
        } else if (req.body.type == 2) {
            if (req.body.courseId == "") {
                return res.json({ "error": "body.courseId is required" });
            } else if (req.body.classId == "") {
                return res.json({ "error": "body.classId is required" });
            }
        } else if (req.body.type == 3) {
            if (req.body.groupId == "") {
                return res.json({ "error": "body.groupId is required" });
            }
        } else if (req.body.type == 4) {
            if (req.body.socityclubId == "") {
                return res.json({ "error": "body.socityclubId is required" });
            }
        }
        //return res.json({body: req.body, file: req.file});
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.file) {
                    var filenamedata = "`image` = '" + req.file.filename + "',";

                } else {
                    var filenamedata = "";
                }
                if (req.body.type == 2) {
                    var query = "UPDATE ?? SET " + filenamedata + " ?? = ?, ?? = ?,  ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description, "courseId", req.body.courseId, "classId", req.body.classId, "id", req.params.postId, "author_id", result.user_id];
                } else if (req.body.type == 3) {
                    var query = "UPDATE ?? SET " + filenamedata + " ?? = ?, ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description, "groupId", req.body.groupId, "id", req.params.postId, "author_id", result.user_id];
                } else if (req.body.type == 4) {
                    var query = "UPDATE ?? SET " + filenamedata + " ?? = ?, ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description, "sacId", req.body.socityclubId, "id", req.params.postId, "author_id", result.user_id];
                } else {
                    var query = "UPDATE ?? SET " + filenamedata + " ?? = ?, ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description, "id", req.params.postId, "author_id", result.user_id];
                }
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "Don't seems to be your post" });
                    } else {
                        res.json({ "error": false, "Message": "Post updated successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //Delete request to delete posts
    router.delete("/post/:postId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                var table = ["posts", "id", req.params.postId, "author_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "Post hasnot deleted" });
                    } else {
                        res.json({ "error": false, "Message": "Post deleted successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });



    //     //post request to like/Unlike posts
        router.post("/post/like", routeValidator.validate({
            body: {
                'post_id': { isRequired: true }
            },
            headers: {
                'token': { isRequired: true }
            }
        }), function(req, res) {
            utils.checkToken(req.headers.token, mysql, connection, function(result) {
                if (result.status == 1) {
                  var query = "select author_id from ?? where ?? = ?";
                  var table = ["posts","id", req.body.post_id];
                  query = mysql.format(query, table);
                  connection.query(query, function(err, authorID) {
                  if(err){
                    res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                  }else{
                    var authorId = authorID[0].author_id;
                    var query = "select first_name,last_name from ?? where ?? = ?";
                    var table = ["users", "id", result.user_id];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, userName){
                    if(err){
                      return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    }else{
                      var user_name = userName[0].first_name + ' ' + userName[0].last_name;
                      var query = "select * from ?? where ?? = ? and ?? = ?";
                      var table = ["post_likes", "user_id", result.user_id, "post_id", req.body.post_id];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else if (rows.length != 0) {
                            var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                            var table = ["post_likes", "user_id", result.user_id, "post_id", req.body.post_id];
                            var json_text = "Post unlike successfully";
                        } else {
                            var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                            var table = ["post_likes", "user_id", "post_id", result.user_id, req.body.post_id];
                            var json_text = "Post like successfully";
                        }
                        query = mysql.format(query, table);
                        connection.query(query, function(err, rows) {
                         if (err) {
                              res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                          }else{
                            var query = "Select count(*) as TotalCount from ?? where ?? = ?";
                            var table = ["post_likes", "post_id",req.body.post_id];
                            query = mysql.format(query, table);
                            console.log(query);
                            connection.query(query, function(err, answer) {
                            if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query" });
                           }else if(authorId === result.user_id){
                              res.json({ "error": false, "Message": "Post Like successfully","count":answer});
                            }else if(json_text === "Post like successfully"){
                              var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                              var table = ["Platform_notifications", "user_id", result.user_id, "table_id", req.body.post_id,"reciever_id",authorId,"type",0,"is_read",0];
                              query = mysql.format(query, table);
                              connection.query(query, function(err, rowss) {
                              if(err){
                               return res.json({ "error": true, "Message": "Error executing MySQL query" });
                             }else if(rowss.length !== 0) {
                              res.json({ "error": false, "Message": "Post Like successfully","count":answer});
                             }
                             else{
                              var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                              var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,authorId,req.body.post_id,0,''+user_name+' Liked Your Post',0];
                              query = mysql.format(query, table);
                              connection.query(query, function(err, response) {
                               if(err){
                                 res.json({ "error": true, "Message": "Error executing MySQL query" });
                               }else{
                                 res.json({ "error": false, "Message": "Post Like successfully","count":answer});
                               }
                             });
                            }
                           });
                          }
                        else {
                          res.json({ "error": false, "Message": json_text,"count":answer});
                         }
                       });
                      }
                    });
                   });
                  }
                 });
                }
              });
        }else {
          res.json({ "error": true, "Messages": 'Invalid Token!' });
       }
     });
  });


     //post request to comment on posts
    router.post("/post/comment", routeValidator.validate({
        body: {
            'post_id': { isRequired: true },
            'comment': { isRequired: true }
        },
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["post_replies", "user_id", "post_id", "comment", result.user_id, req.body.post_id, req.body.comment];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    }else {
                      var query = "SELECT * FROM ??  WHERE ?? = ?";
                      var table = ["users", "id", result.user_id];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, rest){
                        if(err){
                          res.json({ "error": true, "Message": "Error executing MySQL query" });
                        }else{
                          var query = "SELECT posts.author_id,users.first_name,users.email from ?? JOIN ?? on posts.author_id = users.id   WHERE posts.id = ?";
                          var table = ["posts", "users",req.body.post_id];
                          query = mysql.format(query, table);
                          connection.query(query, function(err,rows){
                           if(err){
                            return res.json({ "error": true, "Message": "Error executing MySQL query" });
                           }else{
                             let email = rows[0].email;
                             let Reciever_firstName = rows[0].first_name;
                             let userName = rest[0].first_name + ' ' + rest[0].last_name;
                             let authorId = rows[0].author_id;
                             var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                             var table = ["Platform_notifications", "user_id", result.user_id, "table_id", req.body.post_id,"reciever_id",authorId,"type",1,"is_read",0];
                             query = mysql.format(query, table);
                             connection.query(query, function(err, restt){
                             if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query" ,"err":err });
                            }else if(restt.length !== 0) {
                               emailtemplate.user_comment(email,Reciever_firstName,userName,req,res,function(result){});
                            }else{
                              var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                              var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,authorId,req.body.post_id,1,''+userName+' Comment on Your Post',0];
                              query = mysql.format(query, table);
                              connection.query(query, function(err, response) {
                               emailtemplate.user_comment(email,Reciever_firstName,userName,req,res,function(result){});
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

    //put request to update comment on posts
    router.put("/post/comment/:commentId", routeValidator.validate({
        body: {
            'comment': { isRequired: true },
        },
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? and ?? = ?";
                var table = ["post_replies", "comment", req.body.comment, "id", req.params.commentId, "user_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "comment hasn't updated" });
                    } else {
                        res.json({ "error": false, "Message": "comment updated successfully", update_comment: req.body.comment });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //delete request to delete comment on posts
    router.delete("/post/comment/:commentId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                var table = ["post_replies", "id", req.params.commentId, "user_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "comment hasn't deleted" });
                    } else {
                        res.json({ "error": false, "Message": "comment deleted successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //put request to hide comment on posts
    router.put("/post/hidecomment/:commentId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select * from ?? where ?? = ? and ?? =?";
                var table = ["post_replies", "id", req.params.commentId, "user_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? and ?? = ?";
                        if (rows[0].hide_comment == 1) {
                            var table = ["post_replies", "hide_comment", "0", "id", req.params.commentId, "user_id", result.user_id];
                            var json_text = "Comment hide successfully";
                        } else {
                            var table = ["post_replies", "hide_comment", "1", "id", req.params.commentId, "user_id", result.user_id];
                            var json_text = "Comment unhide successfully";
                        }
                    } else {
                        return res.json({ "error": true, "Message": "comment not found" });
                    }
                    query = mysql.format(query, table);
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            res.json({ "error": false, "Message": json_text });
                        }
                    });
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //post request to like comment on posts
    router.post("/post/likecomment/:commentId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                console.log(result);
                var query = "select * from ?? where ?? = ? and ?? = ?";
                var table = ["comment_likes", "comment_liked_by", result.user_id, "comment_id", req.params.commentId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                        var table = ["comment_likes", "comment_liked_by", result.user_id, "comment_id", req.params.commentId];
                        var json_text = "comment unlike successfully";
                    } else {
                        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                        var table = ["comment_likes", "comment_id", "comment_liked_by", req.params.commentId, result.user_id];
                        var json_text = "comment like successfully";
                    }
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        }else if(json_text === "comment like successfully"){
                          var query = "select post_id from ?? where ?? = ?";
                          var table = ["post_replies", "id", req.params.commentId];
                          query = mysql.format(query, table);
                          connection.query(query, function(err, rows) {
                          if(err){
                            return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                          }else{
                            var postId = rows[0].post_id;
                            var query = "select author_id from ?? where ?? = ?";
                            var table = ["posts", "id", postId];
                            query = mysql.format(query, table);
                            connection.query(query, function(err, response) {
                            if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            }else if(response[0].author_id === result.user_id){
                               res.json({ "error": false, "Message": "comment like successfully"});
                            }else{
                              var authorId = response[0].author_id;
                              var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                              var table = ["Platform_notifications", "user_id", result.user_id, "table_id", postId,"reciever_id",authorId,"type",2,"is_read",0];
                              query = mysql.format(query, table);
                              connection.query(query, function(err, resp) {
                              if(err){
                                return res.json({"error":false, "Message":"Error executing MySQL query",err:err})
                              }else if(resp.length !== 0 ){
                                res.json({ "error": false, "Message": "comment like successfully"});
                              }else{
                                var query = "Select first_name,last_name from ?? where ?? = ?";
                                var table = ["users","id",result.user_id];
                                query = mysql.format(query, table);
                                connection.query(query, function(err, Result) {
                                  if(err){
                                    return res.json({"error":false, "Message":"Error executing MySQL query",err:err})
                                   }
                                  else{
                                    var userName = Result[0].first_name + ' ' + Result[0].last_name;
                                    var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                                    var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,authorId,postId,2,''+userName+' Likes Your Comment',0];
                                    query = mysql.format(query, table);
                                    connection.query(query, function(err, finalResult) {
                                      if(err){
                                        return res.json({"error":false, "Message":"Error executing MySQL query",err:err})
                                      }else{
                                        res.json({ "error": false, "Message": "comment like successfully"});
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
                         }
                       else {
                          res.json({ "error": false, "Message": json_text });
                      }
                    });
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //post request to share a post
    router.post("/post/sharepost/:postId", routeValidator.validate({
        body: {
            'type': { isRequired: false },
        },
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT posts.*, users.id, users.email, users.first_name, users.last_name FROM ?? JOIN ?? ON posts.author_id = users.id WHERE posts.id = ? AND posts.is_active = ?";
                var table = ["posts", "users", req.params.postId, "1"];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var title = rows[0].title;
                        var description = rows[0].description;
                        var image = rows[0].image;
                        var category_id = rows[0].category_id;
                        var share_author_id = rows[0].author_id;
                        var share_author_name = rows[0].first_name + " " + rows[0].last_name;
                        var share_author_email = rows[0].email;
                        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                        var table = ["posts", "author_id", "category_id", "title", "description", "image", "type", "post_share_id", "share_author_id", "share_author_name", "share_author_email", "is_active", result.user_id, category_id, title, description, image, req.body.type, req.params.postId, share_author_id, share_author_name, share_author_email, "1"];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {
                                if(result.user_id === share_author_id){
                                  res.json({ "error": false, "Message": "dsdfd Post shared successfully" });
                                }else{
                                  var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                                  var table = ["Platform_notifications", "user_id", result.user_id, "table_id", req.params.postId,"reciever_id",share_author_id,"type",3,"is_read",0];
                                  query = mysql.format(query, table);
                                  connection.query(query, function(err, resp) {
                                    if(err){
                                      res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                    }else if(resp.length !== 0 ){
                                      res.json({ "error": false, "Message": "Post Shared successfully" });
                                    }else{
                                      var query = "Select first_name,last_name from ?? where ?? = ?";
                                      var table = ["users","id",result.user_id];
                                      query = mysql.format(query, table);
                                      connection.query(query, function(err, Result) {
                                       if(err){
                                         return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                       }else{
                                         var userName = Result[0].first_name + ' ' + Result[0].last_name;
                                         var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                                         var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,share_author_id,req.params.postId,3,''+userName+' Share Your Post',0];
                                         query = mysql.format(query, table);
                                         connection.query(query, function(err, finalResult) {
                                           console.log(finalResult)
                                          if(err){
                                            return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                         }else{
                                           res.json({ "error": false, "Message": "Post Shared successfully" });
                                          }
                                         });
                                       }
                                      });
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

    //put request to update share count of a post
    router.put("/post/sharecount/:postId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select sharing_count from ?? where ?? = ?";
                var table = ["posts", "id", req.params.postId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var share_count = rows[0].sharing_count + 1;
                        var query = "Update ?? SET ?? = ? WHERE ?? = ?";
                        var table = ["posts", "sharing_count", share_count, "id", req.params.postId];
                        var json_text = "share count update successfully";
                    } else {
                        var json_text = "Error while updating share count";
                    }
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            res.json({ "error": false, "Message": json_text, updated_count: share_count });
                        }
                    });
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //put request to update view count of a post
    router.put("/post/viewcount/:postId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select views_count from ?? where ?? = ?";
                var table = ["posts", "id", req.params.postId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var views_count = rows[0].views_count + 1;
                        var query = "Update ?? SET ?? = ? WHERE ?? = ?";
                        var table = ["posts", "views_count", views_count, "id", req.params.postId];
                        var json_text = "view count update successfully";
                    } else {
                        var json_text = "Error while updating view count";
                    }
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            res.json({ "error": false, "Message": json_text, updated_count: views_count });
                        }
                    });
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //post request to report a post
    router.post("/post/report/", routeValidator.validate({
        body: {
            post_id: { isRequired: true },
            reason: { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["report_post", "post_id", "reported_by", "reason", req.body.post_id, result.user_id, req.body.reason];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                      var query = "Select author_id from ?? where ?? = ?";
                      var table = ["posts","id",req.body.post_id];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, Result) {
                      if(err){
                        return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                      }else{
                        var AuthoId = Result[0].author_id;
                        var query = "Select first_name,last_name from ?? where ?? = ?";
                        var table = ["users","id",result.user_id];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, userName) {
                        if(err){
                          return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        }else{
                           var user_name = userName[0].first_name + ' ' + userName[0].last_name;
                           var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                           var table = ["Platform_notifications", "user_id", result.user_id, "table_id", req.body.post_id,"reciever_id",AuthoId,"type",4,"is_read",0];
                           query = mysql.format(query, table);
                           connection.query(query, function(err, response) {
                            if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            }
                            else if(response.length !== 0){
                              res.json({ "error": false, "Message": "Post reported successfully" });
                          }else{
                              var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                              var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,AuthoId,req.body.post_id,4,''+user_name+' Reported on Your Post',0];
                              query = mysql.format(query, table);
                              connection.query(query, function(err, response) {
                                if(err){
                                  return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                }else{
                                  res.json({ "error": false, "Message": "Post reported successfully" });
                                }
                              });
                            }
                           });
                          }
                        });
                       }
                      });
                        // res.json({ "error": false, "Message": "Post reported successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //post request to search a post
    router.post("/post/search/", routeValidator.validate({
        body: {
            post_searchContent: { isRequired: true },
            type: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT posts.*, users.id as user_id, users.first_name, users.last_name FROM ?? JOIN ?? ON posts.author_id = users.id WHERE posts.type = ? AND posts.is_active = ? AND (posts.title LIKE '%" + req.body.post_searchContent + "%' OR posts.description LIKE '%" + req.body.post_searchContent + "%')";
                var table = ["posts", "users", req.body.type, "1"];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "searched Posts", "posts": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get a post
    /*router.get("/post/all/:typeId", function(req,res){
         var query = "SELECT posts.*, users.id as user_id, users.first_name, users.last_name FROM ?? JOIN ?? ON posts.author_id = users.id where posts.type="+req.params.typeId+"";
        var table = ["posts", "users"];
        query = mysql.format(query,table);
        //return res.json(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"error" : true, "Message" : "Error executing MySQL query", err: err});
            } else {
                res.json({"error" : false, "Message" : "all Posts", "posts":rows});
            }
        });
    });*/

    router.get("/post/all/:typeId", function(req, res) {
        var query = "SELECT * FROM ?? where type=" + req.params.typeId + "";
        var table = ["posts"];
        query = mysql.format(query, table);
        //return res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var i;
                var media_array = [];
                for (i = 0; i < rows.length; i++) {
                    rows[i].user_details = "";

                    if (rows[i].author_id != '0') {
                        var query = "select id as user_id, first_name, last_name FROM ?? where ?? = ?";
                        var table = ["users", "id", rows[i].author_id];
                    } else {
                        var query = "select communityId as user_id, institutionsName as universityTitle FROM ?? where ?? = ?";
                        var table = ["community", "communityId", rows[i].communityId];
                    }
                    query = mysql.format(query, table);
                    media_array.push(promise_query(query, connection));
                }
                Promise.all(media_array).then(values => {
                    rows = rows.map(function(forum, index) {
                        return merge(forum, { user_details: values[index] })
                    });
                    res.json({ "error": false, "Message": "Event", "rows": rows });
                });
            }
        });
    });



    //post request to get a post
    router.post("/post/course/all/:typeId", routeValidator.validate({
        body: {
            courceId: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {
        var query = "SELECT * FROM ?? where type=" + req.params.typeId + " AND courseId=" + req.body.courceId + "";
        var table = ["posts"];
        query = mysql.format(query, table);
        //return res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var i;
                var media_array = [];
                for (i = 0; i < rows.length; i++) {
                    rows[i].user_details = "";

                    if (rows[i].author_id != '0') {
                        var query = "select id as user_id, first_name, last_name FROM ?? where ?? = ?";
                        var table = ["users", "id", rows[i].author_id];
                    } else {
                        var query = "select communityId as user_id, institutionsName as universityTitle FROM ?? where ?? = ?";
                        var table = ["community", "communityId", rows[i].communityId];
                    }
                    query = mysql.format(query, table);
                    media_array.push(promise_query(query, connection));
                }
                Promise.all(media_array).then(values => {
                    rows = rows.map(function(forum, index) {
                        return merge(forum, { user_details: values[index] })
                    });
                    res.json({ "error": false, "Message": "Event", "rows": rows });
                });
            }
        });
    });

    //get request to get a post
    router.post("/post/class/all/:typeId", routeValidator.validate({
        body: {
            courceId: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select ?? from ?? WHERE ??=?";
                var table = ["classIds", "userClasses", "userID", result.user_id];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var str = rows[0].classIds;
                        var arr = str.split(",");
                        var final = arr.join(" OR posts.classId = ");
                        //res.json({"error" : false, "Message" : "all Posts", "posts":final});
                        var query = "SELECT * FROM ?? where type=" + req.params.typeId + " AND courseId=" + req.body.courceId + " AND (classId=" + final + ")";
                        var table = ["posts"];
                        query = mysql.format(query, table);
                        //return res.json(query);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            } else {
                                var i;
                                var media_array = [];
                                for (i = 0; i < rows.length; i++) {
                                    rows[i].user_details = "";

                                    if (rows[i].author_id != '0') {
                                        var query = "select id as user_id, first_name, last_name FROM ?? where ?? = ?";
                                        var table = ["users", "id", rows[i].author_id];
                                    } else {
                                        var query = "select communityId as user_id, institutionsName as universityTitle FROM ?? where ?? = ?";
                                        var table = ["community", "communityId", rows[i].communityId];
                                    }
                                    query = mysql.format(query, table);
                                    media_array.push(promise_query(query, connection));
                                }
                                Promise.all(media_array).then(values => {
                                    rows = rows.map(function(forum, index) {
                                        return merge(forum, { user_details: values[index] })
                                    });
                                    res.json({ "error": false, "Message": "Event", "rows": rows });
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

    //post request to add post ratting
    router.post("/post/rating/", routeValidator.validate({
        body: {
            post_id: { isRequired: true },
            rating: { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["post_ratting", "postId", "rating", "userId", req.body.post_id, req.body.rating, result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                      var query = "Select author_id from ?? where ?? = ?";
                      var table = ["posts","id",req.body.post_id];
                      query = mysql.format(query, table);
                      connection.query(query, function(err, Result) {
                      if(err){
                        return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                      }else{
                        var AuthorId = Result[0].author_id;
                        var query = "Select first_name,last_name from ?? where ?? = ?";
                        var table = ["users","id",result.user_id];
                        query = mysql.format(query, table);
                        connection.query(query, function(err, userName) {
                        if(err){
                          return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        }else if(AuthorId === result.user_id){
                          res.json({ "error": false, "Message": "Post rated successfully" });
                        }else{
                           var user_name = userName[0].first_name + ' ' + userName[0].last_name;
                           var query = "select * from ?? where ?? = ? and ?? = ? and ?? = ? and ?? = ? and ?? = ?";
                           var table = ["Platform_notifications", "user_id", result.user_id, "table_id", req.body.post_id,"reciever_id",AuthorId,"type",5,"is_read",0];
                           query = mysql.format(query, table);
                           connection.query(query, function(err, response) {
                            if(err){
                              return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                            }
                            else if(response.length !== 0){
                              res.json({ "error": false, "Message": "Post rated successfully" });
                            }else{
                              var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                              var table = ["Platform_notifications","user_id","reciever_id","table_id","type","message", "is_read",result.user_id,AuthorId,req.body.post_id,5,''+user_name+' Rated on Your Post',0];
                              query = mysql.format(query, table);
                              connection.query(query, function(err, response) {
                                if(err){
                                  return res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                }else{
                                  res.json({ "error": false, "Message": "Post rated successfully" });
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
                }else {
                  res.json({ "error": true, "Messages": 'Invalid Token!' });
                }
            });
        });

    //get request to get ratting
    // router.get("/post/rating/:postId", routeValidator.validate({
    //     headers: {
    //         //'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }),function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var query = "Select COUNT(userId) AS rattingCount, ROUND(AVG(rating),2) as ratting from ?? WHERE ?? = ?";
    //             var table = ["post_ratting", "postId", req.params.postId];
    //             query = mysql.format(query, table);
    //             //res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     res.json({ "error": false, "Message": "Post rating", "ratting": rows });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });

    //post request to get a post
    router.post("/post/group/all/:typeId", routeValidator.validate({
        body: {
            groupId: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {
        var query = "SELECT * FROM ?? where type=" + req.params.typeId + " AND groupId=" + req.body.groupId + "";
        var table = ["posts"];
        query = mysql.format(query, table);
        //return res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var i;
                var media_array = [];
                for (i = 0; i < rows.length; i++) {
                    rows[i].user_details = "";

                    if (rows[i].author_id != '0') {
                        var query = "select id as user_id, first_name, last_name FROM ?? where ?? = ?";
                        var table = ["users", "id", rows[i].author_id];
                    } else {
                        var query = "select communityId as user_id, institutionsName as universityTitle FROM ?? where ?? = ?";
                        var table = ["community", "communityId", rows[i].communityId];
                    }
                    query = mysql.format(query, table);
                    media_array.push(promise_query(query, connection));
                }
                Promise.all(media_array).then(values => {
                    rows = rows.map(function(forum, index) {
                        return merge(forum, { user_details: values[index] })
                    });
                    res.json({ "error": false, "Message": "Event", "rows": rows });
                });
            }
        });
    });


    //post request to get a post
    router.post("/post/socityclub/all/:typeId", routeValidator.validate({
        body: {
            socityclubId: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {
        var query = "SELECT * FROM ?? where type=" + req.params.typeId + " AND sacId=" + req.body.socityclubId + "";
        var table = ["posts"];
        query = mysql.format(query, table);
        // return res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var i;
                var media_array = [];
                for (i = 0; i < rows.length; i++) {
                    rows[i].user_details = "";

                    if (rows[i].author_id != '0') {
                        var query = "select id as user_id, first_name, last_name FROM ?? where ?? = ?";
                        var table = ["users", "id", rows[i].author_id];
                    } else {
                        var query = "select communityId as user_id, institutionsName as universityTitle FROM ?? where ?? = ?";
                        var table = ["community", "communityId", rows[i].communityId];
                    }
                    query = mysql.format(query, table);
                    media_array.push(promise_query(query, connection));
                }
                Promise.all(media_array).then(values => {
                    rows = rows.map(function(forum, index) {
                        return merge(forum, { user_details: values[index] })
                    });
                    res.json({ "error": false, "Message": "Event", "rows": rows });
                });
            }
        });
    });

    //post request to get a post
    router.post("/post/user/all/:typeId", routeValidator.validate({
        body: {
            userId: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {
        var query = "SELECT * FROM ?? where type=" + req.params.typeId + " AND author_id=" + req.body.userId + "";
        var table = ["posts"];
        query = mysql.format(query, table);
        // return res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var i;
                var media_array = [];
                for (i = 0; i < rows.length; i++) {
                    rows[i].user_details = "";

                    if (rows[i].author_id != '0') {
                        var query = "select id as user_id, first_name, last_name FROM ?? where ?? = ?";
                        var table = ["users", "id", rows[i].author_id];
                    } else {
                        var query = "select communityId as user_id, institutionsName as universityTitle FROM ?? where ?? = ?";
                        var table = ["community", "communityId", rows[i].communityId];
                    }
                    query = mysql.format(query, table);
                    media_array.push(promise_query(query, connection));
                }
                Promise.all(media_array).then(values => {
                    rows = rows.map(function(forum, index) {
                        return merge(forum, { user_details: values[index] })
                    });
                    res.json({ "error": false, "Message": "Event", "rows": rows });
                });
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
