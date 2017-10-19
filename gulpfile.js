var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var sassPaths = [
    'node_modules/normalize.scss/sass',
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src'
];

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'));
});

// Static Server + watching scss/html files
gulp.task('default', ['sass'], function() {

    browserSync.init({
        server: "./"
    });


    gulp.watch(['scss/**/*.scss'], ['sass']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});