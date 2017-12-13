var mysql = require("mysql"),
routeValidator = require('express-route-validator'),
Promise = require('promise'),
multer  = require('multer'),
User = require('./models/users.js'),
Posts = require('./models/posts.js'),
Events = require('./models/events.js'),
Forum = require('./models/forum.js'),
Community = require('./models/community.js'),
CommunityAdmin = require('./models/communityadmin.js'),
BrainStroming = require('./models/brainstroming.js'),
Auth = require('./models/auth.js'),
Email = require('./common/email.js');
Messages = require('./models/messages.js');
Notifications = require('./models/notifications.js');
Email = require('./models/emailtemplate.js');
topStories = require('./models/topStories.js');


function REST_ROUTER(router,connection,md5,randomstring, sequelize) { 
    var self = this;
    self.handleRoutes(router,connection,md5,randomstring, sequelize);

}


//Defining Routes
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5,randomstring, sequelize) {

    //Call user routes from ./models/users.js
    User.routes(router, routeValidator, mysql, connection, md5, Promise,  multer, sequelize);

    //Call post routes from ./models/posts.js
    Posts.routes(router, routeValidator, mysql, connection, md5, Promise,multer);

    //Call post routes from ./models/events.js
    Events.routes(router, routeValidator, mysql, connection, md5, Promise,multer);

    //Call post routes from ./models/forum.js
    Forum.routes(router, routeValidator, mysql, connection, md5, Promise,multer);

    //Call post routes from ./models/community.js
    Community.routes(router, routeValidator, mysql, connection, md5, Promise,multer, randomstring);

    //Call post routes from ./models/communityadmin.js
    CommunityAdmin.routes(router, routeValidator, mysql, connection, md5, Promise,multer, randomstring);

    //Call post routes from ./models/communityadmin.js
    BrainStroming.routes(router, routeValidator, mysql, connection, md5, Promise,multer, randomstring);

    //Call auth routes from ./models/auth.js
    Auth.routes(router, routeValidator, mysql, connection, md5, randomstring, Email);

    //Call messages routes from ./models/messages.js
    Messages.routes(router, routeValidator, mysql, connection,multer);

    //Call notification routes from ./models/notifications.js
    Notifications.routes(router, routeValidator, mysql, connection);

    //Call email routes from ./models/emailtemplate.js
    Email.routes(router, routeValidator, mysql, connection, Email);

    //Call top stories routes from ./models/topStories.js
    topStories.routes(router, routeValidator, mysql, connection);
}

module.exports = REST_ROUTER;
