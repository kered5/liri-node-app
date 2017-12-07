//Declare variables and requires

var spotifyKeys=require("./spotifyKeys.js");
var twitterKeys=require("./keys.js")
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter=require("twitter");
var fs= require("fs");
// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the name of the "thing"

var thingName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of " "s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    thingName = thingName + " " + nodeArgs[i];
  }
  else {
    thingName += nodeArgs[i];
  }
}

  // Possible commands for this liri app from the 3rd item in the passed in elements
  switch(nodeArgs[2]) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;

  };

//Function to access the OMDB
function movieThis(){

//Use Mr Nobody if no movie passed in
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


//Fucntion to access spotify
function spotifyThisSong(){

//Use the Sign as the song name if no song passed on the command line
  if(!thingName){
      thingName = "The Sign";
    }
 
 //Pull in the spotify keys
var client = new Spotify(spotifyKeys);

//Search spotify for the song 
client.search({ type: 'track', query: thingName }, function(err, data) {
  if (err) {

    return console.log('Error occurred: ' + err);
  }
 
//Display the data for the first match
var songInfo = data.tracks.items;

          if (songInfo[0] != undefined) {

            console.log("Artist: " + songInfo[0].artists[0].name);
            console.log("Song: " + songInfo[0].name);
            console.log("Album the song is from: " + songInfo[0].album.name);
            console.log("Preview Url: " + songInfo[0].preview_url);
          }


});
}

//Function to access twitter
function myTweets(){
 
var client = new Twitter(twitterKeys);

//If no twitter name passed in use my fictional Spinal Tap bassist user name
var twitterUsername = process.argv[3];
    if(!twitterUsername){
      twitterUsername = "512DerekSmalls";
    }

    //Access the last 20 tweets from the username
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
//Function to read the random.txt file and spotify the song
function doWhatItSays(){
 //Read file and store tje output in data
fs.readFile("random.txt", "utf8", function(error, data){
      if (!error) {
        //Make thingName the output of the file read and call the spotify function
        var thingName = data.split(",");
        spotifyThisSong();

      } 
    });


}







