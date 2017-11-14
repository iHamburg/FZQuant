'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer')

var yeoman = {
  static: "static",
  dist: "dist",
  sass: 'src/sass'
};

// 编译sass
gulp.task('compass', function() {
  return gulp.src([yeoman.sass + "/**/*.scss", "!sass/tobe/**/_*.scss"])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(compass({
      css: yeoman.static + '/css',
      sass: yeoman.sass,
      image: yeoman.sass,
      style: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0'],
      cascade: true
    }))
    .pipe(gulp.dest(yeoman.static + '/css'))
});

// gulp.task('compass2', function() {
//   return gulp.src([yeoman.sass + "/**/*.scss", "!sass/tobe/**/_*.scss"])
//     .pipe(plumber({
//       errorHandler: function(error) {
//         console.log(error.message);
//         this.emit('end');
//       }
//     }))
//     .pipe(compass({
//       css: yeoman.static + '/css',
//       sass: yeoman.sass,
//       image: yeoman.sass,
//       style: 'compressed'
//     }))
//     .pipe(autoprefixer({
//       browsers: ['> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0'],
//       cascade: true
//     }))
//     .pipe(gulp.dest(yeoman.static + '/css2'))
//
//
// });

gulp.task('watch', function() {
  gulp.watch([yeoman.sass + "/**/*.scss", "!sass/tobe/**/_*.scss"], ['compass']);
});

// gulp.task('default', ['compass','compass2', 'watch']);
gulp.task('default', ['compass', 'watch']);
