var utils = require('../common/utils');
var path = require('path');
var email = require('../common/email');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, randomstring, Email) {

    //POST request to register users
    router.post("/register", routeValidator.validate({
      //Validations
        body: {
            first_name: { isRequired: true, isAscii: true, message: { isRequired: 'First Name is required!' } },
            last_name: { isRequired: true, isAscii: true, message: { isRequired: 'Last Name is required!' } },
            email: { isRequired: true, isEmail: true },
            password: { isRequired: true, isAscii: true, isLength: { min: 8, max: 24 }, message: 'Minimum 8 and maximum 24 characters are allowed!' },
            confirm_password: { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        if (req.body.confirm_password !== req.body.password) {
            res.status(400);
            res.json({ 'message': 'confirm_password and password doesn\'t match' });
            res.end();
            return;
        }

        //Executing query to select user email from users.
        var query = "SELECT email FROM ?? WHERE ??=?";
        var table = ["users", "email", req.body.email];
        query = mysql.format(query, table);

        //Sending Reesponse
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length) {
                    res.status(400);
                    res.json({ "error": "Email already exists!" });
                    res.end();
                    return;
                }
            }

            //Executing query to insert the data in users table.
            var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
            var table = ["users", "first_name", "last_name", "email", "password", "token", req.body.first_name, req.body.last_name, req.body.email, md5(req.body.password), randomstring.generate()];
            query = mysql.format(query, table);

            //Sending Response
            connection.query(query, function(err, rows) {
                if (err) {
                    res.json({ "error": true, "Message": "Error executing MySQL query" });
                } else {
                    // let id = rows.insertId;
                    // var query = "SELECT email FROM ?? WHERE ??=?";
                    // var table = ["users", "id", id];
                    // query = mysql.format(query, table);

                    // //Sending Reesponse
                    // connection.query(query, function(err, rows) {
                    //     if (err) {
                    //         res.json({ "error": true, "Message": "Error executing MySQL query" });
                    //     } else {
                    //         let hostname = req.headers.host;
                    //         let link = "http://" + hostname + "/api/verification/" + id
                    //         utils.convertPug(path.join(__dirname, '../templates/confirmation.pug'), { link: link })
                    //             .then(content => {
                    //                 email.send(res, rows[0].email, 'Please confirm your email', content);
                    //                 res.on('end', function(){
                    //                   ({ "error": false, "Message": "User has been Registerd successfully" });
                    //                 });
                    //             })
                    //             .catch(err => console.log(err));
                    //         return false;
                    //     }
                    // });
                    res.json({ "error": false, "Message": "User has been registered successfully!" });
                }
            });
        });
    });


    //POST request to login a user
    router.post("/login", routeValidator.validate({

        //Validations
        body: {
            email: { isRequired: true, isEmail: true, normalizeEmail: true },
            password: { isRequired: true, isAscii: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        var query = "SELECT id, first_name, last_name, email, token, is_active, created_at, updated_at FROM ?? WHERE ??=? AND ??=?";
        var table = ["users", "email", req.body.email, "password", md5(req.body.password)];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length > 0)
                    res.json({ "error": false, "Message": "Success", "Users": rows });
                else
                    res.json({ "error": true, "Message": "Invalid email or password" });
            }
        });
    });


    //POST request to login a user using facebook, linkedin or google
    router.post("/socialLogin", routeValidator.validate({

        //Validations
        body: {
            first_name: { isRequired: true, isAscii: true },
            last_name: { isRequired: true, isAscii: true },
            email: { isRequired: true, isEmail: true },
            social_id: { isRequired: true, isAscii: true },
            type: { isRequired: true, isAscii: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        var column = '';
        var type = "";
        if (req.body.type == 1) {
            column = 'facebook_id';
            type = "2";
        } else if (req.body.type == 2) {
            column = 'linkedin_id';
            type = "4";
        } else {
            column = 'google_id';
            type = "3";
        }
        var query = "SELECT id FROM ?? WHERE ??=? AND ??=?";
        var table = ["users", column, req.body.social_id, "email", req.body.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length > 0) {
                    var query = "SELECT id, first_name, last_name, email, token, is_active, created_at, updated_at FROM ?? WHERE ??=? AND ??=?";
                    var table = ["users", "email", req.body.email, column, req.body.social_id];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                        } else {
                            if (rows.length > 0)
                                res.json({ "error": false, "Message": "Success", "Users": rows });
                            else
                                res.json({ "error": true, "Message": "Invalid Login" });
                        }
                    });
                } else {
                    utils.emailExists(req.body.email, mysql, connection, function(result) {
                        if (result.status == 1) {

                            //Executing query to update the data in users table.
                            var query = "UPDATE ?? SET ?? = ?, ??=? WHERE ?? = ?";
                            var table = ["users", column, req.body.social_id, "user_type", type, "email", req.body.email];
                            query = mysql.format(query, table);

                            //Sending Response
                            connection.query(query, function(err, rows) {
                                if (err) {
                                    res.json({ "error": true, "Message": "Error executing MySQL query" });
                                } else {
                                    var query = "SELECT id, first_name, last_name, email, token, is_active, created_at, updated_at FROM ?? WHERE ??=? AND ??=?";
                                    var table = ["users", "email", req.body.email, column, req.body.social_id];
                                    query = mysql.format(query, table);
                                    connection.query(query, function(err, rows) {
                                        if (err) {
                                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                                        } else {
                                            if (rows.length > 0)
                                                res.json({ "error": false, "Message": "Success", "Users": rows });
                                            else
                                                res.json({ "error": true, "Message": "Invalid Login" });
                                        }
                                    });
                                }
                            });
                        } else {

                            //Executing query to insert the data in users table.
                            var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
                            var table = ["users", "first_name", "last_name", "email", "token", column, "user_type", req.body.first_name, req.body.last_name, req.body.email, randomstring.generate(), req.body.social_id, type];
                            query = mysql.format(query, table);

                            //Sending Response
                            connection.query(query, function(err, rows) {
                                if (err) {
                                    res.json({ "error": true, "Message": "Error executing MySQL query" });
                                } else {
                                    var query = "SELECT id, first_name, last_name, email, token, is_active, created_at, updated_at FROM ?? WHERE ??=? AND ??=?";
                                    var table = ["users", "email", req.body.email, column, req.body.social_id];
                                    query = mysql.format(query, table);
                                    connection.query(query, function(err, rows) {
                                        if (err) {
                                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                                        } else {
                                            if (rows.length > 0)
                                                res.json({ "error": false, "Message": "Success", "Users": rows });
                                            else
                                                res.json({ "error": true, "Message": "Invalid Login" });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    });


    //POST request to reset forgotten password of a user
    router.post("/forgotpassword", routeValidator.validate({

        //Validations
        body: {
            email: { isRequired: true, isEmail: true, normalizeEmail: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        var query = "SELECT id, email FROM ?? WHERE ??=?";
        var table = ["users", "email", req.body.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length > 0) {

                    //Executing query to insert the data in users table.
                    var password_reset_token = randomstring.generate();
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    var table = ["users", "password_reset_token", password_reset_token, "id", rows[0].id];
                    query = mysql.format(query, table);

                    //Sending Response
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                        } else {
                            var message = 'We heard that you lost your Peersview password. Sorry about that!';
                            message += '<p>But don’t worry! You can use the following link within the next day to reset your password:</p>';
                            message += '<p>http://localhost:3000/api/reset_password/' + password_reset_token + '</p>';
                            message += '<p>If you don’t use this link within 24 hours, it will expire. To get a new password reset link, visit http://localhost:3000/password_reset</p>';
                            message += '<p>Thanks,<br />';
                            message += 'Admin at Peersview</p>';

                            Email.send(res, 'ramkumar897003@gmail.com', 'Password reset - Peersview', message, 'Password reset link has been sent to your email.');
                        }
                    });

                } else {
                    res.json({ "error": true, "Message": "Email is not registered with us." });
                }
            }
        });
    });


    //POST request to to send password reset link
    router.post("/sendresetlink", routeValidator.validate({

        //Validations
        body: {
            email: { isRequired: true, isEmail: true, normalizeEmail: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        var query = "SELECT id, email FROM ?? WHERE ??=?";
        var table = ["users", "email", req.body.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length > 0) {
                    //Executing query to insert the data in users table.
                    var password_reset_token = randomstring.generate();
                    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    var table = ["users", "password_reset_token", password_reset_token, "id", rows[0].id];
                    query = mysql.format(query, table);

                    //Sending Response
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                        } else {
                            var message = 'We heard that you lost your Peersview password. Sorry about that!';
                            message += '<p>But don’t worry! You can use the following link within the next day to reset your password:</p>';
                            message += '<p>http://localhost:3000/api/reset_password/' + password_reset_token + '</p>';
                            message += '<p>If you don’t use this link within 24 hours, it will expire. To get a new password reset link, visit http://localhost:3000/password_reset</p>';
                            message += '<p>Thanks,<br />';
                            message += 'Admin at Peersview</p>';

                            Email.send(res, 'ramkumar897003@gmail.com', 'Password reset - Peersview', message, 'Password reset link has been sent to your email.');
                        }
                    });
                } else {
                    res.json({ "error": true, "Message": "This email is not registered with us." });
                }
            }
        });
    });


    //POST request to check reset passpord link expiry
    router.post("/checktokenexpiry", routeValidator.validate({

        //Validations
        body: {
            password_reset_token: { isRequired: true, isAscii: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        var query = "SELECT id, email FROM ?? WHERE ??=? AND token_active_date >= now() - INTERVAL 1 DAY";
        var table = ["users", "password_reset_token", req.body.password_reset_token];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length > 0) {
                    res.json({ "error": true, "Message": "Password reset link is valid." });
                } else {
                    res.json({ "error": true, "Message": "Reset password link has been expired." });
                }
            }
        });
    });

    //POST request to set new password for a user
    router.post("/setnewpassword", routeValidator.validate({

        //Validations
        body: {
            password_reset_token: { isRequired: true, isAscii: true },
            password: { isRequired: true, isAscii: true, isLength: { min: 8, max: 24 }, message: 'Minimum 8 and maximum 24 characters are allowed!' },
            confirm_password: { isRequired: true, isAscii: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        if (req.body.confirm_password !== req.body.password) {
            res.status(400);
            res.json({ 'message': 'confirm_password and password doesn\'t match' });
            res.end();
            return;
        }

        var query = "SELECT id, email FROM ?? WHERE ??=?";
        var table = ["users", "password_reset_token", req.body.password_reset_token];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                if (rows.length == 0) {
                    res.json({ "error": true, "Message": "Password reset token has been expired." });
                } else {
                    var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
                    var table = ["users", "password", md5(req.body.password), "password_reset_token", "", "password_reset_token", req.body.password_reset_token];
                    query = mysql.format(query, table);

                    //Sending Response
                    connection.query(query, function(err, rows) {
                        if (err) {
                            res.json({ "error": true, "Message": "Error executing MySQL query" });
                        } else {
                            res.json({ "error": false, "Message": "Password has been changed successfully." });
                        }
                    });
                }
            }
        });

    });


    //GET request to get the list of courses
    router.get("/courses", routeValidator.validate({

        //Validations
        body: {

        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
        var query = "SELECT * FROM ??";
        var table = ["courses"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                var query = "SELECT interests.id as interest_id, interests.title as interest_title, subinterests.id as subinterest_id, subinterests.title as subinterest_title FROM ?? LEFT JOIN ?? ON ?? = ??";
                var table = ["interests", "subinterests", "interests.id", "subinterests.interest_id"];
                query = mysql.format(query, table);
                connection.query(query, function(err2, rows2) {
                    if (err2) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        var data = {};

                        for (var attr in rows2) {

                            if (data[rows2[attr].interest_title] != undefined)
                                data[rows2[attr].interest_title].push({ 'interest_id': rows2[attr].interest_id, 'subinterest_id': rows2[attr].subinterest_id, 'subinterest_title': rows2[attr].subinterest_title });
                            else
                                data[rows2[attr].interest_title] = [{ 'interest_id': rows2[attr].interest_id, 'subinterest_id': rows2[attr].subinterest_id, 'subinterest_title': rows2[attr].subinterest_title }];

                        }
                        res.json({ "error": false, "Courses": rows, "Interests": data });
                    }
                });
            }
        });
    });

    /*POST requset to update password*/
    router.post("/verification/:userId", function(req, res) {

        var query = "SELECT * FROM ??  WHERE ?? = ?";
        var table = ["users", "id", req.params.userId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else if (rows[0].is_verified != 0) {
                res.json({ "error": true, "Message": "Link is expired" });
            } else {
                var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                var table = ["users", "is_verified", "1", "id", req.params.userId];
                query = mysql.format(query, table);
                connection.query(query, function(err, row) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        utils.convertPug(path.join(__dirname, '../templates/welcomeTemplate.pug'), { name: rows[0].first_name })
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

}
