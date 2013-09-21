
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var about = require('./routes/about');
var user = require('./routes/user');
var contact = require('./routes/contact');
var http = require('http');
var path = require('path');

var article = [{author: "Akul", _id : 1}, {author: "Aashish", _id : 1}];]


var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.compress());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', about.text);
app.get('/about', about.text);
app.get('/contact', contact.text);
app.get('/users', user.list);
app.get('/articles/:id', function(req, res) {
  
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
