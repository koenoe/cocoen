/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import gulp from 'gulp';
import config from '../config';

gulp.task('watch', ['browserSync'], () => {
  global.isWatching = true;

  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  gulp.watch(config.files.scss, ['styles']);
});
