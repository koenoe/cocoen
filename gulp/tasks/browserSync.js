/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import browserSync from 'browser-sync';
import gulp from 'gulp';
import config from '../config';

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: config.directories.demo,
    },
    port: config.ports.browser,
    ui: {
      port: config.ports.ui,
    },
    ghostMode: {
      links: false,
    },
  });
});
