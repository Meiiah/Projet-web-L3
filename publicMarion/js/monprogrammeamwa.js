
var Bot = require('../js/programme');
var config1 = require('../data/node_modules/twit/config1');
var bot = new Bot(config1);
var jsonfile = require('jsonfile');

// window.alert("pouet");

//Notre identifiant tweeter
var notreId = '1105484789044465665'

//Tableau pour ranger nos données dans le json
var data = [];
var boite =[];

//Fonction de connection
//Variable de configuration pour la connection à L'API


//Fonction qui renvoit la date d'aujourd'hui moins 6 jours
function datestring () {
  var d = new Date(Date.now() - 6*24*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

 function requete(){


  //Parametres de la requete
  var params = {
      q: '#Barboteur'
    , since: datestring()
    , result_type: 'mixed'
  };

  //Requete pour de nombre d'abonnés
  bot.twit.get('followers/ids', params, function (err, reply) {
    data.push({'nbAbonne': reply.ids.length.toString()})
  });

  //Requete de recherche de toutes les infos par rapport aux tweets
  bot.twit.get('search/tweets', params, function (err, reply) {
    // console.log(reply)

    if(err) return handleError(err)
    data.push({'nbTweet' : reply.statuses[0].user.statuses_count});
     for (var i = 0; i < reply.statuses.length; i++) {

       // console.log("Localisation:")
       // console.log(reply.statuses[i].user.location);
       boite.push({'localisation': reply.statuses[i].user.location});
       // console.log("Text du tweet:")
       // console.log(reply.statuses[i].text);
        boite.push({'contenu': reply.statuses[i].text});
       // console.log("Hashtag:")
       // console.log(reply.statuses[i].entities.hashtags);
       boite.push({'hashtag': reply.statuses[i].entities.hashtags});
       // console.log("User retweet:")
       // console.log(reply.statuses[i].entities.user_mentions);
       // console.log("fin user")
       // console.log("Id du createur du tweet:")
       // console.log(reply.statuses[i].user.id_str);
       // console.log("Color:")
       // console.log(reply.statuses[i].user.profile_sidebar_border_color);
       // console.log(reply.statuses[i].user.profile_background_color);
       // console.log(reply.statuses[i].user.profile_sidebar_fill_color);
       // console.log("nb Jaime:")
       // console.log(reply.statuses[i].favorite_count);
       boite.push({'nbJaime': reply.statuses[i].favorite_count});
  //     console.log("nb retweet;");
       boite.push({'nbRetweet': reply.statuses[i].retweet_count});
    //   console.log(reply.statuses[i].retweet_count);
  ///     console.log("nb de tweeet que tu as fais:")
    //   console.log(reply.statuses[i].user.statuses_count);

  //     console.log("date");
       console.log(reply.statuses[i].created_at);
       boite.push({'date': reply.statuses[i].created_at});
       console.log(reply.statuses[i].extended_tweet);

    //  console.log(reply.statuses[i].quote_count);
    //retweet cité
  //  console.log(reply.statuses[i].quoted_status);
      data.push(boite);
      boite=[];
      }
   jsonfile.writeFile('../json/data.json',JSON.stringify(data),'utf8', err);
  });
};

console.log(requete());

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}
