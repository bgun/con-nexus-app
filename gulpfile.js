'use strict';

var gulp       = require('gulp')
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var less       = require('gulp-less');
var template   = require('gulp-template-compile');
var gls        = require('gulp-live-server');

var server = null;

var conId = process.env.CON;
if(!conId) {
  throw new Error("Must provide a convention ID");
}

gulp.task('browserify', ['serve'], function() {
  return gulp.src('app/main.js')
    .pipe(browserify({
      debug: true
    }))
    .pipe(concat('bundle.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(server.notify());
});

gulp.task('less', ['serve'], function() {
  return gulp.src('assets/'+conId+'/'+conId+'.less')
    .pipe(less())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./'))
    .pipe(server.notify());
});
 
gulp.task('templates', ['serve'], function () {
  return gulp.src('app/templates/*.tmpl.html')
    .pipe(template({
      name: function(file) {
        return file.relative.replace('.tmpl.html','');
      }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./'))
    .pipe(server.notify());
});

gulp.task('watch', ['serve'], function() {
  gulp.watch('app/**/*.js',               ['browserify']);
  gulp.watch('app/templates/*.tmpl.html', ['templates']);
  gulp.watch(['app/**/*.less','assets/**/*.less'],          ['less']);
});

gulp.task('serve', function() {
  server = gls.static('./', 5001);
  server.start();
});

gulp.task('default', ['serve','watch','browserify','less','templates']);