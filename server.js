var express     = require('express'),
    app         = express();

// Css
app.use('/css', express.static(__dirname + '/client/app/css'));

// JS
app.use('/js', express.static(__dirname + '/client/app/js'));

// Images
app.use('/images', express.static(__dirname + '/client/app/images'));

// Fonts
app.use('/fonts', express.static(__dirname + '/client/app/fonts'));

// Font Awesome Icons
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/css'));

// Slick Carousel
app.use('/slick', express.static(__dirname + '/client/app/assets/slick'));

// Dropit
app.use('/dropit', express.static(__dirname + '/client/app/assets/dropit'));

// Browser-Sync
app.use('/browser-sync', express.static(__dirname + '/node_modules/browser-sync/bin'));

// Root Index
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// Test Page
app.get('/demo', function(req, res) {
  res.sendFile(__dirname + '/client/demo.html');
});

// Server
app.listen(3000, function() {
  console.log('Listening on 3000');
});
