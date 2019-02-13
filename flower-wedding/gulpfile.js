'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const pug = require('gulp-pug');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const watch = require('gulp-watch');
const expect = require('gulp-expect-file');
const ghPages = require('gulp-gh-pages');
const MAP = { map: true };


// Source folder configuration
const SRC_DIR = {};
SRC_DIR.root = 'src/';
SRC_DIR.assets = SRC_DIR.root + 'assets/';
SRC_DIR.img = SRC_DIR.root + 'images/';
SRC_DIR.js = SRC_DIR.root + 'js/';
SRC_DIR.less = SRC_DIR.root + 'less/';
SRC_DIR.pug = SRC_DIR.root + 'pug/';

// Source file matchers, using respective directories
const SRC_FILES = {
	lessFile: SRC_DIR.less + '**/*.less',
	less: SRC_DIR.less + 'style.less',
	lessPrint: SRC_DIR.less + 'print.less',
	lessBootstrap: SRC_DIR.less + 'bootstrap/bootstrap.less',
	lessBlocks: SRC_DIR.less + 'blocks/*.less',
	pugLayouts: SRC_DIR.pug + 'layouts/*.pug',
	pugBlocks: SRC_DIR.pug + 'blocks/*.pug',
	pugMixins: SRC_DIR.pug + 'mixins/*.pug',
	pug: SRC_DIR.pug + '*.pug',
	pugFiles: SRC_DIR.pug + '**/*.pug',
	js: SRC_DIR.js + '*.js',
	jsFile: SRC_DIR.js + '**/*.js',
	jsPlugin: SRC_DIR.js + 'plugins/*.js',
	jsLibs: ['./src/js/libs/modernizr.min.js', './src/js/libs/detectizr.min.js', './src/js/libs/jquery.min.js', './src/js/libs/tether.min.js', './src/js/libs/plugins/*.js'],
	images: SRC_DIR.img + '**/*',
	assets: SRC_DIR.assets + '**/*'
};

// Output directories
const PUB_DIR = {};
PUB_DIR.root = './public/';
PUB_DIR.js = PUB_DIR.root + 'js/';
PUB_DIR.jsLibs = PUB_DIR.root + 'js/libs.js';
PUB_DIR.css = PUB_DIR.root + 'css/';
PUB_DIR.cssFiles = PUB_DIR.root + ['css/style.css', 'css/libs.css', 'css/print.css'];
PUB_DIR.fnt = PUB_DIR.root + 'fonts/';
PUB_DIR.img = PUB_DIR.root + 'images/';


// TASKS

gulp.task('watch', function() {

	watch([SRC_FILES.lessFile], function() {
		gulp.start('lessDev');
	});
	watch([SRC_FILES.pugFiles], function() {
		gulp.start('pug');
	});
	watch([SRC_FILES.jsFile], function() {
		gulp.start('js');
	});
	watch([SRC_FILES.images], function() {
		gulp.start('copyImages');
	});
	watch([SRC_FILES.assets], function() {
		gulp.start('copyAssets');
	});
});

gulp.task('js', function() {
	gulp.src([SRC_FILES.js, SRC_FILES.jsPlugin])
		.pipe(gulp.dest(PUB_DIR.js))
		.pipe(connect.reload())
	gulp.src(SRC_FILES.jsLibs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(PUB_DIR.js));
});

gulp.task('jsmin', function() {
	gulp.src([SRC_FILES.js, SRC_FILES.jsPlugin])
		.pipe(uglify())
		.pipe(gulp.dest(PUB_DIR.js))
		.pipe(connect.reload())
});

gulp.task('less', function() {
	gulp.src([SRC_FILES.less, SRC_FILES.lessBootstrap, SRC_FILES.lessPrint])
		.pipe(expect([SRC_FILES.less, SRC_FILES.lessBootstrap, SRC_FILES.lessPrint]))
		.pipe(less())
		// .pipe(autoprefixer(MAP))
		.pipe(gulp.dest(PUB_DIR.css))
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(PUB_DIR.css))
			.pipe(connect.reload())
});
gulp.task('lessDev', function () {
	gulp.src([SRC_FILES.less, SRC_FILES.lessBootstrap, SRC_FILES.lessPrint])
	.pipe(expect([SRC_FILES.less, SRC_FILES.lessBootstrap, SRC_FILES.lessPrint]))
	.pipe(sourcemaps.init())
		.pipe(less())
		// .pipe(autoprefixer(MAP))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(PUB_DIR.css))
		// .pipe(cssmin())
		// .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(PUB_DIR.css))
		.pipe(connect.reload())
});
gulp.task('pug', function() {
	gulp.src(SRC_FILES.pug)
		.pipe(expect(SRC_FILES.pug))
		.pipe(pug({
			pretty: true // Comment this to get minified HTML
		}))
		.pipe(gulp.dest(PUB_DIR.root))
		.pipe(connect.reload())
});

gulp.task('imagemin', function() {
	gulp.src(SRC_FILES.images)
		.pipe(imagemin())
		.pipe(gulp.dest(PUB_DIR.img))
		.pipe(connect.reload())
});

gulp.task('copyImages', function() {
	gulp.src(SRC_FILES.images)
		.pipe(gulp.dest(PUB_DIR.img))
		.pipe(connect.reload())
});

gulp.task('copyAssets', function() {
	gulp.src(SRC_FILES.assets)
		.pipe(gulp.dest(PUB_DIR.root))
		.pipe(connect.reload())
});

gulp.task('webserver', function() {
	connect.server({
		root: 'public',
		livereload: true,
		port: 1000,
		host: 'localhost'
	})
});
gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('dev', ['clean', 'lessDev', 'pug', 'copyImages', 'js', 'copyAssets']);
gulp.task('build', ['clean', 'less', 'pug', 'imagemin', 'js', 'copyAssets']);
gulp.task('default', ['dev', 'webserver', 'watch']);

gulp.task('deploy', function() {
	return gulp.src('./public/**/*')
		.pipe(ghPages());
});

