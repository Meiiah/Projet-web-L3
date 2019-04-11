//fichier json
window.alert("je suis permier");
var json = "../json/data.json";
//var TEST//
 var divContainer = document.getElementById("showData");
// var caca = document.getElementById("caca");
//var divers
var i=0;
var html ="";
var nbJaime = 0;
var nbRetweet = 0;
var nbTweet = 0;

//variable d'emplacement dans le html
var hnbAbo = document.getElementById("nbAbonne");
var hnbJaime = document.getElementById("nbJaime");
var hnbRetweet = document.getElementById("nbRetweet");
var hnbTweet = document.getElementById("nbTweet");
//Contient le hashtag demandé
var hashtag;
//Enumérations pour comprendre le json
const infoTweet = {
  LOCALISATION: 0,
  CONTENU: 1,
  HASHTAG: 2,
  NBJAIME: 3,
  NBRETWEET: 4,
  DATE : 5,

};
Object.freeze(infoTweet);
//Enum information globale
const infoGlob = {
  NBABONNE : 0,
  NBTWEET : 1,
  DEBUTAUTRE : 2
};
Object.freeze(infoGlob);

//variable de tableau pour stoquer les jaime et retweet par jour
var tabJaime;
var tabRetweet;

const jour = {
  LUNDI : 0,
  MARDI : 1,
  MERCREDI : 2,
  JEUDI : 3,
  VENDREDI : 4,
  SAMEDI : 5,
  DIMANCHE :6
}
Object.freeze(jour);
var day;

//Lance ces fonctions au chargement de la page
window.onload = auChargement;

function auChargement(){
  //execution du script avec getHashtag
  initCompteurs();
}

//Fonction qui récupère le hashtag dans la barre de recherche
function getHashtag(){
  hashtag = document.getElementById("search").value;
}

//Remplit les 4 compteurs : Jaime, commentaires, Retweet, Abonnes
function initCompteurs() {
  $.getJSON( json, function( data){
    data = JSON.parse(data);
    hnbAbo.innerHTML= data[infoGlob.NBABONNE].nbAbonne;
    hnbTweet.innerHTML= data[1].nbTweet;
    for (i = infoGlob.DEBUTAUTRE; i < data.length; i++) {
      nbJaime = nbJaime + data[i][infoTweet.NBJAIME].nbJaime;
      nbRetweet = nbRetweet + data[i][infoTweet.NBRETWEET].nbRetweet;
    }
    hnbJaime.innerHTML= nbJaime;
    hnbRetweet.innerHTML= nbRetweet;
  });
}

function tabParJour(retour){
  tabJaime = [0,0,0,0,0,0,0];
  tabRetweet =  [0,0,0,0,0,0,0];
  divContainer.innerHTML = "pouet";
  $.getJSON( json, function( data){
     data = JSON.parse(data);

     for (i = infoGlob.DEBUTAUTRE; i < data.length; i++) {
        day = data[i][infoTweet.DATE].date;
        if (day.substring(0,3)=='Mon'){
            tabJaime[jour.LUNDI] = tabJaime[jour.LUNDI] + data[i][infoTweet.NBJAIME].nbJaime;
            tabRetweet[jour.LUNDI] = tabRetweet[jour.LUNDI] + data[i][infoTweet.NBRETWEET].nbRetweet;
        }
        if (day.substring(0,3)=='Tue'){
            tabJaime[jour.MARDI] = tabJaime[jour.MARDI] + data[i][infoTweet.NBJAIME].nbJaime;
            tabRetweet[jour.MARDI] = tabRetweet[jour.MARDI] + data[i][infoTweet.NBRETWEET].nbRetweet;
        }
        if (day.substring(0,3)=='Wed'){
            tabJaime[jour.MERCREDI] = tabJaime[jour.MERCREDI] + data[i][infoTweet.NBJAIME].nbJaime;
            tabRetweet[jour.MERCREDI] = tabRetweet[jour.MERCREDI] + data[i][infoTweet.NBRETWEET].nbRetweet;
        }
        if (day.substring(0,3)=='Thu'){
            tabJaime[jour.JEUDI] = tabJaime[jour.JEUDI] + data[i][infoTweet.JEUDI].nbJaime;
            tabRetweet[jour.JEUDI] = tabRetweet[jour.JEUDI] + data[i][infoTweet.JEUDI].nbRetweet;
        }
        if (day.substring(0,3)=='Fri'){
            tabJaime[jour.VENDREDI] = tabJaime[jour.VENDREDI] + data[i][infoTweet.NBJAIME].nbJaime;
            tabRetweet[jour.VENDREDI] = tabRetweet[jour.VENDREDI] + data[i][infoTweet.NBRETWEET].nbRetweet;
        }
        if (day.substring(0,3)=='Sat'){
            tabJaime[jour.SAMEDI] = tabJaime[jour.SAMEDI] + data[i][infoTweet.NBJAIME].nbJaime;
            tabRetweet[jour.SAMEDI] = tabRetweet[jour.SAMEDI] + data[i][infoTweet.NBRETWEET].nbRetweet;
        }
        if (day.substring(0,3)=='Sun'){
            tabJaime[jour.DIMANCHE] = tabJaime[jour.DIMANCHE] + data[i][infoTweet.NBJAIME].nbJaime;
            tabRetweet[jour.DIMANCHE] = tabRetweet[jour.DIMANCHE] + data[i][infoTweet.NBRETWEET].nbRetweet;
        }
     }
     if (retour == "jaime"){
       window.alert("je retourne j'aime")
       return tabJaime;
     }
     if (retour == "retweet"){
       return tabRetweet;
     }

  });
}




//Fonctions test------------------------------------------------------------------------------
function test(){
  $.getJSON( json, function( data){
    //JSONItems = data;
     data = JSON.parse(data);
    divContainer.innerHTML= data[infoGlob.NBABONNE].nbAbonne;

  //  divContainer.innerHTML = "Pouet";
    // divContainer.innerHTML= data[0].contenu;

  });
}


function CreateTableFromJSON(){
  $.getJSON( json, function( data){
    //JSONItems = data;
    divContainer.innerHTML= data;
    data = JSON.parse(data);
    divContainer.innerHTML = "Pouet";


  for (i = 0; i < data.length; i++) {
      html = html + "<p>" + data[i]+"</p>";
  }
  divContainer.innerHTML= html
  });
}
