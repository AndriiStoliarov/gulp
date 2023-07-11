const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');

const isDevelopment = true;

gulp.task('less', function() {
    return gulp.src('src/less/**/*.less')
        .pipe(debug({title: 'src'}))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('public'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('public'));
});

gulp.task('default', gulp.series(['less', 'html']));