// window.alert("pouet")
var Twit = require('../data/node_modules/twit/lib/twitter');
//window.alert("pouet")
module.exports = function(config) {
  this.twit = new Twit(config);
};
