var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    less        = require('gulp-less'),
    bs          = require('browser-sync').create(),
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
    .pipe(gulp.dest('client/assets/css'))
    .pipe(bs.reload({stream: true}));
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
    .pipe(gulp.dest('client/dist'))
    .pipe(bs.reload({stream: true}));
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
      .pipe(gulp.dest('client/dist'))
      .pipe(bs.reload({stream: true}));
});

// Browsersync
gulp.task('browser-sync', function() {
    bs.init({
        notify: false,
        injectChanges: true,
        proxy: {
          target: 'localhost:3000'
        }
    });
});


// Watch Task
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('client/assets/scss/**/*.scss',['scss']);
    gulp.watch('client/assets/less/**/*.less',['less']);
    gulp.watch('client/assets/js/**/*.js', ['uglify-js']);
    gulp.watch('client/assets/css/**/*.css',['minify-css']);
    gulp.watch('client/views/**/*.hbs').on('change', bs.reload);
    gulp.watch('client/views/layouts/**/*.hbs').on('change', bs.reload);
    gulp.watch('client/views/partials/**/*.hbs').on('change', bs.reload);
    gulp.watch('client/views/**/*.hbs').on('change', bs.reload);
});
