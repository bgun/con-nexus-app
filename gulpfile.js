'use strict';

var gulp       = require('gulp')
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var less       = require('gulp-less');
var template   = require('gulp-template-compile');
var gls        = require('gulp-live-server');

var server = gls.static();

var fs = require('fs');
var test = fs.readFileSync('package.json');
console.log(test.toString());

var conId = process.env.CON;
if(!conId) {
  throw new Error("Must provide a convention ID");
}

gulp.task('browserify', function() {
  return gulp.src('app/main.js')
    .pipe(browserify({
      debug: true
    }))
    .pipe(concat('bundle.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(server.notify());
});

gulp.task('less', function() {
  return gulp.src('assets/'+conId+'/'+conId+'.less')
    .pipe(less())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./'))
    .pipe(server.notify());
});
 
gulp.task('templates', function () {
  return gulp.src('app/templates/*.tmpl.html')
    .pipe(template())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./'))
    .pipe(server.notify());
});

gulp.task('serve', ['browserify','less','templates'], function() {
  server.start();
  gulp.watch('app/**/*.js',               ['browserify','todo']);
  gulp.watch('app/templates/*.tmpl.html', ['templates']);
  gulp.watch('assets/**/*.less',          ['less']);
});

gulp.task('default', ['serve','browserify','less','templates']);

