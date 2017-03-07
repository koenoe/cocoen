/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import config from '../config';

gulp.task('eslint', () => gulp.src(config.files.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));
