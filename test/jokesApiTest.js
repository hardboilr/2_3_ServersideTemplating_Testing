var expect = require('chai').expect;
var request = require('request');
var http = require('http');
var app = require('../app');
var server;
var TEST_PORT = 3456;

before(function (done) {
    // runs before all tests in this block
    server = http.createServer(app);
    server.listen(TEST_PORT, function () {
        done();
    });
});

after(function (done) {
    // runs after all tests in this block
    server.close();
    done();
});

var joke = "Its better to be late than to arrive ugly";

describe('Test of POST', function () {
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/joke",
        method: "POST",
        json: true,
        body: {joke: joke}
    };
    it('should get a json-formatted body-reponse with the created joke', function (done) {
        request(options, function (err, res, body) {
            var addedJoke = body;
            expect(addedJoke.joke).to.be.equal(joke);
            done();
        });
    });
});

describe('Test of persistance', function () {
    var options = {
        url: 'http://localhost:' + TEST_PORT + '/api/jokes',
        method: 'GET',
        json: true
    };
    it('should get a list of all jokes', function (done) {
        request(options, function (err, res, body) {
            var jokesList = body;
            var addedJoke = jokesList[3];
            expect(addedJoke).to.be.equal(joke);
            done();
        });
    });
});


