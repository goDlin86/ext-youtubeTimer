const { src, dest, parallel } = require('gulp')
const browserify = require('gulp-browserify')
const babelify = require('babelify')
const concat = require('gulp-concat')
const uglify = require("gulp-uglify")

function js() {
  return src('src.js')
    .pipe(browserify({
      //insertGlobals: true, 
      debug: true,
      transform: [babelify.configure({
        presets: ['@babel/env']
        //sourceMaps: true
      })]
    }))
    .pipe(concat('main.js'))
    .pipe(dest('.'))
}

function jsmin() {
  return src('src.js')
    .pipe(browserify({
      //insertGlobals: true, 
      debug: false,
      transform: [babelify.configure({
        presets: ['@babel/env']
        //sourceMaps: true
      })]
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('.'))
}

exports.js = js
exports.jsmin = jsmin