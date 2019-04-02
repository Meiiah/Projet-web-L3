
var Twit = require('../data/node_modules/twit/lib/twitter');
var config1 = require('../data/node_modules/twit/config1');
var programme = module.exports = function(config1) {
  this.twit = new Twit(config1);

};
console.log('Mon super programme : Runneuuh.');

function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

setInterval( function () {
  var params = {
      q: 'github.com/'
    , since: datestring()
    , result_type: 'mixed'
  };
  this.twit.get('search/tweets', params, function (err, reply) {

    if(err) return handleError(err)
    //console.log('\n# followers:' + reply.ids.length.toString());
    console.log(reply);

  });
}, 1000);

  function handleError(err) {
    console.error('response status:', err.statusCode);
    console.error('data:', err.data);
  };
