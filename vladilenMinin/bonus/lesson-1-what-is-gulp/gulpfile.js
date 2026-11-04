var gulp = require('gulp');

gulp.task('hello', async function() {
    console.log('Hello world!');
});

gulp.task('log', function(done) {
    console.log('Hello world again!');
    done();
});

gulp.task('default', gulp.series('hello', 'log'));