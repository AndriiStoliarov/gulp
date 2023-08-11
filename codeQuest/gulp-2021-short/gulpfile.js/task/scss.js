// Плагины
const sass = $.gp.sass(require("sass"));

// Обработка SCSS
const scss = () => {
    return $.gulp.src($.path.scss.src, { sourcemaps: $.app.isDev })
        .pipe($.gp.plumber({
            errorHandler: $.gp.notify.onError(error => ({
                title: "SCSS",
                message: error.message
            }))
        }))
        .pipe($.gp.sassGlob())
        .pipe(sass())
        .pipe($.gp.if($.app.isProd, $.gp.webpCss()))
        .pipe($.gp.if($.app.isProd, $.gp.autoprefixer()))
        .pipe($.gp.shorthand())
        .pipe($.gp.if($.app.isProd, $.gp.groupCssMediaQueries()))
        .pipe($.gp.size({ title: "main.css" }))
        .pipe($.gulp.dest($.path.scss.dest, { sourcemaps: $.app.isDev }))
        .pipe($.gp.rename({ suffix: ".min" }))
        .pipe($.gp.csso())
        .pipe($.gp.size({ title: "main.min.css" }))
        .pipe($.gulp.dest($.path.scss.dest, { sourcemaps: $.app.isDev }))
        .pipe($.browserSync.stream());;
}

module.exports = scss;