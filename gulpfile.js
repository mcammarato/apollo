var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    less        = require('gulp-less'),
    path        = require('path'),
    server      = require('gulp-develop-server'),
    bs          = require('browser-sync'),
    saveFile    = require('gulp-savefile'),
    cleanCSS    = require('gulp-clean-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    sourceMaps  = require('gulp-sourcemaps'),
    rename      = require('gulp-rename');


// Compile SCSS to CSS
gulp.task('scss', function () {
  return gulp.src('client/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/assets/css'));
});

// Compile LESS to CSS
gulp.task('less', function() {
  return gulp.src('client/assets/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('client/assets/css'));
});


// Minify CSS
gulp.task('minify-css', function(){
  return gulp.src('client/assets/css/**/*.css')
    .pipe(sourceMaps.init())
    .pipe(cleanCSS())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('client/dist'))
    .pipe(rename('bundle.min.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('client/dist'));
});

// Uglify JS
gulp.task('uglify-js', [], function() {
  gulp.src("client/assets/js/**/*.js")
      .pipe(sourceMaps.init({loadMaps: true}))
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('client/dist'))
      .pipe(rename('bundle.min.js'))
      .pipe(uglify())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('client/dist'));
});

// Browser Sync Init Options
var options = {
    server: {
        path: 'server.js',
        execArgv: [ '--harmony' ]
    },
    bs: {
        proxy: 'http://localhost:3000',
        port: '6300',
        notify: false,
        injectChanges: true,
        reloadOnRestart: true
    }
};

// Browser sync
gulp.task('browser-sync', function() {
      bs.init({
    });
});

// Server start
gulp.task('server:start', function() {
    server.listen( options.server, function( error ) {
        if (!error) bs(options.bs);
    });
});

// Server restart
gulp.task('server:restart', function() {
    server.restart( function( error ) {
        if(!error) bs.reload();
    });
});



// Watch Task
gulp.task('watch', ['server:start'], function () {
    gulp.watch('client/assets/scss/**/*.scss',['scss']);
    gulp.watch('client/assets/less/**/*.less',['less']);
    gulp.watch('client/assets/js/**/*.js', ['uglify-js']);
    gulp.watch('client/assets/css/**/*.css',['minify-css']);
    gulp.watch('client/assets/bootstrap/less/**/*.less').on('change', function(){
      return gulp.src('client/assets/less/bootstrap-custom.less').pipe(saveFile());
    });
    gulp.watch('client/**/*.html').on('change', bs.reload);
    gulp.watch('client/assets/css/**/*.css').on('change', bs.reload);
    gulp.watch('client/assets/less/**/*.less').on('change', bs.reload);
    gulp.watch('client/assets/scss/**/*.scss').on('change', bs.reload);
    gulp.watch('client/dist/**/*.css').on('change', bs.reload);
    gulp.watch('client/dist/**/*.js').on('change', bs.reload);
    gulp.watch('client/views/**/*.hbs').on('change', bs.reload);
    gulp.watch('client/views/layouts/**/*.hbs').on('change', bs.reload);
    gulp.watch('client/views/partials/**/*.hbs').on('change', bs.reload);
});
