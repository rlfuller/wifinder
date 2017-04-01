var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require("./app_api/models/db");

var uglifyJs = require("uglify-js");
var fs = require("fs");

//rlf - var routes = require('./app_server/routes/index');

//var users = require('./app_server/routes/users');
var routesAPI = require("./app_api/routes/index");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

//minify files
// var appClientFiles = [
//   "app_client/app.js",
//   "app_client/home/home.controller.js",
//   "app_client/about/about.controller.js",
// //  "app_client/locationDetail/locationDetail.controller.js",
//   "app_client/common/services/geolocation.service.js",
//   "app_client/common/services/wifinderData.service.js",
//   "app_client/common/filters/formatDistance.filter.js",
//   "app_client/common/filters/addHtmlLineBreaks.filter.js",
//   "app_client/common/directives/ratingStars/ratingStars.directive.js",
//   "app_client/common/directives/footerGeneric/footerGeneric.directive.js",
//   "app_client/common/directives/navigation/navigation.directive.js",
//   "app_client/common/directives/pageHeader/pageHeader.directive.js"
// ];
//
// var uglified = uglifyJs.minify(appClientFiles, {compress: false});
// fs.writeFile("public/angular/wifinder.min.js", uglified.code, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Script generated and saved: wifinder.min.js");
//   }
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// rlf - app.use('/', routes);
app.use("/api", routesAPI);
app.use(function(req, res){
 res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
 //res.statusCode=404;
 //res.send();
});
//app.use('/users', users);

module.exports = app;
