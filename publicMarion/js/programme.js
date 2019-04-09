
var Twit = require('../data/node_modules/twit/lib/twitter');

var Bot = module.exports = function(config) {
  this.twit = new Twit(config);
};
