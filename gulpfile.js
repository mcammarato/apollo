var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    bs          = require('browser-sync').create();

// Convert SCSS to CSS
gulp.task('styles', function () {
  return gulp.src('client/app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/app/css'));
});

// Browser Sync
gulp.task('browser-sync', function() {
      bs.init({
      proxy: "localhost:3000",
      notify: false,
      injectChanges: true
    });

});

// Watch Task
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('client/app/scss/**/*.scss',['styles']);
    gulp.watch('client/**/*.html').on('change', bs.reload);
    gulp.watch('client/app/css/**/*.css').on('change', bs.reload);
});
