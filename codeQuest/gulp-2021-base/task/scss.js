// Пакеты
const { src, dest } = require("gulp");
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sassGlob = require("gulp-sass-glob");
const sass = require("gulp-sass")(require("sass"));
const webpCss = require("gulp-webp-css");
const autoprefixer = require("gulp-autoprefixer");
const shorthand = require("gulp-shorthand"); // заменяет все возможные свойства на их краткие формы
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const size = require("gulp-size");
const rename = require("gulp-rename");
const csso = require("gulp-csso"); // сжатие
const gulpIf = require("gulp-if");



// Обработка SCSS
const scss = () => {
    return src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "SCSS",
                message: error.message
            }))
        }))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(gulpIf(app.isProd, webpCss()))
        .pipe(gulpIf(app.isProd, autoprefixer()))
        .pipe(shorthand())
        .pipe(gulpIf(app.isProd, groupCssMediaQueries()))
        .pipe(size({ title: "main.css" }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(browserSync.stream());
}

module.exports = scss;