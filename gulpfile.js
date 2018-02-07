'use strict';

var gulp = require('gulp');
var slim = require('gulp-slim');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('html', function() {
  gulp.src(['app/**/*.html', 'app/favicon.ico', 'app/*.png'])
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('slim', function() {
  gulp.src('app/**/*.slim')
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});
    
gulp.task('styles', function() {
  gulp.src(['app/styles/**/*.scss', 'app/styles/**/*.css'])
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
});
    
gulp.task('scripts', function() {
  gulp.src('app/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.stream());
});
    
gulp.task('serve', ['default'], function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  gulp.watch(['app/**/*.html'], ['html']);
  gulp.watch(['app/**/*.slim'], ['slim']);
  gulp.watch(['app/styles/**/*.scss'], ['styles']);
});

gulp.task('default', ['html', 'slim', 'images', 'styles', 'scripts']);

