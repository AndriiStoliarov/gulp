// Пакеты
import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import concat from "gulp-concat";
import cssimport from "gulp-cssimport";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso"; // сжатие
import rename from "gulp-rename";
import size from "gulp-size";
import shorthand from "gulp-shorthand"; // заменяет все возможные свойства на их краткие формы
import groupCssMediaQueries from "gulp-group-css-media-queries";
import webpCss from "gulp-webp-css";
import gulpIf from "gulp-if";

// Обработка CSS
export default () => {
    return gulp.src(path.css.src, { sourcemaps: app.isDev })
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
        .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }));
}