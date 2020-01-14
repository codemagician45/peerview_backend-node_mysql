var utils = require('../common/utils');
var emailtemplate = require('../common/emailtemplate');

var path = require('path');
var email = require('../common/email');
var url = require('url');
var merge = require('merge');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, Promise, multer) {

    /* Create a Forum */

    router.post("/forumdetails", routeValidator.validate({
        body: {
            'forumName': { isRequired: true },
            'institutionId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["forumDetails", "name", "author_id", "institution_Id", req.body.forumName, result.user_id, req.body.institutionId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "forum added successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* Update Forum Details*/
    router.put("/forumdetails/:forumDetailsId", routeValidator.validate({
        body: {
            'forumName': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? and ?? = ?";
                var table = ["forumDetails", "name", req.body.forumName, "author_id", result.user_id, "forumDetails_Id", req.params.forumDetailsId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "forum update successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* add members to forum */

    router.post("/forummembers", routeValidator.validate({
        body: {
            'membersIds': { isRequired: true },
            'forumDetailsId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var usersIds = req.body.membersIds;
                var user_array = usersIds.split(',');
                user_array.forEach(function(userId, index) {

                    var query = "select * from ?? where ?? = ? and ?? = ?";
                    var table = ["forummembers", "user_id", userId, "forumDetails_id", req.body.forumDetailsId];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {

                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });

                        } else if (rows.length == 0) {

                            var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                            var table = ["forummembers", "user_id", "forumDetails_id", userId, req.body.forumDetailsId];
                            query = mysql.format(query, table);
                            connection.query(query, function(err, rows) {
                                if (err) {
                                    res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                } else {

                                }
                            });
                        }
                        if (index === user_array.length - 1) {
                            res.json({ "error": false, "Message": "Members added successfully" });
                        }
                    });

                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    /* Delete amd remove members */
    router.delete("/forummembers", routeValidator.validate({
        body: {
            'membersIds': { isRequired: true },
            'forumDetailsId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var usersIds = req.body.membersIds;
                var user_array = usersIds.split(',');
                user_array.forEach(function(userId, index) {

                    var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                    var table = ["forummembers", "user_id", userId, "forumDetails_id", req.body.forumDetailsId];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        } else {
                            if (index === user_array.length - 1) {
                                res.json({ "error": false, "Message": "Members removed/leaves successfully" });
                            }
                        }
                    });
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* Get all forums */

    //get request to get a all popular question
    router.get("/allforum", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select * FROM ?? WHERE ??=?";
                var table = ["forumDetails", "author_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Success", "forum": rows });
                    }
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* general latest discussion */
    router.get("/generalforum/latestdisscussion", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ?";
                var table = ["forumtype", '1'];

                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var j;
                        var index = "";
                        var forum_array = [];
                        var threads = "";
                        var follows = "";
                        var user_university = "";
                        var latestdate = "";
                        for (i = 0; i < rows.length; i++) {
                            forum_array[i] = { id: rows[i].forum_id, question: rows[i].question, course: rows[i].category, graduatetype: rows[i].graduatetype, description: rows[i].description, view_count: rows[i].view_count, share_count: rows[i].share_count, author: rows[i].author_id, authorfirst_name: rows[i].first_name, authorlast_name: rows[i].last_name, author_email: rows[i].email, question_at: rows[i].updated_at, latesdate: latestdate, threads: threads, follows: follows, user_university: user_university }
                        }
                        var final = forum_array.filter(function(val) { return val !== null; });
                        var thread_array = [];
                        var follow_array = [];
                        var university_array = [];
                        var latestDate_array = [];
                        for (j = 0; j < final.length; j++) {
                            /*get comments on questions*/
                            var query = "select threadReplies.thread_id, threadReplies.created_at, threadReplies.comment, threadReplies.updated_at as reply_at, threaduser.id as threaduser_id, threaduser.first_name as threaduser_first_name, threaduser.last_name as threaduser_last_name, threaduser.email as threaduser_email from `threadReplies` JOIN users as threaduser on threadReplies.user_id = threaduser.id where ?? = ?";
                            var table = ["question_id", final[j].id];
                            query = mysql.format(query, table);

                            thread_array.push(promise_query(query, connection));
                            /*get followers of question*/
                            var query1 = "select follow.id, threaduser.id as follower_id, threaduser.first_name as follower_first_name, threaduser.last_name as follower_last_name, threaduser.email as follower_email from `follow_thread` as follow JOIN users as threaduser on follow.user_id = threaduser.id where ?? = ?";
                            var table1 = ["question_id", final[j].id];
                            query1 = mysql.format(query1, table1);
                            follow_array.push(promise_query(query1, connection));

                            var query2 = "select user_comuunity.communityId, community.institutionsName as universityTitle FROM user_comuunity JOIN community on user_comuunity.communityId = community.communityId where user_comuunity.userId = ?";
                            var table2 = [final[j].author];

                            query2 = mysql.format(query2, table2);
                            //console.log(query);
                            university_array.push(promise_query(query2, connection));

                            var query3 = "select created_at from `threadReplies` where ?? = ? ORDER BY created_at DESC LIMIT 1";
                            var table3 = ["question_id", final[j].id];

                            query3 = mysql.format(query3, table3);
                            //console.log(query);
                            latestDate_array.push(promise_query(query3, connection));
                        }


                        Promise.all(thread_array).then(values => {
                            final = final.map(function(forum, index) {
                                return merge(forum, { threads: values[index] })
                            });
                            Promise.all(follow_array).then(values => {
                                final = final.map(function(forum, index) {
                                    return merge(forum, { follows: values[index] })
                                });
                                Promise.all(university_array).then(values => {
                                    final = final.map(function(forum, index) {
                                        return merge(forum, { user_university: values[index] })
                                    });
                                    Promise.all(latestDate_array).then(values => {
                                        final = final.map(function(forum, index) {
                                            createdarray = values[index];
                                            if(createdarray.length>0){
                                                latesdae = createdarray[0].created_at;
                                            }else{
                                                latesdae = '';
                                            }
                                            //console.log(latesdae);
                                            return merge(forum, { latesdate: latesdae })
                                        });
                                        final.sort(function(a, b) {
                                            return a.latesdate - b.latesdate;
                                        });
                                        res.json({ "error": false, "Message": "Success", "questions": final.reverse() });
                                    });
                                });
                            });
                        })

                    }
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* general latest discussion */
    router.get("/carrerforum/latestdisscussion", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ?";
                var table = ["forumtype", '3'];

                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var j;
                        var index = "";
                        var forum_array = [];
                        var threads = "";
                        var follows = "";
                        var user_university = "";
                        var latestdate = "";
                        for (i = 0; i < rows.length; i++) {
                            forum_array[i] = { id: rows[i].forum_id, question: rows[i].question, course: rows[i].category, graduatetype: rows[i].graduatetype, description: rows[i].description, view_count: rows[i].view_count, share_count: rows[i].share_count, author: rows[i].author_id, authorfirst_name: rows[i].first_name, authorlast_name: rows[i].last_name, author_email: rows[i].email, question_at: rows[i].updated_at, latesdate: latestdate, threads: threads, follows: follows, user_university: user_university }
                        }
                        var final = forum_array.filter(function(val) { return val !== null; });
                        var thread_array = [];
                        var follow_array = [];
                        var university_array = [];
                        var latestDate_array = [];
                        for (j = 0; j < final.length; j++) {
                            /*get comments on questions*/
                            var query = "select threadReplies.thread_id, threadReplies.created_at, threadReplies.comment, threadReplies.updated_at as reply_at, threaduser.id as threaduser_id, threaduser.first_name as threaduser_first_name, threaduser.last_name as threaduser_last_name, threaduser.email as threaduser_email from `threadReplies` JOIN users as threaduser on threadReplies.user_id = threaduser.id where ?? = ?";
                            var table = ["question_id", final[j].id];
                            query = mysql.format(query, table);

                            thread_array.push(promise_query(query, connection));
                            /*get followers of question*/
                            var query1 = "select follow.id, threaduser.id as follower_id, threaduser.first_name as follower_first_name, threaduser.last_name as follower_last_name, threaduser.email as follower_email from `follow_thread` as follow JOIN users as threaduser on follow.user_id = threaduser.id where ?? = ?";
                            var table1 = ["question_id", final[j].id];
                            query1 = mysql.format(query1, table1);
                            follow_array.push(promise_query(query1, connection));

                            var query2 = "select user_comuunity.communityId, community.institutionsName as universityTitle FROM user_comuunity JOIN community on user_comuunity.communityId = community.communityId where user_comuunity.userId = ?";
                            var table2 = [final[j].author];

                            query2 = mysql.format(query2, table2);
                            //console.log(query);
                            university_array.push(promise_query(query2, connection));

                            var query3 = "select created_at from `threadReplies` where ?? = ? ORDER BY created_at DESC LIMIT 1";
                            var table3 = ["question_id", final[j].id];

                            query3 = mysql.format(query3, table3);
                            //console.log(query);
                            latestDate_array.push(promise_query(query3, connection));
                        }


                        Promise.all(thread_array).then(values => {
                            final = final.map(function(forum, index) {
                                return merge(forum, { threads: values[index] })
                            });
                            Promise.all(follow_array).then(values => {
                                final = final.map(function(forum, index) {
                                    return merge(forum, { follows: values[index] })
                                });
                                Promise.all(university_array).then(values => {
                                    final = final.map(function(forum, index) {
                                        return merge(forum, { user_university: values[index] })
                                    });
                                    Promise.all(latestDate_array).then(values => {
                                        final = final.map(function(forum, index) {
                                            createdarray = values[index];
                                            if(createdarray.length>0){
                                                latesdae = createdarray[0].created_at;
                                            }else{
                                                latesdae = '';
                                            }
                                            //console.log(latesdae);
                                            return merge(forum, { latesdate: latesdae })
                                        });
                                        final.sort(function(a, b) {
                                            return a.latesdate - b.latesdate;
                                        });
                                        res.json({ "error": false, "Message": "Success", "questions": final.reverse() });
                                    });
                                });
                            });
                        })

                    }
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get a all popular question
    router.get("/allforummembers/:forumDetailsId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select forummembers.*, users.first_name, users.last_name, users.email from `forummembers` JOIN users on forummembers.user_id  = users.id where ?? = ?";
                var table = ["forumDetails_id", req.params.forumDetailsId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Success", "member": rows });
                    }
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //post request to add a forum
    router.post("/forum", routeValidator.validate({
        body: {
            'question': { isRequired: true },
            'forumDetailsId': { isRequired: true },
            /*Details id*/
            'forumtype': { isRequired: true } /* 1:General 2:Course 3:carrers*/
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if (req.body.forumtype == 3) {
            if (typeof req.body.description == "undefined" || req.body.description == null || req.body.description == "") {
                return res.json({ "error": "body.description is required" }); /* description in carrer */
            }
        } else if (req.body.forumtype == 2) {
            if (typeof req.body.category == "undefined" || req.body.category == null || req.body.category == "") {
                return res.json({ "error": "body.category is required" }); /* Course Id*/
            } else if (typeof req.body.graduatetype == "undefined" || req.body.graduatetype == null || req.body.graduatetype == "") {
                return res.json({ "error": "body.graduatetype is required" }); /*1:Postgraduate, 2:Undergraduate*/
            }
        } else if (req.body.forumtype == 1) {
            if (typeof req.body.graduatetype == "undefined" || req.body.graduatetype == null || req.body.graduatetype == "") {
                return res.json({ "error": "body.graduatetype is required" }); /*1:Postgraduate, 2:Undergraduate*/
            }
        }
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.body.forumtype == 3) {
                    var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                    var table = ["forum", "forumDetails_Id", "author_id", "question", "forumtype", "description", req.body.forumDetailsId, result.user_id, req.body.question, req.body.forumtype, req.body.description];
                } else if (req.body.forumtype == 2) {
                    var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                    var table = ["forum", "forumDetails_Id", "author_id", "question", "category", "forumtype", "graduatetype", req.body.forumDetailsId, result.user_id, req.body.question, req.body.category, req.body.forumtype, req.body.graduatetype];
                } else {
                    var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                    var table = ["forum", "forumDetails_Id", "author_id", "question", "forumtype", "graduatetype", req.body.forumDetailsId, result.user_id, req.body.question, req.body.forumtype, req.body.graduatetype];
                }

                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Question added successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //put request to update a forum title and description

    router.put("/forum/:forumId", routeValidator.validate({
        body: {
            'question': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (typeof req.body.description != "undefined" && req.body.description != null && req.body.description != "") {
                    var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["forum", "question", req.body.question, "description", req.body.description, "forum_id", req.params.forumId, "author_id", result.user_id];
                } else {
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["forum", "question", req.body.question, "forum_id", req.params.forumId, "author_id", result.user_id];
                }

                query = mysql.format(query, table);
              //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "Forum not updated" });
                    } else {
                          var query = "SELECT * FROM ??  WHERE ?? = ?";
                          var table = ["users", "id", result.user_id];
                          query = mysql.format(query, table);
                          connection.query(query, function(err,rest){
                            if(err){
                              res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                             }else{
                              let sender_email = rest[0].email;
                              let sender_firstName = rest[0].first_name;

                            var query = "SELECT user_id FROM ??  WHERE ?? = ?";
                            var table = ["follow_thread", "question_id",req.params.forumId];
                            query = mysql.format(query, table);
                            connection.query(query, function(err,response){
                            for(var i=0;i<response.length;i++){
                              var query = "SELECT email,first_name FROM ??  WHERE ?? = ?";
                              var table = ["users", "id",response[i].user_id];
                              query = mysql.format(query, table);
                              connection.query(query, function(err,finalResult){
                                var reciever_email = finalResult[0].email;
                                var reciever_name = finalResult[0].first_name;
                               emailtemplate.user_thread_updated(reciever_email,reciever_name,req,res,function(result){});

                              });
                            }
                          });
                          }



                            // emailtemplate.user_follow_forum(email,firstName,req,res,function(result){
                            //   result.json({ "error": false, "Message": "thread follow successfully"})
                            // });
                          });

                        // res.json({ "error": false, "Message": "Forum updated successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //delete request to delete a forum
    router.delete("/forum/:forumId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                var table = ["forum", "forum_id", req.params.forumId, "author_id", result.user_id];
                query = mysql.format(query, table);
                console.log(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "Forum not deleted" });
                    } else {
                        res.json({ "error": false, "Message": "Forum deleted successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //put request to update view/share count forum
    router.put("/forum/updateCount/:forumId", routeValidator.validate({
        body: {
            'count': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.body.count != "view_count" && req.body.count != "share_count") {
                    return res.json({ "error": true, "Message": "can't find column" });
                }
                var query = "select ?? from ?? where ?? = ? and ?? = ?";
                var table = [req.body.count, "forum", "author_id", result.user_id, "forum_id", req.params.forumId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var column = req.body.count;
                        if (column == "view_count") {
                            var update_count = rows[0].view_count + 1;
                        } else {
                            var update_count = rows[0].share_count + 1;
                        }

                        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? and ?? = ?";
                        var table = ["forum", req.body.count, update_count, "forum_id", req.params.forumId, "author_id", result.user_id];
                        var json_text = "count updated successfully";
                    } else {
                        var json_text = "count not updated";
                    }
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

    //post request to inset a reply
    router.post("/forum/reply", routeValidator.validate({
        body: {
            'question_id': { isRequired: true },
            'comment': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["threadReplies", "question_id", "user_id", "comment", req.body.question_id, result.user_id, req.body.comment];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Reply added successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //delete request to delete a reply
    router.delete("/forum/reply/:threadId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                var table = ["threadReplies", "thread_id", req.params.threadId, "user_id", result.user_id];
                query = mysql.format(query, table);
                console.log(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "reply not deleted" });
                    } else {
                        res.json({ "error": false, "Message": "reply deleted successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //put request to update a reply
    router.put("/forum/reply/:threadId", routeValidator.validate({
        body: {
            'comment': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? and ?? = ?";
                var table = ["threadReplies", "comment", req.body.comment, "thread_id", req.params.threadId, "user_id", result.user_id];
                query = mysql.format(query, table);
                console.log(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "reply not updated" });
                    } else {
                        res.json({ "error": false, "Message": "reply updated successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //post request to follow/Undollow thread
    router.post("/forum/follow/:forumId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select * from ?? where ?? = ? and ?? = ?";
                var table = ["follow_thread", "user_id", result.user_id, "question_id", req.params.forumId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length != 0) {
                        var query = "DELETE from ?? WHERE ??=? and ?? = ?";
                        var table = ["follow_thread", "user_id", result.user_id, "question_id", req.params.forumId];
                        var json_text = "thread unfollow successfully";
                    }else{
                        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                        var table = ["follow_thread", "user_id", "question_id", result.user_id, req.params.forumId];
                        var json_text = "thread follow successfully";
                      }
                    query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                } else {
                     if(json_text == "thread follow successfully"){
                       var query = "SELECT * FROM ??  WHERE ?? = ?";
                       var table = ["users", "id", result.user_id];
                       query = mysql.format(query, table);
                       connection.query(query, function(err,rest){
                         if(err){
                           res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                        }else{
                           let sender_email = rest[0].email;
                           let sender_firstName = rest[0].first_name;
                           console.log(sender_email,sender_firstName);
                           var query = "SELECT author_id FROM ??  WHERE ?? = ?";
                           var table = ["forum", "forum_id", req.params.forumId];
                           query = mysql.format(query, table);
                           connection.query(query, function(err,response){
                                 console.log(response);
                             if(err){
                               res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                          }else{
                            var authorID = response[0].author_id
                           var query = "SELECT email,first_name FROM ??  WHERE ?? = ?";
                           var table = ["users", "id", authorID];
                           query = mysql.format(query, table);
                           connection.query(query, function(err,restt){
                             var reciever_email = restt[0].email;
                             var reciever_first_name = restt[0].first_name;
                             console.log(reciever_email,reciever_first_name,sender_email,sender_firstName);
                             emailtemplate.user_follow_thread(reciever_email,reciever_first_name,sender_firstName,req,res,function(result){});
                          });
                         }
                         });
                         }
                       });
                     }
                 else{
                   res.json({ "error": false, "Message": json_text });
                 }
               }
            });
          });
        } else {
          res.json({ "error": true, "Messages": 'Invalid Token!' });
      }
    });
});

    //get request to get a forum according to courses

    /* forumDetailsId and forumType is required. Parse 0 if you any value to be added like if you dont want categoryId then simply parse 0 similar in the case of graduate type  */
    router.get("/forum/course/:forumDetailsId/:forumType/:categoryId/:graduatetype", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                if (req.params.categoryId == 0 && req.params.graduatetype == 0) {
                    var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ? and ??=?";
                    var table = ["forumtype", req.params.forumType, "forumDetails_Id", req.params.forumDetailsId];
                } else if (req.params.categoryId == 0 && req.params.graduatetype != 0) {
                    var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ? and ??=? and ??=?";
                    var table = ["forumtype", req.params.forumType, "forumDetails_Id", req.params.forumDetailsId, "graduatetype", req.params.graduatetype];
                } else if (req.params.categoryId != 0 && req.params.graduatetype == 0) {
                    var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ? and ??=? and ??=?";
                    var table = ["forumtype", req.params.forumType, "forumDetails_Id", req.params.forumDetailsId, "category", req.params.categoryId];
                } else if (req.params.categoryId != 0 && req.params.graduatetype != 0) {
                    var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ? and ??=? and ??=? and ??=?";
                    var table = ["forumtype", req.params.forumType, "forumDetails_Id", req.params.forumDetailsId, "category", req.params.categoryId, "graduatetype", req.params.graduatetype];
                }

                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var j;
                        var index = "";
                        var forum_array = [];
                        var threads = "";
                        var follows = "";
                        var user_university = "";
                        for (i = 0; i < rows.length; i++) {
                            forum_array[i] = { id: rows[i].forum_id, question: rows[i].question, course: rows[i].category, graduatetype: rows[i].graduatetype, description: rows[i].description, view_count: rows[i].view_count, share_count: rows[i].share_count, author: rows[i].author_id, authorfirst_name: rows[i].first_name, authorlast_name: rows[i].last_name, author_email: rows[i].email, question_at: rows[i].updated_at, threads: threads, follows: follows, user_university: user_university }
                        }
                        var final = forum_array.filter(function(val) { return val !== null; });
                        var thread_array = [];
                        var follow_array = [];
                        var university_array = [];
                        for (j = 0; j < final.length; j++) {
                            /*get comments on questions*/
                            var query = "select threadReplies.thread_id, threadReplies.comment, threadReplies.updated_at as reply_at, threaduser.id as threaduser_id, threaduser.first_name as threaduser_first_name, threaduser.last_name as threaduser_last_name, threaduser.email as threaduser_email from `threadReplies` JOIN users as threaduser on threadReplies.user_id = threaduser.id where ?? = ?";
                            var table = ["question_id", final[j].id];
                            query = mysql.format(query, table);

                            thread_array.push(promise_query(query, connection));
                            /*get followers of question*/
                            var query1 = "select follow.id, threaduser.id as follower_id, threaduser.first_name as follower_first_name, threaduser.last_name as follower_last_name, threaduser.email as follower_email from `follow_thread` as follow JOIN users as threaduser on follow.user_id = threaduser.id where ?? = ?";
                            var table1 = ["question_id", final[j].id];
                            query1 = mysql.format(query1, table1);
                            follow_array.push(promise_query(query1, connection));

                            var query2 = "select user_comuunity.communityId, community.institutionsName as universityTitle FROM user_comuunity JOIN community on user_comuunity.communityId = community.communityId where user_comuunity.userId = ?";
                            var table2 = [final[j].author];

                            query2 = mysql.format(query2, table2);
                            //console.log(query);
                            university_array.push(promise_query(query2, connection));
                        }


                        Promise.all(thread_array).then(values => {
                            final = final.map(function(forum, index) {
                                return merge(forum, { threads: values[index] })
                            });
                            Promise.all(follow_array).then(values => {
                                final = final.map(function(forum, index) {
                                    return merge(forum, { follows: values[index] })
                                });
                                Promise.all(university_array).then(values => {
                                    final = final.map(function(forum, index) {
                                        return merge(forum, { user_university: values[index] })
                                    });
                                    res.json({ "error": false, "Message": "Success", "questions": final });
                                })
                            });
                        })

                    }
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get a all popular question
    router.get("/forum/popular/:forumDetailsId/:forumtype", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ??=? and ??=? ORDER BY forum.?? DESC LIMIT 4";
                var table = ["forumDetails_Id", req.params.forumDetailsId, "forumtype", req.params.forumtype, "view_count"];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var media_array = [];
                        for (i = 0; i < rows.length; i++) {

                            rows[i].user_university = "";
                            var query = "select user_comuunity.communityId, community.institutionsName as universityTitle FROM user_comuunity JOIN community on user_comuunity.communityId = community.communityId where user_comuunity.userId = ?";
                            var table = [rows[i].author_id];

                            query = mysql.format(query, table);
                            //console.log(query);
                            media_array.push(promise_query(query, connection));
                        }
                        Promise.all(media_array).then(values => {
                            rows = rows.map(function(forum, index) {
                                return merge(forum, { user_university: values[index] })
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

    //get request to get a all popular question
    router.post("/forum/popular/:forumDetailsId/:forumtype", routeValidator.validate({
        body: {
            'category': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ??=? and ??=? and ??=? ORDER BY forum.?? DESC LIMIT 4";
                var table = ["forumDetails_Id", req.params.forumDetailsId, "category", req.body.category, "forumtype", req.params.forumtype, "view_count"];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var media_array = [];
                        for (i = 0; i < rows.length; i++) {

                            rows[i].user_university = "";
                            var query = "select user_comuunity.communityId, community.institutionsName as universityTitle FROM user_comuunity JOIN community on user_comuunity.communityId = community.communityId where user_comuunity.userId = ?";
                            var table = [rows[i].author_id];

                            query = mysql.format(query, table);
                            //console.log(query);
                            media_array.push(promise_query(query, connection));
                        }
                        Promise.all(media_array).then(values => {
                            rows = rows.map(function(forum, index) {
                                return merge(forum, { user_university: values[index] })
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




    //get request to get a single forum
    router.get("/forum/questions/:questionId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ?";
                var table = ["forum_id", req.params.questionId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var j;
                        var index = "";
                        var forum_array = [];
                        var threads = "";
                        var follows = "";
                        var user_university = "";
                        for (i = 0; i < rows.length; i++) {
                            forum_array[i] = { id: rows[i].forum_id, question: rows[i].question, course: rows[i].category, graduatetype: rows[i].graduatetype, description: rows[i].description, view_count: rows[i].view_count, share_count: rows[i].share_count, author: rows[i].author_id, authorfirst_name: rows[i].first_name, authorlast_name: rows[i].last_name, author_email: rows[i].email, question_at: rows[i].updated_at, threads: threads, follows: follows, user_university: user_university }
                        }
                        var final = forum_array.filter(function(val) { return val !== null; });
                        var thread_array = [];
                        var follow_array = [];
                        var university_array = [];
                        for (j = 0; j < final.length; j++) {
                            /*get comments on questions*/
                            var query = "select threadReplies.thread_id, threadReplies.comment, threadReplies.updated_at as reply_at, threaduser.id as threaduser_id, threaduser.first_name as threaduser_first_name, threaduser.last_name as threaduser_last_name, threaduser.email as threaduser_email from `threadReplies` JOIN users as threaduser on threadReplies.user_id = threaduser.id where ?? = ?";
                            var table = ["question_id", final[j].id];
                            query = mysql.format(query, table);

                            thread_array.push(promise_query(query, connection));
                            /*get followers of question*/
                            var query1 = "select follow.id, threaduser.id as follower_id, threaduser.first_name as follower_first_name, threaduser.last_name as follower_last_name, threaduser.email as follower_email from `follow_thread` as follow JOIN users as threaduser on follow.user_id = threaduser.id where ?? = ?";
                            var table1 = ["question_id", final[j].id];
                            query1 = mysql.format(query1, table1);
                            follow_array.push(promise_query(query1, connection));

                            var query2 = "select user_comuunity.communityId, community.institutionsName as universityTitle FROM user_comuunity JOIN community on user_comuunity.communityId = community.communityId where user_comuunity.userId = ?";
                            var table2 = [final[j].author];

                            query2 = mysql.format(query2, table2);
                            //console.log(query);
                            university_array.push(promise_query(query2, connection));
                        }


                        Promise.all(thread_array).then(values => {
                            final = final.map(function(forum, index) {
                                return merge(forum, { threads: values[index] })
                            });
                            Promise.all(follow_array).then(values => {
                                final = final.map(function(forum, index) {
                                    return merge(forum, { follows: values[index] })
                                });
                                Promise.all(university_array).then(values => {
                                    final = final.map(function(forum, index) {
                                        return merge(forum, { user_university: values[index] })
                                    });
                                    res.json({ "error": false, "Message": "Success", "questions": final });
                                })
                            });
                        })

                    }
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get a user forum
    router.get("/forum/userquestions/", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select forum.*,users.first_name, users.last_name, users.email from `forum` JOIN users on forum.author_id = users.id where ?? = ?";
                var table = ["author_id", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        var i;
                        var j;
                        var index = "";
                        var forum_array = [];
                        var threads = "";
                        var follows = "";
                        var user_university = "";
                        for (i = 0; i < rows.length; i++) {
                            forum_array[i] = { id: rows[i].forum_id, question: rows[i].question, course: rows[i].category, graduatetype: rows[i].graduatetype, description: rows[i].description, view_count: rows[i].view_count, share_count: rows[i].share_count, author: rows[i].author_id, authorfirst_name: rows[i].first_name, authorlast_name: rows[i].last_name, author_email: rows[i].email, question_at: rows[i].updated_at, threads: threads, follows: follows, user_university: user_university }
                        }
                        var final = forum_array.filter(function(val) { return val !== null; });
                        var thread_array = [];
                        var follow_array = [];
                        var university_array = [];
                        for (j = 0; j < final.length; j++) {
                            /*get comments on questions*/
                            var query = "select threadReplies.thread_id, threadReplies.comment, threadReplies.updated_at as reply_at, threaduser.id as threaduser_id, threaduser.first_name as threaduser_first_name, threaduser.last_name as threaduser_last_name, threaduser.email as threaduser_email from `threadReplies` JOIN users as threaduser on threadReplies.user_id = threaduser.id where ?? = ?";
                            var table = ["question_id", final[j].id];
                            query = mysql.format(query, table);

                            thread_array.push(promise_query(query, connection));
                            /*get followers of question*/
                            var query1 = "select follow.id, threaduser.id as follower_id, threaduser.first_name as follower_first_name, threaduser.last_name as follower_last_name, threaduser.email as follower_email from `follow_thread` as follow JOIN users as threaduser on follow.user_id = threaduser.id where ?? = ?";
                            var table1 = ["question_id", final[j].id];
                            query1 = mysql.format(query1, table1);
                            follow_array.push(promise_query(query1, connection));

                            var query2 = "select user_comuunity.communityId, community.institutionsName as universityTitle FROM user_comuunity JOIN community on user_comuunity.communityId = community.communityId where user_comuunity.userId = ?";
                            var table2 = [final[j].author];

                            query2 = mysql.format(query2, table2);
                            //console.log(query);
                            university_array.push(promise_query(query2, connection));
                        }


                        Promise.all(thread_array).then(values => {
                            final = final.map(function(forum, index) {
                                return merge(forum, { threads: values[index] })
                            });
                            Promise.all(follow_array).then(values => {
                                final = final.map(function(forum, index) {
                                    return merge(forum, { follows: values[index] })
                                });
                                Promise.all(university_array).then(values => {
                                    final = final.map(function(forum, index) {
                                        return merge(forum, { user_university: values[index] })
                                    });
                                    res.json({ "error": false, "Message": "Success", "questions": final });
                                })
                            });
                        })

                    }
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* add forum polls */
    /*Post requset to create polls*/
    // router.post("/forumpolls/", routeValidator.validate({
    //     body: {
    //         'name': { isRequired: true },
    //         'forumId': { isRequired: true },
    //         'options': { isRequired: true },
    //         'timeLimit': { isRequired: true }
    //     },
    //     headers: {
    //         'content-type': { isRequired: true, equals: 'application/json' },
    //         'token': { isRequired: true }
    //     }
    // }), function(req, res) {
    //     utils.checkToken(req.headers.token, mysql, connection, function(result) {
    //         if (result.status == 1) {
    //             var poll_option_string = req.body.options;
    //             var poll_option_array = poll_option_string.split(',');
    //
    //             var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
    //             var table = ["forumPolls", "name", "userId", "forumId", "timeLimit", req.body.name, result.user_id, req.body.forumId, req.body.timeLimit];
    //             query = mysql.format(query, table);
    //             // res.json(query);
    //             connection.query(query, function(err, rows) {
    //                 if (err) {
    //                     res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                 } else {
    //                     var pollId = rows.insertId
    //                     poll_option_array.forEach(node => {
    //                         var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    //                         var table = ["forumpolls_options", "name", "forumpollId", node, pollId];
    //                         query = mysql.format(query, table);
    //                         // res.json(query);
    //                         connection.query(query, function(err, rows) {
    //                             if (err) {
    //                                 res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
    //                             } else {
    //                                 //res.json({ "error": false, "Message": "poll added successfully" });
    //                             }
    //                         });
    //                     });
    //                     res.json({ "error": false, "Message": "poll added successfully" });
    //                 }
    //             });
    //         } else {
    //             res.json({ "error": true, "Messages": 'Invalid Token!' });
    //         }
    //     });
    // });


    /* put requiest to join user with community*/

    router.put("/forumpolls/:PollId", routeValidator.validate({
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
                var table = ["forumPolls", "name", req.body.name, "timeLimit", req.body.timeLimit, "id", req.params.PollId, "userId", result.user_id];
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

    router.put("/forumpollsOptions/:optionId", routeValidator.validate({
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
                var table = ["forumpolls_options", "name", req.body.name, "id", req.params.optionId];
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
    router.get("/forumpolls/all/:forumId", function(req, res) {

        var query = "select * from ?? WHERE ??=? AND ?? = ?";
        var table = ["forumPolls", "forumId", req.params.forumId, "is_active", "1"];
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
                    var table = ["forumpolls_options", "forumpollId", rows[i].id];
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
                            var table = ["forumuserspolls", "optionId", option_array[k].id];
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

                                return forum;
                            });

                            res.json({ "error": false, "Message": "polls", "rows": final });
                        })
                });
            }
        });

    });

    //get request for polls
    router.get("/forumpolls/:pollId", function(req, res) {

        var query = "select * from ?? WHERE ??=? AND ??=?";
        var table = ["forumPolls", "id", req.params.pollId, "is_active", "1"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var thread_array = [];
                for (var i = 0; i < rows.length; i++) {
                    rows[i].options = "";
                    var query = "select * from ?? WHERE ??=?";
                    var table = ["forumpolls_options", "forumpollId", rows[i].id];
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
                            var table = ["forumuserspolls", "optionId", option_array[k].id];
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
    router.post("/forumuserpolls/", routeValidator.validate({
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
                var table = ["forumuserspolls", "userId", result.user_id, "forumPollId", req.body.pollId];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.length > 0) {
                        res.json({ "error": false, "Message": "you already vote for this poll" });
                    } else {
                        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                        var table = ["forumuserspolls", "userId", "forumpollId", "optionId", result.user_id, req.body.pollId, req.body.optionId];
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
