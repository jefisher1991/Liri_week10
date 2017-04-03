var spotify = require('spotify');
var request = require('request'); 
var nodeArgs = process.argv;
var songRequest;
var movieRequest; 



if (nodeArgs[2] === "spotify-this-song") {
	if (nodeArgs[3]) {
	songRequest = nodeArgs[3]; 
	} else {
		// "the sign" by ace of base didn't seem to work, but the app function when another song is chosen. 
		songRequest = "started from the bottom"; 
	}
// calling the spotify request
	spotifySong(songRequest);


// calling the movie request
} else if (nodeArgs[2] === "movie-this") {
	movieRequest = 'http://www.omdbapi.com/?t=' + nodeArgs[3]; 
	findMovie(movieRequest);
}
// if the user enters in something incorrectly
else {
	console.log ("ERROR 404: Please enter the right command (spotify-this-song or movie-this)\n" + 
		"All movies and songs must be entered in quotes!!"); 
}


// spotify function
function spotifySong(songFeed) {
	spotify.search({ type: 'track', query: songFeed }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    // artist
	    data.tracks.items[0].artists.forEach(function(artist) {
	    	console.log("The artist's name is: " + artist.name);  
	    });

	    // albumName
	    var albumName = data.tracks.items[0].album.name; 
	    console.log ("The album's name is: " + albumName); 

	    // songName
	    var songName = data.tracks.items[0].name;
	    console.log("The song's name is: " + songName);

	    // preview Link
	    var previewUrl = data.tracks.items[0].preview_url; 
	    console.log("Preview this song here: " + previewUrl);
	 
	    // Do something with 'data' 
		// data.tracks.items.forEach(function(song) {
		// 	console.log(song);
		// 	return;
	 //    }); 
	}); 
}
// Movie function
function findMovie(movieLink){
	request(movieLink, function (error, response, body) {
	  var movieObject = JSON.parse(body);
	  console.log (
	  	"The movie title is: " + movieObject.Title + "\n" + 
	  	"The movie was released in: " + movieObject.Year + "\n" +
	  	"The movie was rated " + movieObject.imdbRating + " on IMDB" + "\n" +
	  	"The movie was released in " + movieObject.Country + "\n" +
	  	"The movie was released in the " +movieObject.Language + " language" + "\n" +
	  	"The plot of the movie is: " +movieObject.Plot + "\n" +
	  	movieObject.Actors + " are the stars of the movie" + "\n" +
	  	"The movie was rated " + movieObject.Ratings[1].Value + "by Rotten Tomatoes" + "\n" +
	  	"Here is a link to the movie's website: " + movieObject.Website); 

	}); 
}

