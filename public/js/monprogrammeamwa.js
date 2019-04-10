
console.log('Mon super programme : Runneuuh.');

var Bot = require('./programme')
var config1 = require('../data/node_modules/twit/config1');
var bot = new Bot(config1);
var jsonfile = require('jsonfile')
var notreId = '1105484789044465665'
var index=0;

var data = [];
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

  bot.twit.get('followers/ids', params, function (err, reply) {
  //  console.log('\n# followers:' + reply.ids.length.toString()  );
  });

  bot.twit.get('search/tweets', params, function (err, reply) {

    if(err) return handleError(err)
    //
     for (var i = 0; i < reply.statuses.length; i++) {
       console.log("Localisation:")
       console.log(reply.statuses[i].user.location);
       data.push({'localisation': reply.statuses[i].user.location});
       console.log("Text du tweet:")
       console.log(reply.statuses[i].text);
        data.push({'contenu': reply.statuses[i].text});
       console.log("Hashtag:")
       console.log(reply.statuses[i].entities.hashtags);
       data.push({'hashtag': reply.statuses[i].entities.hashtags});
       console.log("User retweet:")
       console.log(reply.statuses[i].entities.user_mentions);
       console.log("fin user")
       console.log("Id du createur du tweet:")
       console.log(reply.statuses[i].user.id_str);
       console.log("Color:")
       console.log(reply.statuses[i].user.profile_sidebar_border_color);
       console.log(reply.statuses[i].user.profile_background_color);
       console.log(reply.statuses[i].user.profile_sidebar_fill_color);
       console.log("nb Jaime:")
       console.log(reply.statuses[i].favorite_count);
       var like = reply.statuses[i].favorite_count;
       console.log("nb retweet:");
       console.log(reply.statuses[i].retweet_count);
       var rt = reply.statuses[i].retweet_count;
       console.log("nb de tweeet que tu as fais:")

       console.log(reply.statuses[i].user.statuses_count);
       console.log("date");
       console.log(reply.statuses[i].created_at);
      console.log(reply.statuses[i].quote_count);

    //  for (var name in goals) {
    //  if (goals.hasOwnProperty(name)) {

      //  }
    //  }

}


   //console.log(reply);


   jsonfile.writeFile('../json/data.json',JSON.stringify(data),'utf8', err);


  });
  //var rand = Math.random();
  index=index+1;
};

console.log(requete())

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}


var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
map.setView({
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    center: new Microsoft.Maps.Location(35.027222, -111.0225),
    zoom: 15
});
