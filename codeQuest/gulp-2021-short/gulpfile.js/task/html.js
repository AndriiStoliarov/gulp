// Обработка HTML
const html = () => {
    return $.gulp.src($.path.html.src)
        .pipe($.gp.plumber({
            errorHandler: $.gp.notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe($.gp.fileInclude())
        .pipe($.gp.if($.app.isProd, $.gp.webpHtml()))
        .pipe($.gp.size({ title: "До сжатия" }))
        .pipe($.gp.if($.app.isProd, $.gp.htmlmin($.app.htmlmin)))
        .pipe($.gp.size({ title: "После сжатия" }))
        .pipe($.gulp.dest($.path.html.dest));
}

module.exports = html;