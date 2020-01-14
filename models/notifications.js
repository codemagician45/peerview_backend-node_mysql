var utils = require('../common/utils');

module.exports.routes = function(router, routeValidator, mysql, connection) {

    //GET request to get user's notifications
    router.get("/notifications/:start/:limit", routeValidator.validate({
          
          //Validations 
          body: {
            
          },
          headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            'token': { isRequired: true, isAscii: true, message: { isRequired: 'Token is required!' } }
          }
    }), function(req,res){

    	utils.checkToken(req.headers.token, mysql, connection, function (result) {
    		if(result.status == 1) {

		        //Executing query to select users and messages related data.
				var query = "SELECT CONCAT(users.first_name, ' ', users.last_name) as sender, notifications.receiver_id, notifications.sender_id, REPLACE(notifications.notification, '[sender]', CONCAT(users.first_name, ' ', users.last_name)) as notification, notifications.is_read, notifications.created_at FROM ?? LEFT JOIN ?? ON notifications.receiver_id = users.id WHERE ??=? ORDER BY notifications.created_at DESC LIMIT "+req.params.start+", "+req.params.limit+"";
				var table = ["notifications", "users", "receiver_id", result.user_id];
				query = mysql.format(query,table);

				//Sending Response
				connection.query(query,function(err,rows){
					if(err) {
					    res.json({"error" : true, "Message" : "Error executing MySQL query"});
					} else {
					    res.json({"error" : false, "Notifications" : rows});
					}
				});
			} else {
				res.json({"error" : true, "Messages" : 'Invalid Token!'});
			}
	    }); 
    });

}