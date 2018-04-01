var express = require('express');
var app = express();

var ig = require('instagram-node').instagram();

// Every call to `ig.use()` overrides the `client_id/client_secret` 
// or `access_token` previously entered if they exist. 
//Get access token from http://instagram.pixelunion.net/
ig.use({ access_token: 'ACCESS_TOKEN' });


// ig.use({
//     client_id: 'YOUR_CLIENT_ID',
//     client_secret: 'YOUR_CLIENT_SECRET'
// });


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// home page route - popular images
app.get('/', function (req, res) {
    // use the instagram package to get popular media
    ig.user_self_media_recent(function (err, medias, pagination, remaining, limit) {
        // render the home page and pass in the popular images
        res.render('pages/index', { grams: medias });
    });
});

app.listen(8080);

console.log('App started! Look at http://localhost:8080');