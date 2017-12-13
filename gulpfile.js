var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    less        = require('gulp-less'),
    path        = require('path'),
    server      = require('gulp-develop-server'),
    bs          = require('browser-sync'),
    saveFile    = require('gulp-savefile')
    rename      = require('gulp-rename');


// Compile SCSS to CSS
gulp.task('styles', function () {
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
    gulp.watch('client/assets/scss/**/*.scss',['styles']);
    gulp.watch('client/assets/less/**/*.less',['less']);
    gulp.watch('client/assets/bootstrap/less/**/*.less').on('change', function(){
      return gulp.src('client/assets/less/bootstrap-custom.less').pipe(saveFile());
    });
    gulp.watch('client/**/*.html').on('change', bs.reload);
    gulp.watch('client/assets/css/**/*.css').on('change', bs.reload);
    gulp.watch('client/views/**/*.hbs').on('change', bs.reload);
    gulp.watch('client/views/layouts/**/*.hbs').on('change', bs.reload);
    gulp.watch('client/views/partials/**/*.hbs').on('change', bs.reload);
});
