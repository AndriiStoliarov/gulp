const gulp = require('gulp');

gulp.task('default', function() {
    return gulp.src(['src/**/*.css', 'src/**/*.js'], {read: false})
        .pipe(gulp.dest('tmp'));
});