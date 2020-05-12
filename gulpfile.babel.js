import { src, dest, parallel } from 'gulp'
import browserify from 'gulp-browserify'
import babelify from 'babelify'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

export default () =>
  src('src.js')
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

export const jsmin = () =>
  src('src.js')
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