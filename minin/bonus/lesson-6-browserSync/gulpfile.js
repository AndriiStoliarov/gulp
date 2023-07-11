const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
// const debug = require('gulp-debug');
const browserSync = require('browser-sync').create();

const isDevelopment = false;

gulp.task('less', function() {
    return gulp.src('src/less/**/*.less')
        // .pipe(debug({title: 'src'}))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('src/less/**/*.less', gulp.parallel(['less']));
    gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['less', 'serve']));