
var Spotify = require('node-spotify-api');

var search = process.argv[2];

var spotify = new Spotify({
  id: "5fdf84224878427ca3332d115939fa6d",
  secret: "e21e5bea0950470d960c7225340f9125"
});

spotify.search({ type: 'track', query: search }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  console.log(data);
});