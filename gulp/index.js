/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import fs from 'fs';
import gulp from 'gulp';
import onlyScripts from './util/scriptfilter';

const tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

// Ensure process ends after all Gulp tasks are finished
gulp.on('stop', () => {
  function stop() {
    if (!global.isWatching) {
      process.nextTick(() => {
        process.exit(0);
      });
    }
  }
  setTimeout(stop, 500);
});

tasks.forEach((task) => {
  require(`./tasks/${task}`); // eslint-disable-line
});
