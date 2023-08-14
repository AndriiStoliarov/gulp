// Пакеты
const { src, dest } = require("gulp");
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const gulpIf = require("gulp-if");

// Обработка Image
const img = () => {
    return src(path.img.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Image",
                message: error.message
            }))
        }))
        .pipe(newer(path.img.dest))
        .pipe(gulpIf(app.isProd, webp()))
        .pipe(gulpIf(app.isProd, dest(path.img.dest)))
        .pipe(gulpIf(app.isProd, src(path.img.src)))
        .pipe(gulpIf(app.isProd, newer(path.img.dest)))
        .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
        .pipe(dest(path.img.dest))
        .pipe(browserSync.stream());;
}

module.exports = img;