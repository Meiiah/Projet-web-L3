//fichier json
var json = "../json/data.json";
var ville = [];

// window.alert("Bonjur je macrhce")



function loadMapScenario() {

    var searchManager;
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});

		// function localisation(){
			// window.alert("licorne")
			$.getJSON( json, function( data){
					// window.alert("jerentre")
		    data = JSON.parse(data);
		    for (i = infoGlob.DEBUTAUTRE; i < data.length; i++) {
		      ville[i] =  data[i][infoTweet.LOCALISATION].localisation;
					 // window.alert(ville[i])
		    }

		// }
		// window.alert(ville[0])
    //tableau des localisations des tweets
    for (i = 0; i < ville.length; i++) {
      search(map, ville[i]);
  	}


    function search(map, query) {
    //Create an instance of the search manager and perform the search.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            geocodeQuery(map, query);
        });
    }
    function geocodeQuery(map, query) {
        var searchRequest = {
            where: query,
            callback: function (r) {
                if (r && r.results && r.results.length > 0) {
                    var pin, pins = [], locs = [], output = 'Results:<br/>';
                    //Create a pushpin for each result.
                        pin = new Microsoft.Maps.Pushpin(r.results[0].location);
                        pins.push(pin);
                        locs.push(r.results[0].location);
                    //Add the pins to the map
                    map.entities.push(pins);
                    //Display list of results
                    document.getElementById('printoutPanel').innerHTML = output;

                    map.setView({
                    	center: new Microsoft.Maps.Location(46.1309429,-2.446981),
                    	zoom: 5 });
                }
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                document.getElementById('printoutPanel').innerHTML = 'No results found.';
            }
        };
        //Make the geocode request.
        searchManager.geocode(searchRequest);
    }
  	map.setView({
        center: new Microsoft.Maps.Location(46.1309429,-2.446981),
        zoom: 5 });
});
}
