var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var replace = require('gulp-replace');
var vinylPaths = require('vinyl-paths');

var del = require('del');
var path = require('path');


gulp.task('default', function() {
  return gulp.src('')
  .pipe(notify({ message: 'welcome to gulp...'}));
});

gulp.task('clean', function () {
  return gulp.src('./_site/*')
    .pipe(vinylPaths(del))
});

gulp.task('less', function () {
  // w/out concat you end up w/ 2 files
  return gulp.src(['./public/stylesheets/bootstrap/bootstrap.less', './public/stylesheets/style.less'])

    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(minifyCss()) //.pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./_site/public/stylesheets/'));
});


gulp.task('copy', function(){
  //using 'base' parm keeps each file and roots them in the dest
  return gulp.src(
    [
      './bin/**',
      './routes/**',
      './views/**',
      './app.js',
      './package.json'
    ], 
    { base: '.' }
  )
  .pipe(replace('link(rel=\'stylesheet\', href=\'/stylesheets/bootstrap/bootstrap.css\')', ''))
  .pipe(gulp.dest('./_site/'))
});


gulp.task('jade', function(){
  //locals are defined for jade process - otherwise the object notavaiblle during compile.
  var YOUR_LOCALS = { error : { status: 'foo' }}; 
  return gulp.src('./views/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }));
});



gulp.task('package', ['less', 'copy', 'jade']);

