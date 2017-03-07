/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('serve', ['clean'], (cb) => {
  global.isBuild = false;

  runSequence(['styles'], 'browserify', 'watch', cb);
});
