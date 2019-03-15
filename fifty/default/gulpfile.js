var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var cleanCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

gulp.task('serve', [], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['*.html'], reload);
    gulp.watch(['js/*.js'], reload);
    gulp.watch(['css/*.css'], reload);
    gulp.watch(['images/**/*'], reload);
});


gulp.task('build', [], function() {
    gulp.src("css/*.css")
        .pipe(gulp.dest('build/css'));
    gulp.src("fonts/*")
        .pipe(gulp.dest('build/fonts'));
    gulp.src("js/*.js")
        .pipe(gulp.dest('build/js'));
    gulp.src("images/**/*")
        .pipe(gulp.dest('build/images'));
    gulp.src("**.html")
        .pipe(gulp.dest('build/'));
});
gulp.task('combineCss', function() {
    return gulp.src([
            'css/lib/*'
        ])
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('css/'));
});
gulp.task('combineJS', function() {
    return gulp.src([
            'js/lib/*'
        ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('js/'));
});
gulp.task('compressImg', function() {
    gulp.src('images/*') //đường dẫn đến thư mục chứa các file images
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images')); //thư mục dùng để chứa các file images sau khi nén
});
gulp.task('minify-js', function() {
    gulp.src('js/main.js')
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('build/js/'))
});
gulp.task('minify-style-css', function () {
    return gulp.src(['css/style.css'])
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('build/css'));
});
gulp.task('minify-lib-css', function () {
    return gulp.src(['css/lib.css'])
        .pipe(concat('lib.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('build/css'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(['sass/style.scss', 'sass/responsive.scss', 'sass/animation.scss', 'sass/translate.scss'])
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['sass/**/*'], ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'combineJS', 'combineCss', 'watch', 'serve']);

// build project
gulp.task('project', ['build', 'minify-js', 'minify-lib-css', 'minify-style-css']);
