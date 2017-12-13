var utils = require('../common/utils');
var merge = require('merge');
var uuid = require('uuid');
// var fs = require('file-system');
// var parse = require('csv-parse');
var csv = require('csvtojson');
var parseXlsx = require('excel');


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

    //POST request to suspend users
    router.post("/communityadmin/suspendedUser", routeValidator.validate({
        //Validations
        body: {
            user_id: { isRequired: true },
            uni_id: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
        }
    }), function(req, res) {



        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["suspended_user", "user_id", "uni_id", req.body.user_id, req.body.uni_id];
        query = mysql.format(query, table);
        //return res.json(query);
        //Sending Reesponse
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "error": false, "Message": "User has been suspend successfully!" });
            }
        });
    });

    //get request to get all groups
    router.get("/communityadmin/suspendedUser/:uniId", function(req, res) {

        var query = "select user_id from ?? where ??=?";
        var table = ["suspended_user", "uni_id", req.params.uniId];
        query = mysql.format(query, table);
        //res.json(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                //res.json(rows);
                var array = rows.map(function(value, index) {
                    return [value.user_id];
                });
                var string_arr = array.join(" OR id = ");
                //res.json(string_arr);
                var query = "select * from ?? where ??= " + string_arr + "";
                var table = ["users", "id"];
                query = mysql.format(query, table);
                //res.json(query);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Users", "suspendedUsers": rows });
                    }
                });
            }
        });
    });

    //post request to search a post
    router.post("/communityadmin/post/search/", routeValidator.validate({
        body: {
            post_searchContent: { isRequired: true },
            classId: { isRequired: true },
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "SELECT posts.*, users.id as user_id, users.first_name, users.last_name FROM ?? JOIN ?? ON posts.author_id = users.id WHERE posts.classId = ? AND posts.is_active = ? AND (posts.title LIKE '%" + req.body.post_searchContent + "%' OR posts.description LIKE '%" + req.body.post_searchContent + "%')";
                var table = ["posts", "users", req.body.classId, "1"];
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


    //Post request to inserts courses
    router.post("/communityadmin/import", multipleUpload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {

        var image = req.files && req.files.map(image => image.filename);


        if (req.body.description == '') {
            return res.json({ "error": "body.description is required" });
        }

        utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var inputPath = "./uploads/" + image[1];
                var mine_type = image[1].substring(image[1].lastIndexOf('.'));
                if (mine_type == ".csv") {
                    csv()
                        .fromFile(inputPath)
                        .on('json', (jsonObj) => {
                            console.log('hghgg', jsonObj);
                            var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                            var table = ["cources", "name", "description", "image", "courseType", "universityId", jsonObj.name, jsonObj.desc, image[0], jsonObj.type, result.user_id];
                            query = mysql.format(query, table);
                            //res.json(query);
                            connection.query(query, function(err, rows) {
                                if (err) {
                                    res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                } else {
                                    var insertId = rows.insertId;
                                    var class_arr = jsonObj.className.split(',');
                                    console.log(class_arr, 'jsonObj.className', jsonObj.className);
                                    for (var i = 0; i < class_arr.length; i++) {
                                        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                                        var table = ["courseClasses", "courseId", "universityId", "name", insertId, result.user_id, class_arr[i]];
                                        query = mysql.format(query, table);
                                        connection.query(query, function(err, resp) {
                                            if (err) {
                                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });

                                            } else {
                                                res.json({ "error": false, "Message": "Add saved successfully" });

                                            }
                                        });
                                    }
                                }
                            });

                        })
                        .on('done', (error) => {

                        })
                } else {
                    parseXlsx(inputPath, function(err, data) {
                        if (err) {
                            res.json({ "error": false, "Message": "error" });

                        } else {

                            for (var i = 0; i < data.length; i++) {
                                if (i > 0) {
                                    var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
                                    var table = ["cources", "name", "description", "image", "courseType", "universityId", data[i][0], data[i][1], image[0], data[i][2], result.user_id];
                                    query = mysql.format(query, table);
                                    connection.query(query, function(err, rows) {
                                        if (err) {
                                            res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                                        } else {
                                            for (var i = 0; i < data.length; i++) {
                                                if (i > 0) {
                                                    str = data[i][3];
                                                    var insertId = rows.insertId;
                                                    var string_arr = str.split(',');
                                                    for (var j = 0; j < string_arr.length; j++) {
                                                        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                                                        var table = ["courseClasses", "courseId", "universityId", "name", insertId, result.user_id, string_arr[j]];
                                                        query = mysql.format(query, table);
                                                        connection.query(query, function(err, resp) {
                                                            if (err) {
                                                                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });

                                                            } else {
                                                                res.json({ "error": false, "Message": "Cources saved successfully" });

                                                            }
                                                        });
                                                    }



                                                }
                                            }


                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get groups
    router.get("/communityadmin/post/publicgroups", upload, routeValidator.validate({
        headers: {
            //'token': { isRequired: true }
        }
    }), function(req, res) {
                var query = "select * from ?? where ??=?";
                var table = ["groups", "instituteId","1"];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Groups Fetched successfully", "groups": rows });
                    }
                });
    });

    //get request to get Society
    router.get("/communityadmin/post/publicsociety", upload, routeValidator.validate({
        headers: {
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var query = "select * from ?? where ??=?";
                var table = ["socitiesclubs", "instituteId", result.user_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Society Fetched successfully", "society": rows });
                    }
                });
            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //post request to search a post
    router.post("/communityadmin/post/searchCount/", routeValidator.validate({
        body: {
            search_content: { isRequired: true }
        },
        headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true }
        }
    }), function(req, res) {
        utils.checkCommunityToken(req.headers.token, mysql, connection, function(result) {
            if (result.status == 1) {
                var search_content = req.body.search_content;
                var countarray = [];
                var search_arr = search_content.split(',');
                for (i = 0; i < search_arr.length; i++) {
                    var query = "select count(id) as " + search_arr[i] + " from ?? where title like '%" + search_arr[i] + "%' OR description like '%" + search_arr[i] + "%'";
                    var table = ["posts"];
                    query = mysql.format(query, table);
                    countarray.push(promise_query(query, connection));
                }
                Promise.all(countarray).then(values => {
                    values = values.reduce(function(elem1, elem2) {
                        return elem1.concat(elem2);
                    });
                    res.json({ "error": false, "Message": "Event", "rows": values });
                });

            } else {
                res.json({ "error": true, "Messages": 'Invalid Token!' });
            }
        });
    });

    //get request to get a post
    router.get("/communityadmin/post/reported/", function(req, res) {
        var query = "select post_id from ?? where ??";
        var table = ["report_post", "post_id"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
            } else {
                var array = rows.map(function(value, index) {
                    return [value.post_id];
                });
                var string_arr = array.join(" OR posts.id = ");
                var query = "SELECT posts.*, users.id as user_id, users.first_name, users.last_name FROM ?? JOIN ?? ON posts.author_id = users.id WHERE posts.id = " + string_arr;
                var table = ["posts", "users"];
                query = mysql.format(query, table);
                connection.query(query, function(err, resp) {
                    if (err) {
                        res.json({ "error": true, "Message": "Error executing MySQL query", err: err });
                    } else {
                        res.json({ "error": false, "Message": "Reported Post Fetched Successfully", "ReportedPosts": resp });
                    }

                });

            }
        });
    });

    //post request to search a post
    router.get("/communityadmin/post/spam/", routeValidator.validate({
        body: {
        },
        headers: {
            //'content-type': { isRequired: true, equals: 'application/json' },
        }
    }), function(req, res) {
                var search_content = req.body.search_content;
                var countarray = [];
                var query = "SELECT posts.*, users.id as user_id, users.first_name, users.last_name FROM ?? JOIN ?? ON posts.author_id = users.id WHERE posts.is_active = ?";
                var table = ["posts", "users", 1];
                query = mysql.format(query, table);
                connection.query(query, function(err, resp) {
                    Promise.all(countarray).then(values => {
                        res.json({ "error": false, "Message": "Spam Post Fetched Successfully", "SpamPost": values });
                   });
                });
                
                
    });

    //Post request to inserts posts
    router.post("/communityadmin/post/add", upload, routeValidator.validate({
         headers: {
            'token': { isRequired: true }
          }
        }), function(req,res){
        if(req.body.category_id == ''){
            return res.json({"error": "body.category_id is required"});
        }else if(req.body.title == ''){
            return res.json({"error": "body.title is required"});
        }else if(req.body.description == ''){
            return res.json({"error": "body.description is required"});
        }else if(req.body.type == ''){
            return res.json({"error": "body.type is required"});
        }else if(req.body.type == 2){
            if(req.body.courseId == ""){
                return res.json({"error": "body.courseId is required"});
            }else if(req.body.classId == ""){
                return res.json({"error": "body.classId is required"});
            }
        }else if(req.body.type == 3){
            if(req.body.groupId == ""){
                return res.json({"error": "body.groupId is required"});
            }
        }else if(req.body.type == 4){
            if(req.body.socityclubId == ""){
                return res.json({"error": "body.socityclubId is required"});
            }
        }
        //return res.json({body: req.body, file: req.file});
        utils.checkCommunityToken(req.headers.token, mysql, connection, function (result) {
            if(result.status == 1) {
                if(req.file){
                    var filenamedata = req.file.filename;
                }else{
                   var filenamedata = "";
                }
                if(req.body.type == 2){
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
                    var table = ["posts", "communityId", "category_id", "title", "description", "image", "type", "courseId", "classId", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, req.body.courseId, req.body.classId, "1"];
                }else if(req.body.type == 3){
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
                    var table = ["posts", "communityId", "category_id", "title", "description", "image", "type", "groupId", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, req.body.groupId, "1"];
                }else if(req.body.type == 4){
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
                    var table = ["posts", "communityId", "category_id", "title", "description", "image", "type", "sacId", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, req.body.socityclubId, "1"];
                }else{
                    var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
                    var table = ["posts", "communityId", "category_id", "title", "description", "image", "type", "is_active", result.user_id, req.body.category_id, req.body.title, req.body.description, filenamedata, req.body.type, "1"];
                }

                query = mysql.format(query,table);
                //res.json(query);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"error" : true, "Message" : "Error executing MySQL query", err: err});
                    } else {
                        res.json({"error" : false, "Message" : "Post saved successfully"});
                    }
                });
            } else {
                res.json({"error" : true, "Messages" : 'Invalid Token!'});
            }
        });
    });


    //Put request to update posts
    router.put("/communityadmin/post/:postId", upload, routeValidator.validate({
          headers: {
            'token': { isRequired: true }
          }
        }), function(req,res){
        if(req.body.category_id == ''){
            return res.json({"error": "body.category_id is required"});
        }else if(req.body.title == ''){
            return res.json({"error": "body.title is required"});
        }else if(req.body.description == ''){
            return res.json({"error": "body.description is required"});
        }else if(req.body.type == 2){
            if(req.body.courseId == ""){
                return res.json({"error": "body.courseId is required"});
            }else if(req.body.classId == ""){
                return res.json({"error": "body.classId is required"});
            }
        }else if(req.body.type == 3){
            if(req.body.groupId == ""){
                return res.json({"error": "body.groupId is required"});
            }
        }else if(req.body.type == 4){
            if(req.body.socityclubId == ""){
                return res.json({"error": "body.socityclubId is required"});
            }
        }
        //return res.json({body: req.body, file: req.file});
        utils.checkCommunityToken(req.headers.token, mysql, connection, function (result) {
            if(result.status == 1) {
                if(req.file){
                    var filenamedata = "`image` = '"+req.file.filename+"',";

                }else{
                    var filenamedata = "";
                }
                if(req.body.type == 2){
                    var query = "UPDATE ?? SET "+filenamedata+" ?? = ?, ?? = ?,  ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description, "courseId", req.body.courseId, "classId", req.body.classId, "id", req.params.postId, "communityId", result.user_id];
                }else if(req.body.type == 3){
                     var query = "UPDATE ?? SET "+filenamedata+" ?? = ?, ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description, "groupId", req.body.groupId, "id", req.params.postId, "communityId", result.user_id];
                }else if(req.body.type == 4){
                     var query = "UPDATE ?? SET "+filenamedata+" ?? = ?, ?? = ?,  ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description, "sacId", req.body.socityclubId, "id", req.params.postId, "communityId", result.user_id];
                }else{
                    var query = "UPDATE ?? SET "+filenamedata+" ?? = ?, ?? = ?,  ?? = ? WHERE ?? = ? and ?? = ?";
                    var table = ["posts", "category_id", req.body.category_id, "title", req.body.title, "description", req.body.description,  "id", req.params.postId, "communityId", result.user_id];
                }
                query = mysql.format(query,table);
                //res.json(query);
                connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"error" : true, "Message" : "Error executing MySQL query", err: err});
                    } else if(rows.affectedRows == 0) {
                        res.json({"error" : true, "Message" : "Don't seems to be your post"});
                    }else{
                        res.json({"error" : false, "Message" : "Post updated successfully"});
                    }
                });
            } else {
                res.json({"error" : true, "Messages" : 'Invalid Token!'});
            }
        });
    });





}
