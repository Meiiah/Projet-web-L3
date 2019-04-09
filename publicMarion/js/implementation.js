//fichier json
var json = "../json/data.json";
//var TEST//
// var divContainer = document.getElementById("showData");
// var caca = document.getElementById("caca");
//var divers
var i=0;
var html ="";
var nbJaime = 0;
var nbRetweet = 0;
//variable d'emplacement dans le html
var hnbAbo = document.getElementById("nbAbonne");
var hnbJaime = document.getElementById("nbJaime");
var hnbRetweet = document.getElementById("nbRetweet");
//Contient le hashtag demandé
var hashtag;
//Enumérations pour comprendre le json
const infoTweet = {
  LOCALISATION: 0,
  CONTENU: 1,
  HASHTAG: 2,
  NBJAIME: 3,
  NBRETWEET: 4
};
Object.freeze(infoTweet);
//Enum information globale
const infoGlob = {
  NBABONNE : 0
};
Object.freeze(infoGlob);

//Lance ces fonctions au chargement de la page
window.onload = auChargement;

function auChargement(){
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
    for (i = 1; i < data.length; i++) {
      nbJaime = nbJaime + data[i][infoTweet.NBJAIME].nbJaime;
      nbRetweet = nbRetweet + data[i][infoTweet.NBRETWEET].nbRetweet;
    }
    hnbJaime.innerHTML= nbJaime;
    hnbRetweet.innerHTML= nbRetweet;
  });
}



//Fonctions test------------------------------------------------------------------------------
function test(){
  $.getJSON( json, function( data){
    //JSONItems = data;
     data = JSON.parse(data);
    divContainer.innerHTML= data[NBABONNE].nbAbonne;

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


  for (i = 1; i < data.length; i++) {
      html = html + "<p>" + data[i]+"</p>";
  }
  divContainer.innerHTML= html
  });
}
