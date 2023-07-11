const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
    return gulp.src('src/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'));
});

gulp.task('default', gulp.series(['less']));