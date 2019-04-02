
console.log('Mon super programme : Runneuuh.');

var Bot = require('./programme')
var config1 = require('../data/node_modules/twit/config1');
var bot = new Bot(config1);
var jsonfile = require('jsonfile')
var notreId = '1105484789044465665'
var index=0;
//get date string for today's date (e.g. '2011-01-01')
function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

 function requete(){
  var params = {
      q: '#Barboteur'
    , since: datestring()
    , result_type: 'mixed'
  };

  bot.twit.get('friends/ids', params, function (err, reply) {

    if(err) return handleError(err)
    //console.log('\n# followers:' + reply.ids.length.toString());

   //  for (var i = 0; i < reply.statuses.length; i++) {
  //  console.log(reply.statuses[i].id);
    //}


    console.log(reply);

  //  if reply_id == nous {
      //  jsonfile.writeFile('../json/data.json',JSON.stringify(reply),'utf8', err)
  //  }

  });
  //var rand = Math.random();
  index=index+1;
};

console.log(requete())

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}
