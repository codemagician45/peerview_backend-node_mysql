// function build_query (db_name, body, type) {

// 	if(!db_name)
// 		throw new Error("please provide a database name");

// 	if(!body)

// 	var query = "";
// 	for(var prop in body) {
// 		"UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
// 	}
// }

// Object.keys(myArray).map(function(key) {return myArray.hasOwnProperty(key)} ).length
var pug = require('pug');
var fs = require('fs');
var Promise = require('promise');


function build_insert_query(table_name, fields, body) {
    // var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
    var query = "";
    var fields_string = "";
    var values_string = "";

    /*
    	loop over fields
    	let len to avoid lookup calls
    */

    for (var i = 0, len = fields.length; i < len; i++) {

        if (i == 0) {
            fields_string += "(";
            values_string += "(";
        }

        fields_string += fields[i];
        values_string += body[fields[i]];

        if (i = len - 1) {
            fields_string += ")";
            values_string += ")";
        } else {
            fields_string += ",";
            values_string += ",";
        }

    }

    return query + fields_string + values_string;

}

function users_exists(users, mysql, connection, cb) {
    var query = "SELECT COUNT(*) FROM ?? WHERE";
    var conditions = ""

    var table = ["users"];

    users.forEach(function(user) {
        conditions += conditions ? " AND ?? = ?" : " ?? = ?";
        table.push("id");
        table.push(user);
    })

    query = mysql.format(query + conditions, table);
    console.log(query);

    connection.query(query, function(err, rows) {
        console.log(rows, rows[0]['COUNT)(*)']);
        if (err) {
            cb({
                err: err,
                success: false
            });
        } else {
            cb({
                err: false,
                success: true
            });
        }
    });
}

function checkToken(token, mysql, connection, cb) {
   
    //Executing query to select user id from users.
    var query = "SELECT id FROM ?? WHERE ??=?";
    var table = ["users", "token", token];
    query = mysql.format(query, table);

    //Sending Response
    connection.query(query, function(err, rows) {
        if (err) {
            res.json({ "error": true, "Message": "Error executing MySQL query" });
        } else {
            if (!rows.length) {
                cb({
                    status: 0
                });
            } else {
                cb({
                    status: 1,
                    user_id: rows[0].id
                });
            }
        }
    });
}

function check_user_email(request, mysql, connection, cb) {
    //Executing query to select user id from users.
    var query = "SELECT id FROM ?? WHERE ??=?";
    var table = ["users", "email", request];
    query = mysql.format(query, table);

    //Sending Response
    connection.query(query, function(err, rows) {
        if (err) {
            res.json({ "error": true, "Message": "Error executing MySQL query" });
        } else {
            if (rows.length > 0) {
                cb({
                    status: 1

                });
            } else {
                cb({
                    status: 0,

                });
            }
        }
    });
}




function checkCommunityToken(token, mysql, connection, cb) {
    //Executing query to select user id from users.
    var query = "SELECT communityId FROM ?? WHERE ??=?";
    var table = ["community", "token", token];
    query = mysql.format(query, table);

    //Sending Response
    connection.query(query, function(err, rows) {
        if (err) {
            res.json({ "error": true, "Message": "Error executing MySQL query" });
        } else {
            if (!rows.length) {
                cb({
                    status: 0
                });
            } else {
                cb({
                    status: 1,
                    user_id: rows[0].communityId
                });
            }
        }
    });
}

function checkRelation(receiver_id, sender_id, mysql, connection, cb) {
    //Executing query to select user id from users.
    var query = "SELECT id FROM ?? WHERE ??=?";
    var table = ["messages", "receiver_id", receiver_id, "sender_id", sender_id];
    query = mysql.format(query, table);

    //Sending Response
    connection.query(query, function(err, rows) {
        if (err) {
            res.json({ "error": true, "Message": "Error executing MySQL query" });
        } else {
            if (!rows.length) {
                cb({
                    status: 0
                });
            } else {
                cb({
                    status: 1,
                    user_id: rows[0].id
                });
            }
        }
    });
}

function checkCurrentPassword(token, password, mysql, connection, cb) {
    //Executing query to select user id from users.
    var query = "SELECT id FROM ?? WHERE ??=? AND ??=?";
    var table = ["users", "token", token, "password", password];
    query = mysql.format(query, table);

    //Sending Response
    connection.query(query, function(err, rows) {
        if (err) {
            res.json({ "error": true, "Message": "Error executing MySQL query" });
        } else {
            if (!rows.length) {
                cb({
                    status: 0
                });
            } else {
                cb({
                    status: 1
                });
            }
        }
    });
}

function checkCommunityCurrentPassword(token, password, mysql, connection, cb) {
    //Executing query to select user id from users.
    var query = "SELECT communityId FROM ?? WHERE ??=? AND ??=?";
    var table = ["community", "token", token, "password", password];
    query = mysql.format(query, table);

    //Sending Response
    connection.query(query, function(err, rows) {
        if (err) {
            res.json({ "error": true, "Message": "Error executing MySQL query" });
        } else {
            if (!rows.length) {
                cb({
                    status: 0
                });
            } else {
                cb({
                    status: 1
                });
            }
        }
    });
}

function emailExists(email, mysql, connection, cb) {
    //Executing query to select user id from users.
    var query = "SELECT id FROM ?? WHERE ??=?";
    var table = ["users", "email", email];
    query = mysql.format(query, table);

    //Sending Response
    connection.query(query, function(err, rows) {
        if (err) {
            res.json({ "error": true, "Message": "Error executing MySQL query" });
        } else {
            if (!rows.length) {
                cb({
                    status: 0
                });
            } else {
                cb({
                    status: 1
                });
            }
        }
    });
}

function convertPug(file, values) {

    return new Promise((res, rej) => {

        fs.readFile(file, 'utf8', (err, content) => {

            if (err) {

                return rej(err)

            } else {

                const compiledToPug = pug.compile(content, {
                    filename: file
                })

                const html = compiledToPug(values);

                res(html)

            }

        })

    })
}

module.exports = {
    build_insert_query: build_insert_query,
    users_exists: users_exists,
    checkToken: checkToken,
    checkCurrentPassword: checkCurrentPassword,
    emailExists: emailExists,
    checkCommunityToken: checkCommunityToken,
    checkCommunityCurrentPassword: checkCommunityCurrentPassword,
    convertPug: convertPug,
    check_user_email: check_user_email,

}
