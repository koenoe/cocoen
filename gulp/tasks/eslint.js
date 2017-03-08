/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import config from '../config';

gulp.task('eslint', () => gulp.src([].concat(config.files.js, ['./gulp/**/*.js']))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));
