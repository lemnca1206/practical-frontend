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
        notify: true,
        port: 3000,
        server: {
            baseDir: './src/app/'
        }
    });
    gulp.watch(['./src/app/*.html'], reload);
    gulp.watch(['./src/assets/js/*.js'], reload);
    gulp.watch(['./src/assets/css/*.css'], reload);
    gulp.watch(['./src/assets/images/*'], reload);
});


gulp.task('build', [], function() {
    gulp.src("./src/assets/css/*.css")
        .pipe(gulp.dest('build/css'));
    gulp.src("fonts/*")
        .pipe(gulp.dest('build/fonts'));
    gulp.src("./src/assets/js/*.js")
        .pipe(gulp.dest('build/js'));
    gulp.src("./src/app/**.html")
        .pipe(gulp.dest('build/'));
});
gulp.task('combineCss', function() {
    return gulp.src([
            './src/assets/css/lib/*'
        ])
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./src/assets/css/'));
});
gulp.task('combineJS', function() {
    return gulp.src([
            './src/assets/js/lib/*'
        ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./src/assets/js/'));
});

gulp.task('nenimg', function() {
    gulp.src('./src/assets/images/*') //đường dẫn đến thư mục chứa các file images
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images')); //thư mục dùng để chứa các file images sau khi nén
});


gulp.task('minify-js', function() {
    gulp.src('./src/assets/js/main.js')
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
gulp.task('minify-common-js', function() {
    gulp.src('./src/assets/js/common.js')
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
    return gulp.src(['./src/assets/css/style.css'])
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('build/css'));
});
gulp.task('minify-lib-css', function () {
    return gulp.src(['./src/assets/css/lib.css'])
        .pipe(concat('lib.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('build/css'));
});



gulp.task('compress', function() {
    //cấu hình minify js
    gulp.src('./src/assets/js/*.js') //đường dẫn đến thư mục chứa các file js
        .pipe(minify({
            ext: {
                src: '.min.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['main.js']
        }))
        .pipe(gulp.dest('js')); //thư mục dùng để chứa các file js sau khi nén
    //cấu hình minify css
    // gulp.src('css/style.css') //đường dẫn đến thư mục chứa các file css
    //     .pipe(minifyCss({ compatibility: 'ie8' }))
    //     .pipe(gulp.dest('css')); //thư mục dùng để chứa các file css sau khi nén
    //cấu hình minify image
    // gulp.src('images/*') //đường dẫn đến thư mục chứa các file images
    //     .pipe(imagemin({
    //         progressive: true,
    //         svgoPlugins: [{ removeViewBox: false }],
    //         use: [pngquant()]
    //     }))
    //     .pipe(gulp.dest('images')); //thư mục dùng để chứa các file images sau khi nén
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(['./src/assets/sass/style.scss', './src/assets/sass/responsive.scss', './src/assets/sass/animation.scss', './src/assets/sass/translate.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./src/assets/sass/**/*'], ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'combineJS', 'combineCss', 'watch', 'serve']);

// build project
gulp.task('project', ['build', 'minify-js', 'minify-common-js', 'minify-style-css', 'minify-lib-css']);
