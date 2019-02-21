const { src, dest, parallel } = require('gulp')
const browserify = require('gulp-browserify')
const babelify = require('babelify')
const concat = require('gulp-concat')

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

exports.js = js