var utils = require('../../common/utils');

module.exports.routes = function(router, routeValidator, mysql, connection, md5, Promise, passport, request, sessionStorage) {

    router.get("/",function(req,res){
        //res.json({"Message" : "Hello World !"});
        res.render('pages/index');
    });
    
    router.get("/signUp",function(req,res){
        res.render('pages/signup');
    });
    
    router.get("/signIn",function(req,res){
        res.render('pages/signin');
    });
    
    /*Change Password Page*/
    router.get("/createPassword/:token",function(req,res){
        var query = "SELECT  ?? FROM ?? where ?? = ? and ?? = ?";
        var table = ["email", "users", "token", req.params.token, "change_pwd", "1"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"error" : true, "Message" : "Error executing MySQL query", err: err});
            } else {
                if(rows.length > 0)
                    res.render('pages/createPassword',{token: req.params.token});
                else
                    res.render('pages/createPassword',{token: ""});
            }
        });
    });
    /*After Login*/
    router.get("/user/home/",function(req,res){
        res.render('pages/home');
    });
    
    router.get('/auth/google',
          passport.authenticate('google', { scope:
            [ 'https://www.googleapis.com/auth/plus.login',
              'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
        ));
    // google authemticate
   router.get('/auth/google/callback',
        passport.authenticate('google', function(err, user) {
        if(err == null){
            var full_name   = user.displayName;
             var name = full_name.split(" ");
             if(name[1]){
                 var last_name = name[1];
             }else{
                 var last_name = " ";
             }
           /* console.log(user.email);*/
            var data = JSON.stringify({first_name : name[0], last_name: last_name, email: user.email, social_id: user.id, type: '3'});
            var sess;
          request.post({
              type:"post", 
              headers: {'content-type': 'application/json'},
              url:     'http://localhost:3000/api/sociallogin',
              body:    data,
            }, function(error, response, body){
              var jsonObject = JSON.parse(body);
              var users_data = jsonObject.Users;
              var userId = users_data[0].id
              sess=userId.session;
              console.log(sess);
            }); 
        }
    }));

    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', function(err, user) {
        if(err == null){
            var full_name   = user.user_name;
             var name = full_name.split(" ");
             if(name[1]){
                 var last_name = name[1];
             }else{
                 var last_name = " ";
             }
            /*console.log(user);*/
            var sess;
          request.post({
              type:"post", 
              headers: {'content-type': 'application/json'},
              url:     'http://localhost:3000/api/sociallogin',
              body:    JSON.stringify({first_name : name[0], last_name: last_name, email: user.email, social_id: user.id, type: '1'}),
            }, function(error, response, body){
              var jsonObject = JSON.parse(body);
              var users_data = jsonObject.Users;
              var userId = users_data[0].id
              sess=userId.session;
              console.log(sess);
            }); 
        }
    }));
    
    
    router.get('/auth/linkedin', passport.authenticate('linkedin'));
    // linkedin authemticate
   router.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', function(err, user) {
        if(err == null){
            var full_name   = user.displayName;
             var name = full_name.split(" ");
             if(name[1]){
                 var last_name = name[1];
             }else{
                 var last_name = " ";
             }
           /* console.log(user.email);*/
            var data = JSON.stringify({first_name : name[0], last_name: last_name, email: user.email, social_id: user.id, type: '2'});
            var sess; 
          request.post({
              type:"post", 
              headers: {'content-type': 'application/json'},
              url:     'http://localhost:3000/api/sociallogin',
              body:    data,
            }, function(error, response, body){
              var jsonObject = JSON.parse(body);
              var users_data = jsonObject.Users;
              var userId = users_data[0].id
              sess=userId.session;
              console.log(sess);
            }); 
        }
    }));

    // route for logging out
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    //POST request to get login user details
    router.post("/users/login", routeValidator.validate({
          //Validations 
        body:{
            email: { isRequired: true, isEmail: true},
            password: { isRequired: true, isAscii: true}
        },
          headers: {
            'content-type': { isRequired: true, equals: 'application/json' },
            //'token': { isRequired: true }
          }
        }), function(req,res){
        var query = "SELECT  ??,??,??,??,?? FROM ?? where ?? = ? and ?? = ?";
        var table = ["id", "first_name", "last_name", "email", "token", "users", "email", req.body.email, "password", md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"error" : true, "Message" : "Error executing MySQL query", err: err});
            } else {
                if(rows.length>0)
                    res.json({"error" : false, "Message" : "Success", "User" : rows});
                else
                    res.json({"error" : false, "Message" : "fails", "User" : ""});
                
            }
        });
    });
    
};   

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



