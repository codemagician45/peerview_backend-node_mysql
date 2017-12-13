var utils = require('../common/utils');
var emailtemplate = require('../common/emailtemplate');

var path = require('path');
var email = require('../common/email');
var url = require('url');
module.exports.routes = function(router, routeValidator, mysql, connection, multer) {
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

    var upload = multer({ storage: storage, limits: { fileSize: 52428800 } }).single('file');

    //GET request to get user's messages
    router.get("/messages/:sender_id", routeValidator.validate({

        //Validations
        body: {
            //sender_id: { isRequired: true, isAscii: true, message: { isRequired: 'Sender ID is required!' } }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true, message: { isRequired: 'Token is required!' } }
        }
    }), function(req, res) {

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {

                //Updating the messages to set messages readed.
                var query = "UPDATE ?? SET ?? = ? WHERE (??=? AND ??=?) OR (??=? AND ??=?) AND ??=?";
                var table = ["messages", "is_read", 1, "receiver_id", result.user_id, "sender_id", req.params.sender_id, "receiver_id", req.params.sender_id, "sender_id", result.user_id, "is_read", 0];
                query = mysql.format(query, table);

                //Sending Response
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    }
                });

                //Executing query to select users and messages related data.
                var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) as sender, messages.receiver_id, messages.sender_id, messages.message, messages.is_read, messages.created_at FROM ?? LEFT JOIN ?? ON messages.receiver_id = users.id WHERE (??=? AND ??=?) OR (??=? AND ??=?)";
                var table = ["messages", "users", "receiver_id", result.user_id, "sender_id", req.params.sender_id, "receiver_id", req.params.sender_id, "sender_id", result.user_id];
                query = mysql.format(query, table);

                //Sending Response
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        res.json({ "error": false, "Messages": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //GET request to get message headers
    router.get("/message/headers/:start/:limit", routeValidator.validate({

        //Validations
        body: {
            //start: { isRequired: true, isAscii: true, message: { isRequired: 'Start is required!' } },
            //limit: { isRequired: true, isAscii: true, message: { isRequired: 'Limit is required!' } }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true, message: { isRequired: 'Token is required!' } }
        }
    }), function(req, res) {

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                //Executing query to select users and messages related data.
                var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) as sender, messages.receiver_id, messages.sender_id, messages.message, messages.is_read, messages.created_at FROM ?? LEFT JOIN ?? ON messages.sender_id = users.id WHERE ??=? GROUP BY messages.sender_id ORDER BY messages.created_at DESC LIMIT " + req.params.start + "," + req.params.limit + "";
                var table = ["messages", "users", "receiver_id", result.user_id];
                query = mysql.format(query, table);

                //Sending Response
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        var data = rows;
                        //Executing query to select users and messages related data.
                        var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) as sender, messages.receiver_id, messages.sender_id, messages.message, messages.is_read, messages.created_at FROM ?? LEFT JOIN ?? ON messages.receiver_id = users.id WHERE (??=? AND ??=?) OR (??=? AND ??=?)";
                        var table = ["messages", "users", "receiver_id", result.user_id, "sender_id", data[0].sender_id, "receiver_id", data[0].sender_id, "sender_id", result.user_id];
                        query = mysql.format(query, table);

                        //Sending Response
                        connection.query(query, function(err, rows) {
                            if (err) {
                                res.json({ "error": true, "Message": "Error executing MySQL query" });
                            } else {
                                res.json({ "error": false, "Headers": data, "Messages": rows });
                            }
                        });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //POST request to send a message
    router.post("/message/send", routeValidator.validate({
        //Validations
        body: {
            receiver_id: { isRequired: true, isAscii: true, message: { isRequired: 'Receiver ID is required!' } },
            message: { isRequired: true, isAscii: true, message: { isRequired: 'Message is required!' } }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true, message: { isRequired: 'Token is required!' } }
        }
    }), function(req, res) {

        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                //Executing query to select users and messages related data.
                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["messages", "sender_id", "receiver_id", "message", result.user_id, req.body.receiver_id, req.body.message];
                query = mysql.format(query, table);

                //Sending Response
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query" });
                    } else {
                        var query = "Select * from ?? Where ?? = ?";
                        var table = ["users","id",req.body.receiver_id];
                        query = mysql.format(query,table);
                        connection.query(query,function(err,response) {
                           if(err){
                             res.json({ "error": true, "Message": "Error executing MySQL query","err":err});
                           }
                           else{
                            var query = "Select email,first_name from ?? Where ?? = ?";
                            var table = ["users","id",result.user_id];
                            query = mysql.format(query,table);
                            connection.query(query,function(err,rows){
                              if(err){
                                res.json({ "error": true, "Message": "Error executing MySQL query","err":err});
                              }else{
                              var reciever_name = response[0].first_name;
                              var reciever_email = response[0].email;
                              var sender_email = rows[0].email;
                              var sender_name = rows[0].first_name;
                              emailtemplate.user_unread_message(reciever_email,reciever_name,sender_name,req,res,function(result){});
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

    //POST request to send a message
    router.post("/message/send/file", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true, message: { isRequired: 'Token is required!' } }
        }
    }), function(req, res) {
        if (req.body.receiver_id == '') {
            return res.json({ "error": "Receiver ID is required!" });
        } else if (req.body.message == '') {
            return res.json({ "error": "Message is required!" });
        }
        upload(req, res, function(err) {
            if (err) {
                console.log(err.code);
                return false;
                res.json({ "error": "File is too large! Max Upload size is 50MB" });
            }
            if(req.file){
            	var filename = req.file.filename;
        	}else{
        		var filename="";
        	}
	        utils.checkToken(req.headers.token, mysql, connection, function(result) {
	            if (result.status == 1) {
	                //Executing query to select users and messages related data.
	                var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
	            	var table = ["messages","sender_id","receiver_id","message","file", result.user_id,req.body.receiver_id,req.body.message,filename];
	            	query = mysql.format(query,table);

					//Sending Response
					connection.query(query,function(err,rows){
						if(err) {
						    res.json({"error" : true, "Message" : "Error executing MySQL query"});
						} else {
						    res.json({"error" : false, "Message" : 'Message Sent Successfully!'});
						}
					});
	            } else {
	                res.json({ "error": true, "Messages": 'Invalid Token!' });
	            }
	        });
        });
    });
}
