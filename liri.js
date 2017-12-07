

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)\
var spotifyKeys=require("./spotifyKeys.js");
var twitterKeys=require("./keys.js")
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter=require("twitter");
var fs= require("fs");
// Store all of the arguments in an array
var nodeArgs = process.argv;




// Create an empty variable for holding the movie name

var thingName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    thingName = thingName + " " + nodeArgs[i];

  }

  else {

    thingName += nodeArgs[i];

  }
}

if (nodeArgs[2]=="movie-this"){

if(!thingName){
      thingName = "mr nobody";
    }
// Then run a request to the OMDB API with the movie specified
var queryName = "http://www.omdbapi.com/?t=" + thingName + "&y=&plot=short&apikey=trilogy";

request(queryName, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover the required elements

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
}



if (nodeArgs[2]=="spotify-this-song"){

  if(!thingName){
      thingName = "The Sign";
    }
 
var client = new Spotify(spotifyKeys);
 
client.search({ type: 'track', query: thingName }, function(err, data) {
  if (err) {

    return console.log('Error occurred: ' + err);
  }
 



var songInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
          if (songInfo[i] != undefined) {
            var spotifyResults =
            "Artist: " + songInfo[i].artists[0].name + "\r\n" +
            "Song: " + songInfo[i].name + "\r\n" +
            "Album the song is from: " + songInfo[i].album.name + "\r\n" +
            "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
            "------------------------------ " + i + " ------------------------------" + "\r\n";
            console.log(spotifyResults);

          }
        }

});
}

if (nodeArgs[2]=="my-tweets"){
 
var client = new Twitter(twitterKeys);


var twitterUsername = process.argv[3];
    if(!twitterUsername){
      twitterUsername = "512DerekSmalls";
    }
    params = {screen_name: twitterUsername};
    client.get("statuses/user_timeline/", params, function(error, data, response){
      if (!error) {
        for(var i = 0; i < data.length; i++) {
          //console.log(response); // Show the full response in the terminal
          var twitterResults = 
          "@" + data[i].user.screen_name + ": " + 
          data[i].text + "\r\n" + 
          data[i].created_at + "\r\n" + 
          "------------------------------ " + i + " ------------------------------" + "\r\n";
          console.log(twitterResults);

        }
      }  else {
        console.log("Error :"+ error);
        return;
      }
    });
 

}

if (nodeArgs[2]=="do-what-it-says"){
 
fs.readFile("random.txt", "utf8", function(error, data){
      if (!error) {
        var doWhatItSaysResults = data.split(",");
var client = new Spotify(spotifyKeys);
 
client.search({ type: 'track', query: doWhatItSaysResults }, function(err, data) {
  if (err) {

    return console.log('Error occurred: ' + err);
  }
 

var songInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
          if (songInfo[i] != undefined) {
            var spotifyResults =
            "Artist: " + songInfo[i].artists[0].name + "\r\n" +
            "Song: " + songInfo[i].name + "\r\n" +
            "Album the song is from: " + songInfo[i].album.name + "\r\n" +
            "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
            "------------------------------ " + i + " ------------------------------" + "\r\n";
            console.log(spotifyResults);

          }
        }

});


      } 
    });


}







