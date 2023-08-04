/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass')(require('sass')),
  path = require('path');

/**
 * @name _sass
 * @function
 * @description
 * Compile .scss files into build css directory with autoprefixer,
 * then live reload the browser
 * @returns {object} The gulp task stream
 * @private
 */
function _sass() {
  // prettier-ignore
  return gulp
    .src(global.config.scssEntry)
    .pipe(sass({
      includePaths: [
        path.resolve(__dirname, '../../', 'node_modules'), // styles
        path.resolve(__dirname, '../../../../', 'node_modules'), // styles
      ]
    }).on('error', sass.logError))
    .pipe(
      prefix(['> 1%', 'last 2 versions'], {
        cascade: true,
      })
    )
}

/**
 * @name ltr
 * @function
 * @description
 * Compile the regular versions of the css directory into the dist folder
 * @returns {object} the gulp task stream
 * @private
 */
function ltr() {
  return _sass()
    .pipe(rename(global.config.distCss))
    .pipe(
      cleanCSS({
        format: 'beautify',
        level: {
          1: { specialComments: 'none' },
          2: { removeDuplicateRules: true },
        },
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(rename(global.config.distCssMin))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

/**
 * Gulp task export
 *
 * @module sass-ltr
 */
module.exports = gulp.task('sass-ltr', ltr);
