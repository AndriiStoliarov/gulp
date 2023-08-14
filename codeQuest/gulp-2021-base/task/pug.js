// Пакеты
const { src, dest } = require("gulp");
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const gulpPug = require("gulp-pug");
const webpHtml = require("gulp-webp-html");
const gulpIf = require("gulp-if");

// Обработка PUG
const pug = () => {
    return src(path.pug.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Pug",
                message: error.message
            }))
        }))
        .pipe(gulpPug(app.pug))
        .pipe(gulpIf(app.isProd, webpHtml()))
        .pipe(dest(path.pug.dest))
        .pipe(browserSync.stream());
}

module.exports = pug;