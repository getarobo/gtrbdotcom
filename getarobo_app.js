var express = require("express");
var path = require("path");

// express
var app = express();
var port = 3001;

// view egeine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade')
app.use( express.static(path.join(__dirname, 'public')));

//var indexPage = require('./routes/index');
//app.use("/", indexPage);

var serveStatic = require('serve-static');

//app.use("/", serveStatic( path.join(__dirname, 'palmtree')));
app.use("/", serveStatic( path.join(__dirname, 'webgl_canvas')));
//app.use("/canvas", serveStatic( path.join(__dirname, 'elemij_canvas')));



app.listen(port);
