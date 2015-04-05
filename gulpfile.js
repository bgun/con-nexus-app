'use strict';

var gulp       = require('gulp')
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var less       = require('gulp-less');
var template   = require('gulp-template-compile');

var fs = require('fs');

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
  gulp.src('assets/'+conId+'/'+conId+'.less')
    .pipe(less())
    .pipe(concat('./bundle.css'))
    .pipe(gulp.dest(''));
});
 
gulp.task('templates', function () {
  gulp.src('app/templates/*.tmpl.html')
    .pipe(template())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
  gulp.watch('app/**/*.js',               ['browserify','todo']);
  gulp.watch('app/templates/*.tmpl.html', ['templates']);
  gulp.watch('assets/**/*.less',          ['less']);
});