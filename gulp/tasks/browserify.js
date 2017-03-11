/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import browserSync from 'browser-sync';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import watchify from 'watchify';
import config from '../config';

function buildScript(file, entries, name) {
  const options = {
    entries,
    debug: true,
  };
  if (name) {
    options.standalone = name;
  }
  let bundler = browserify(options);

  if (!global.isBuild) {
    bundler = watchify(bundler);

    gutil.log(gutil.colors.cyan('browserify:rebundle'));
    bundler.on('update', rebundle); // eslint-disable-line
  }

  const transforms = [
    { name: babelify, options: { } },
  ];

  transforms.forEach((transform) => {
    bundler.transform(transform.name, transform.options);
  });

  function onError(error) {
    gutil.log(gutil.colors.red('browserify: ', error));
  }

  function rebundle() {
    const createSourcemap = !global.isBuild;
    return bundler.bundle().on('error', onError)
      .pipe(source(file))
      .pipe(buffer())
      .pipe(gulpif(createSourcemap, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(global.isBuild, streamify(uglify())))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulpif(createSourcemap, sourcemaps.write('.')))
      .pipe(gulp.dest(`${config.directories.build}/js`))
      .pipe(gulp.dest(`${config.directories.demo}/js`))
      .pipe(browserSync.stream());
  }

  return rebundle();
}

gulp.task('browserify', () => {
  buildScript('cocoen.js', [`${config.directories.src}/js/cocoen.js`], 'Cocoen');
  buildScript('cocoen-jquery.js', [`${config.directories.src}/js/cocoen-jquery.js`]);
});
