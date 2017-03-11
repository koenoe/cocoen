/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import gulp from 'gulp';
import del from 'del';
import config from '../config';

gulp.task('clean', () => del([config.directories.build, `${config.directories.demo}/js`, `${config.directories.demo}/css`]));
