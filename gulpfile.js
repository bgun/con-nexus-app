var gulp       = require('gulp')
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var gutil      = require('gulp-util');
var less       = require('gulp-less');

var conId = process.env.CON;

if(!conId) {
  throw new Error("Must provide a convention ID");
}

gulp.task('browserify', function() {
  gulp.src('app/main.js')
    .pipe(browserify({
      debug: true
    }))
    .pipe(concat('./bundle.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(''))
});

gulp.task('less', function() {
  gulp.src('assets/css/'+conId+'/'+conId+'.less')
    .pipe(less())
    .pipe(concat('./bundle.css'))
    .pipe(gulp.dest(''));
});

gulp.task('default', function() {
  gulp.watch('app/**/*.js',           ['browserify','todo']);
  gulp.watch('assets/**/*.less', ['less']);
});