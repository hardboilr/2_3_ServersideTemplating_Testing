var express = require('express');
var router = express.Router();
var jokes = require('../models/jokes.js');

router.all('/', function (req, res, next) {
    // all requests
});

router.get('/joke/random', function (req, res, next) {
    res.json({joke: jokes.getRandomJoke()});
});

router.get('/jokes', function (req, res, next) {
    res.json(jokes.allJokes);
});

router.post('/joke', function (req, res, next) {
    jokes.addJoke(req.body.joke);
    res.json({joke: req.body.joke});
});

module.exports = router;




