////Requiring .env file which contains client id and secret
require("dotenv").config();


//////Requiring keys.js file for clientID and client Secret
const keys = require("./keys.js")

//////Requiring liri to contact Spotify
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
 
//////Required for OMDB
var axios = require('axios');

/////Required for writing to .txt files
var fs = require('fs')

///Take in commands from the console
var input = process.argv[2];
var search = process.argv[3];

////Creating input(s) to be referenced from user input throughthe command line
if (input === "spotify-this-song"){
    console.log("spotify this song")
    spotifyThis(search)
} else if (input === "movie-this") {
     console.log("movie this")
     movieThis(search)
} else if (input === "do-what-it-says"){
    console.log("doing what it says")
    doThis(search)
} else {
    console.log("Term Not Found")
}


function spotifyThis(search){
////Searching through spotify API to return the first 5 results
    spotify.search({ type: 'track', query: search, limit: 5 }, function(err, data) {
    if (err) {
    ////Error Validation
        return console.log('Error occurred: ' + err);
    } 
        /////Logging first five results to the console
        for(var i = 0; i < 5; i++){
            console.log(`-----------------------------------------\nArtist: ${data.tracks.items[i].artists[0].name} \nSong Title: ${data.tracks.items[i].name}\nAlbum Title: ${data.tracks.items[i].album.name}\nPreview Link: ${data.tracks.items[i].preview_url}`); 
            }
        });
}

/////Searching through OMDB to return movie information results
function movieThis(search){
    axios.get("https://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
        .then(function(response) {
            console.log(
                `--------------------------------------------------------------------
Movie Title: ${response.data.Title}
Year of Release: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Language: ${response.data.Language}
Cast: ${response.data.Actors}
Plot: ${response.data.Plot}`
            );
                    
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function doThis(search){
    fs.readFile('random.txt', "utf8", function(error, data){
        if (error) {
            console.log(error)
        }  var dataArr = data.split(',');
        spotifyThis(dataArr[1]);
    })
}