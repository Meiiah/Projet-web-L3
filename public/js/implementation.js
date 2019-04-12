//fichier json
//window.alert("je suis permier");

var json = "../json/data.json";

//var TEST//
 // var divContainer = document.getElementById("showData");
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
var contenuTopTweet = document.getElementById("contenu");
var jaimeTopTweet = document.getElementById("jaime");
var hlisTweet = document.getElementById("lisTweet");
var htitre = document.getElementById("titreTitre");
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

//Variable du graphique tweet des 7 derniers jours
const retweet = 'rgba(204,31,46,0.8)'
const jaime = 'rgba(127,4,15,0.8)'
var elements = 10

var data1;
var date2;

var max=0;
var maxTweet;
var maxTweetJaime=0;
var maxnbJaime=0;

//Lance ces fonctions au chargement de la page
window.onload = auChargement;

function auChargement(){
  //execution du script avec getHashtag

  initCompteurs();
  tabParJour();
  topTweet();
  listTweet();
  hashtag();
}

//>Fonction en attendnat que get hashtag marche
function hashtag(){
  $.getJSON( json, function( data){
    data = JSON.parse(data);
    htitre.innerHTML =  "#" + data[infoGlob.DEBUTAUTRE][infoTweet.HASHTAG].hashtag[1].text;

  });
}
//Fonction qui récupère le hashtag dans la barre de recherche
function getHashtag(){

  hashtag = document.getElementById("search").value;
  window.alert("j'aime les pommes")

    window.alert("et les wikis")
}

function listTweet(){
  $.getJSON( json, function( data){
    data = JSON.parse(data);
//    window.alert("pouet")
    for (i = infoGlob.DEBUTAUTRE; i < data.length; i++) {
      html = html + "<tr><td>"+ data[i][infoTweet.DATE].date +"</td><td>"+data[i][infoTweet.CONTENU].contenu +"</td></tr>";
    }
  //      window.alert("licorne")
    hlisTweet.innerHTML = html;

  });
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

function topTweet(){
    $.getJSON( json, function( data){
    //  window.alert("licorne")
      data = JSON.parse(data);
      // contenuTopTweet.innerHTML = "Pouet";
      // jaimeTopTweet.innerHTML = " POuet";
      for (i = infoGlob.DEBUTAUTRE; i < data.length; i++) {
        // window.alert(data[1])
        // window.alert("polf")
        maxnbJaime = data[i][infoTweet.NBJAIME].nbJaime;
      //  window.alert(maxnbJaime)
        if (maxTweetJaime < maxnbJaime ){
          maxTweetJaime =  "_ " + maxnbJaime + " j'aime pour _";
          maxTweet = data[i][infoTweet.CONTENU].contenu;

        }
      }
       contenuTopTweet.innerHTML = maxTweet;
       jaimeTopTweet.innerHTML =maxTweetJaime;
      // window.alert("licorne")
    });
}

function tabParJour(){
  tabJaime = [0,0,0,0,0,0,0];
  tabRetweet =  [0,0,0,0,0,0,0];
  //divContainer.innerHTML = "pouet";

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
            tabJaime[jour.JEUDI] = tabJaime[jour.JEUDI] + data[i][infoTweet.NBJAIME].nbJaime;
            tabRetweet[jour.JEUDI] = tabRetweet[jour.JEUDI] + data[i][infoTweet.NBRETWEET].nbRetweet;
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

     data1 = [ tabJaime[jour.LUNDI] , tabJaime[jour.MARDI] , tabJaime[jour.MERCREDI] , tabJaime[jour.JEUDI] , tabJaime[jour.VENDREDI] ,tabJaime[jour.SAMEDI] , tabJaime[jour.DIMANCHE] ];
     data2 = [tabRetweet[jour.LUNDI],tabRetweet[jour.MARDI], tabRetweet[jour.MERCREDI], tabRetweet[jour.JEUDI], tabRetweet[jour.VENDREDI],tabRetweet[jour.SAMEDI],tabRetweet[jour.DIMANCHE]];
     for (i=0 ; i<7 ;i++){
       if (data1[i]>max){
         max = data1[i];
       }
       if (data2[i]>max){
         max = data2[i];
       }
     }

     var ctx = document.getElementById("recent-rep-chart");
     if (ctx) {
       ctx.height = 250;
       var myChart = new Chart(ctx, {
         type: 'line',
         data: {
           labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi','Samedi','Dimanche'],
           datasets: [
             {
               label: 'Nombre de j\'aime',
               backgroundColor: jaime,
               borderColor: 'transparent',
               pointHoverBackgroundColor: '#fff',
               borderWidth: 0,
               data: data1

             },
             {
               label: 'Nombre de retweet',
               backgroundColor: retweet,
               borderColor: 'transparent',
               pointHoverBackgroundColor: '#fff',
               borderWidth: 0,
               data: data2

             }
           ]
         },
         options: {
           maintainAspectRatio: true,
           legend: {
             display: false
           },
           responsive: true,
           scales: {
             xAxes: [{
               gridLines: {
                 drawOnChartArea: true,
                 color: '#f1f1f1'
               },
               ticks: {
                 fontFamily: "Poppins",
                 fontSize: 12
               }
             }],
             yAxes: [{
               ticks: {
                 beginAtZero: true,
                 maxTicksLimit: 5,
                 stepSize: 50,
                 max: max+5,
                 fontFamily: "Poppins",
                 fontSize: 12
               },
               gridLines: {
                 display: true,
                 color: '#f2f2f2'

               }
             }]
           },
           elements: {
             point: {
               radius: 0,
               hitRadius: 10,
               hoverRadius: 4,
               hoverBorderWidth: 3
             }
           }


         }
       });
     }
  });
//window.alert(" pouet")
}




//Fonctions test------------------------------------------------------------------------------
function test(){
  $.getJSON( json, function( data){
    //JSONItems = data;
     data = JSON.parse(data);
    //divContainer.innerHTML= data[infoGlob.NBABONNE].nbAbonne;

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
