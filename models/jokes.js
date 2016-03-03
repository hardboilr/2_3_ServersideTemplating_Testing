var jokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
]; 

var getRandomJoke = function() {
    // Math.floor: Round a number downward to its nearest integer -> 1.6 becomes 1.
    // Math.random(): Return a random number between 0 (inclusive) and 1 (exclusive): --> 0.8783364845439792
    return jokes[Math.floor(Math.random() * jokes.length)];
};

var addJoke = function(joke) {
    jokes.push(joke);
};

module.exports = { 
  allJokes : jokes, 
  getRandomJoke : getRandomJoke, 
  addJoke : addJoke 
} ;