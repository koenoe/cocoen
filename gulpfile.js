var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	del = require('del'),
	inject = require('gulp-inject'),
	livereload = require('gulp-livereload'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

var paths = {
	js: './src/js/',
	scss: './src/scss/',
	dest: './dist/'
};

var injectParams = {
	file: 'demo.html',
	options: {relative: true, read: false}
};

var scssLoadPaths = [
	paths.scss
];

// Scripts
gulp.task('js', function () {
	return gulp.src(paths.js + '**/*.js')
		.pipe(concat('cocoen.js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dest + 'js'));
});

// Styles
gulp.task('css', function() {
	return gulp.src(paths.scss + 'main.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: scssLoadPaths
		}))
		.on('error', sass.logError)
		.pipe(autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
		.pipe(concat('cocoen.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.dest + 'css'));
});

// Clean
gulp.task('clean', function(cb) {
	del([paths.dest + '**/*.js', paths.dest + '**/*.css'], cb);
});

// Inject
gulp.task('inject', ['css','js'], function () {
	var target = gulp.src(paths.dest + injectParams.file),
		sources = gulp.src([paths.dest + '**/*.css', paths.dest + '**/*.js'], {read: false});

	return target.pipe(inject(sources, injectParams.options))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
	// Listen on port 35729
	livereload.listen(35729, function (err) {
		if (err) {
			return console.log(err)
		};

		gulp.watch([paths.js + '**/*.js'], ['js']);
		gulp.watch([paths.scss + '**/*.scss'], ['css']);
	});
});

gulp.task('default', ['clean','inject','watch']);