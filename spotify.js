var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 'a5d252a3b8894255bc50558d71b8c75b',
  secret: '82d0caf966ee45b3a91f90000ad252e1'
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});