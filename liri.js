require("dotenv").config();

const keys = require("./keys.js")

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);
 


var input = process.argv[2];
var search = process.argv[3];

if (input === "spotify-this-song"){
    console.log("spotify this song")
} else if (input === "movie-this") {
     console.log("movie this")
} else if (input === "do-what-it-says"){
    console.log("doing what it says")
} else {
    console.log("Term Not Found")
}




spotify.search({ type: 'track', query: search, limit: 5 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } 
 for(var i = 0; i < 5; i++){
    console.log(`-----------------------------------------\nArtist: ${data.tracks.items[i].artists[0].name} \nSong Title: ${data.tracks.items[i].name}\nAlbum Title: ${data.tracks.items[i].album.name}\nPreview Link: ${data.tracks.items[i].preview_url}`); 
 }

// Artist(s)


// The song's name


// A preview link of the song from Spotify


// The album that the song is from

});