// const fonter = require("gulp-fonter"); // use for window

// Обработка Font
const font = () => {
    return $.gulp.src($.path.font.src)
        .pipe($.gp.plumber({
            errorHandler: $.gp.notify.onError(error => ({
                title: "Font",
                message: error.message
            }))
        }))
        .pipe($.gp.newer($.path.font.dest))
        .pipe($.gp.fonterUnx($.app.fonter))
        .pipe($.gulp.dest($.path.font.dest))
        .pipe($.gp.ttf2woff2())
        .pipe($.gulp.dest($.path.font.dest))
        .pipe($.browserSync.stream());;
}

module.exports = font;