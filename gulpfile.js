var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	bower = require('main-bower-files'),
	del = require('del'),
	ghPages = require('gulp-gh-pages'),
	imagemin = require('gulp-imagemin'),
	inject = require('gulp-inject'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	series = require('stream-series'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

var paths = {
	js: './src/js/',
	scss: './src/scss/',
	img: './src/img/',
	dest: './dist/'
};

var injectParams = {
	file: 'index.html',
	options: {relative: true, read: false}
};

var scssLoadPaths = [
	paths.scss
];

// Scripts
gulp.task('bower-js', function(){
	return gulp.src(bower('**/*.js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dest + 'js/vendor'));
});
gulp.task('js', ['bower-js'], function () {
	return gulp.src(paths.js + '**/*.js')
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dest + 'js'));
});
gulp.task('jshint', function() {
	return gulp.src(paths.js + '**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// Styles
gulp.task('css', function() {
	return gulp.src(paths.scss + '**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: scssLoadPaths
		}))
		.on('error', sass.logError)
		.pipe(autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.dest + 'css'));
});

// Images
gulp.task('img', function() {
	return gulp.src(paths.img + '**/*', { base: paths.img })
		.pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
		.pipe(gulp.dest(paths.dest + 'img'));
});

// Clean
gulp.task('clean', function(cb) {
	del([paths.dest + '**/*.js', paths.dest + '**/*.css'], cb);
});

// Inject
gulp.task('inject', ['css','js'], function () {
	var vendorStream = gulp.src([paths.dest + 'js/vendor/*.js'], {read: false}),
		appStream = gulp.src([paths.dest + 'css/*.css', paths.dest + 'js/*.js'], {read: false});

	return gulp.src(paths.dest + injectParams.file)
		.pipe(inject(series(vendorStream, appStream), injectParams.options))
		.pipe(gulp.dest(paths.dest));
});

// Deploy
gulp.task('deploy', function() {
	return gulp.src(paths.dest + '**/*')
		.pipe(ghPages());
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

gulp.task('default', ['img','clean','inject','watch']);