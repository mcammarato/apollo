var express     = require('express'),
    path        = require('path'),
    hbs         = require('express-handlebars'),
    app         = express();


/// Express-Handlebars Config ///
////////////////////////////////

app.set('view engine', 'hbs');

app.set('views', 'client/views/partials');

app.engine('hbs', hbs({
        defaultLayout: 'index',
        extname: '.hbs',
        layoutsDir:'client/views/layouts',
        partialsDir: 'client/views/partials'
}));



/// Client Side Assets ///
/////////////////////////


// CSS
app.use('/css', express.static(__dirname + '/client/assets/css'));
// SCSS
app.use('/scss', express.static(__dirname + '/client/assets/scss'));
// LESS
app.use('/less', express.static(__dirname + '/client/assets/less'));
// JS
app.use('/js', express.static(__dirname + '/client/assets/js'));
// Images
app.use('/images', express.static(__dirname + '/client/assets/images'));
// Fonts
app.use('/fonts', express.static(__dirname + '/client/assets/fonts'));


/// Node Moduels ///
///////////////////


// jQuery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
// Foundation CSS
app.use('/css', express.static(__dirname + '/node_modules/foundation-sites/dist/css'));
// Foundation JS
app.use('/js', express.static(__dirname + '/node_modules/foundation-sites/dist/js'));
// Slick Carousel
app.use('/slick', express.static(__dirname + '/node_modules/slick-carousel/slick'));
// Dropit
app.use('/dropit', express.static(__dirname + '/node_modules/jb-dropit'));
// Font Awesome Icons
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/css'));
// Browser-Sync
app.use('/browser-sync', express.static(__dirname + '/node_modules/browser-sync/bin'));


/// Server Routes ///
///////////////////

// Handlebars Rotue
app.get('/', function(req, res) {
  res.render('header');
});

// Index
app.get('/index', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// Componets Page
app.get('/componets', function(req, res) {
  res.sendFile(__dirname + '/client/componets.html');
});

// 404
app.get('/404', function(req, res) {
  res.sendFile(__dirname + '/client/404.html');
});

// Server
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Listening on ' + app.get('port'));
});
