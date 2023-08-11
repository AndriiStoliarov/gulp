// Пакеты
const webpack = require("webpack-stream");

// Обработка JavaScript
const js = () => {
    return $.gulp.src($.path.js.src, { sourcemaps: $.app.isDev })
        .pipe($.gp.plumber({
            errorHandler: $.gp.notify.onError(error => ({
                title: "JavaScript",
                message: error.message
            }))
        }))
        .pipe($.gp.if($.app.isProd, $.gp.babel()))
        .pipe(webpack($.app.webpack))
        .pipe($.gulp.dest($.path.js.dest, { sourcemaps: $.app.isDev }))
        .pipe($.browserSync.stream());
}

module.exports = js;