var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Paths
var scss = 'assets/scss/**/*';
var css = 'assets/css/';

var js_source = 'assets/js/source/*';
var js_compiled = 'assets/js/';

/**
* Smush the admin Styles and output
*/
gulp.task('scss', function(){
	return gulp.src(scss)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefix('last 15 version'))
		.pipe(gulp.dest(css))
		.pipe(plumber())
		.pipe(livereload())
		.pipe(notify('Simple Locator styles compiled & compressed.'));
});

/**
* Smush the JS and output
*/
gulp.task('scripts', function(){
	return gulp.src(js_source)
		.pipe(gulp.dest(js_compiled))
		.pipe(uglify())
		.pipe(gulp.dest(js_compiled))
		.pipe(notify('Simple Locator scripts compiles & compressed.'));
});


/**
* Watch Task
*/
gulp.task('watch', function(){
	livereload.listen(8000);
	gulp.watch(scss, ['scss']);
	gulp.watch(js_source, ['scripts']);
});

/**
* Default
*/
gulp.task('default', ['scss', 'scripts', 'watch']);