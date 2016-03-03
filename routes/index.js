var express = require('express');
var router = express.Router();
var jokes = require('../models/jokes.js');

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/', function (req, res, next) {
    var session = req.session;
    res.render('index', {title: 'Express', user: session.userName});
});

router.get('/joke', function (req, res, next) {
    var session = req.session;
    incrementCounter(req);
    res.render('randomJoke', {joke: jokes.getRandomJoke() + ''});
});

router.get('/jokes', function (req, res, next) {
    incrementCounter(req);
    res.render('allJokes', {jokes: jokes.allJokes});
});

router.get('/add', function (req, res, next) {
    incrementCounter(req);
    res.render('addJoke');
});

router.post('/storeJoke', function (req, res, next) {
    incrementCounter(req);
    jokes.addJoke(req.body.joke);
    res.redirect('/add');
});

var incrementCounter = function (req) {
    var session = req.session;
    if (session.counter) {
        session.counter++;
    } else {
        req.session.counter = 1;
    }
};

module.exports = router;
