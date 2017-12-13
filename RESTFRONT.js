var mysql = require("mysql"),
routeValidator = require('express-route-validator'),
Promise = require('promise'),
multer  = require('multer'),
User = require('./models/front/user_front.js'),
Email = require('./common/email.js');
var passport = require('passport');
var passportstrategy = require('passport-facebook').Strategy;
var request = require('request');

function REST_ROUTER_FRONT(router,connection,md5,randomstring,passport, request, transporter) {
    var self = this;
    self.handleRoutes(router,connection,md5,randomstring,passport, request, transporter);
}


//Defining Routes
REST_ROUTER_FRONT.prototype.handleRoutes= function(router,connection,md5,randomstring,passport, request, transporter) {
    
    //Call user routes from ./models/user_front.js
    User.routes(router, routeValidator, mysql, connection, md5, Promise, passport, request, transporter);
}

module.exports = REST_ROUTER_FRONT;