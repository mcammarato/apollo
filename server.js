var express     = require('express'),
    path        = require('path'),
    hbs         = require('express-handlebars'),
    app         = express();

process.env.NODE_ENV = 'production';


/// Express-Handlebars Config ///
////////////////////////////////

app.set('views', 'client/views/');

app.engine('hbs', hbs({
        defaultLayout: 'home-layout',
        extname: '.hbs',
        layoutsDir:'client/views/layouts',
        partialsDir: 'client/views/partials'
}));

app.set('view engine', 'hbs');


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
// Bootstrap less
app.use('/bootstrap', express.static(__dirname + '/client/assets/bootstrap/less'));

//jQuery
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));
// Bootstrap less
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/less'));
// Bootstrap JS
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist/js'));
// Foundation CSS
app.use('/foundation', express.static(__dirname + '/bower_components/foundation-sites/dist/css'));
// Foundation JS
app.use('/foundation', express.static(__dirname + '/bower_components/foundation-sites/dist/js'));
// Slick Carousel
app.use('/slick', express.static(__dirname + '/bower_components/slick-carousel/slick'));
// Font Awesome
app.use('/font-awesome', express.static(__dirname + '/bower_components/font-awesome/css'));


/// Server Side Assets ///
//////////////////////////

// Browser-Sync
app.use('/browser-sync', express.static(__dirname + '/node_modules/browser-sync/bin'));


/// Server Routes ///
///////////////////

// Handlebars Rotues
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/interior', function(req, res) {
  res.render('interior', {layout: 'interior-layout.hbs'});
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
