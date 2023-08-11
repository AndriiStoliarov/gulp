const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso"); // сжатие
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand"); // заменяет все возможные свойства на их краткие формы
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css");
const gulpIf = require("gulp-if");

// Обработка CSS
const css = () => {
    return src(path.css.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "CSS",
                message: error.message
            }))
        }))
        .pipe(concat("main.css"))
        .pipe(cssimport())
        .pipe(gulpIf(app.isProd, webpCss()))
        .pipe(gulpIf(app.isProd, autoprefixer()))
        .pipe(gulpIf(app.isProd, shorthand()))
        .pipe(gulpIf(app.isProd, groupCssMediaQueries()))
        .pipe(size({ title: "main.css" }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulpIf(app.isProd, csso()))
        .pipe(size({ title: "main.min.css" }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
}

module.exports = css;