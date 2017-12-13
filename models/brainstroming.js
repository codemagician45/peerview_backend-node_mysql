var utils = require('../common/utils');
var merge = require('merge');
var uuid = require('uuid');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, Promise, multer, randomstring) {


    /* post requiest to create topic in brainstroming*/

    router.post("/brainstroming/add", routeValidator.validate({
        body: {
            'topicName': { isRequired: true },
            'typeId': { isRequired: true }, /*1-community, 2-forum*/
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        if(req.body.typeId == 1){
            if (typeof req.body.courseId == "undefined" || req.body.courseId == null || req.body.courseId == "") {
                return res.json({ "error": "body.courseId is required" }); /* courseId in community */
            }else if (typeof req.body.classId == "undefined" || req.body.classId == null || req.body.classId == "") {
                return res.json({ "error": "body.classId is required" }); /* classId in community */
            }
        }
        if(req.body.typeId == 2){
            if (typeof req.body.forumId == "undefined" || req.body.forumId == null || req.body.forumId == "") {
                return res.json({ "error": "body.forumId is required" }); /* forumId in forum */
            }
        }
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
                var table = ["brainStromingDetails", "userID", "typeId", "topicName", "forumId", result.user_id, req.body.typeId, req.body.topicName,req.body.forumId];
                if(req.body.typeId == 1){
                    var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                    var table = ["brainStromingDetails", "userID", "typeId", "topicName", "courseId", "classId", result.user_id, req.body.typeId, req.body.topicName,req.body.courseId,req.body.classId];
                }
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "topic created successfully", "diagramId":rows.insertId });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    /* put requiest to update topic in brainstroming*/

    router.put("/brainstroming/update/:diagramId", routeValidator.validate({
        body: {
            'topicName': { isRequired: true },
            'courseId': { isRequired: true },
            'classId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE  ?? = ? AND ?? = ?";
                var table = ["brainStromingDetails", "topicName", req.body.topicName, "courseId", req.body.courseId, "classId", req.body.classId, "diagramId", req.params.diagramId, "userID", result.user_id];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "topic update successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* put request to update topic in brainstroming forum*/

    router.put("/brainstroming/forumupdate/:diagramId", routeValidator.validate({
        body: {
            'topicName': { isRequired: true },
            'forumId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE  ?? = ? AND ?? = ?";
                var table = ["brainStromingDetails", "topicName", req.body.topicName, "forumId", req.body.forumId, "diagramId", req.params.diagramId, "userID", result.user_id];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "topic update successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

     /* post requiest to create topic in brainstroming*/

    router.post("/brainstroming/addnode/", routeValidator.validate({
        body: {
            'diagramId':{isRequired: true},
            'name': { isRequired: true },
            'color': { isRequired: true },
            'shape': { isRequired: true },
            'parentId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                var table = ["brainStroming", "name", "nodecolor", "nodeshape", "parentId", "diagramId", req.body.name,req.body.color,req.body.shape, req.body.parentId, req.body.diagramId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "node created successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* put requiest to update topic in brainstroming*/

    router.put("/brainstroming/updatenode/:nodeId", routeValidator.validate({
        body: {
            'name': { isRequired: true },
            'color': { isRequired: true },
            'shape': { isRequired: true },
            'parentId': { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE  ?? = ?";
                var table = ["brainStroming", "name", req.body.name, "nodecolor", req.body.color, "nodeshape", req.body.shape, "parentId", req.body.parentId, "nodeId", req.params.nodeId];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "topic update successfully!" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    //Delete request to delete posts
    router.delete("/brainstroming/node/:nodeId", routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "DELETE from ?? WHERE ??=?";
                var table = ["brainStroming", "nodeId", req.params.nodeId];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else if (rows.affectedRows == 0) {
                        res.json({ "error": true, "Message": "node hasnot deleted" });
                    } else {
                        res.json({ "error": false, "Message": "node deleted successfully" });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //post request to get nodes
    router.get("/brainstroming/node/:diagramId", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT * from ?? WHERE ??=?";
                var table = ["brainStroming", "diagramId", req.params.diagramId];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {

                        let topicMap = {};
                        console.log(rows)

                        rows.forEach(node => {
                            let channel = node.parentId;
                            topicMap[channel] = topicMap[channel] || [];
                            topicMap[channel].push(node);
                        });

                        res.json({ "error": false, "Message": "nodes regarding daigram", "nodes": topicMap });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });


    /* get request to get all daigram with froum */
    router.get("/brainstroming/forum/:forumId", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT * from ?? WHERE ??=?";
                var table = ["brainStromingDetails", "forumId", req.params.forumId];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {

                        res.json({ "error": false, "Message": "diagram", "rows": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    /* get request to get all daigram with courseId and classId */
    router.get("/brainstroming/coruse/:courseId/:classId", routeValidator.validate({
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT * from ?? WHERE ??=? and ??=?";
                var table = ["brainStromingDetails", "courseId", req.params.courseId, "classId", req.params.classId];
                query = mysql.format(query, table);
                //return res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {

                        res.json({ "error": false, "Message": "diagram", "rows": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

}
