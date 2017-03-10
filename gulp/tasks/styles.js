/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cleancss from 'gulp-clean-css';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import config from '../config';

gulp.task('styles', () => {
  const createSourcemap = !global.isBuild;

  return gulp.src(`${config.directories.src}/scss/cocoen.scss`)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(sass({
      sourceComments: !global.isBuild,
      includePaths: [].concat(config.files.scss),
    }))
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 1%', 'ie 8'],
    }))
    .pipe(gulpif(global.isBuild, cleancss()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(createSourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest(`${config.directories.build}/css`))
    .pipe(gulp.dest(`${config.directories.demo}/css`))
    .pipe(browserSync.stream());
});
