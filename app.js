var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret: 'secret_3162735', saveUninitialized: true, resave: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//activated for all requests to the server
app.use(function (req, res, next) {
    if (req.url.substring(0, 5) === '/api/') {
        return next();
    }
    var session = req.session;
    if (session.userName) {
        return next();
    } else {
        if (req.body.userName) {
            session.userName = req.body.userName;
            req.url = ('/');
            return res.redirect('/');
        } else {
            req.url = '/login';
            return next();
        }
    }
});

// routes
app.use(require('./routes/index'));
app.use('/api', require('./routes/joke'));

var request = require("request");

// --- testing post ---
//var options = {
//    url: "http://localhost:3000/api/joke",
//    method: "POST",
//    json: true,
//    body: {joke: "I'm a joke"}
//};
//request(options, function (error, res, body) {
//    console.log(body.joke); //Assume the service returns the new Joke 
//});
// -------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
