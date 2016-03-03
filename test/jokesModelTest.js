var jokes = require('../models/jokes');
var expect = require('chai').expect;

describe('jokesTest', function () {
    describe('tests the functions of the jokes model', function () {
        it('should add joke to the internal array', function () {
            expect(jokes.allJokes.length).to.be.equal(4);
            jokes.addJoke("adding test joke");
            expect(jokes.allJokes.length).to.be.equal(5);
        });
    });
});

