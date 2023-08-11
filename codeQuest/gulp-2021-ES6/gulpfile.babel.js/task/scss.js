// Пакеты
import gulp from "gulp";
import browserSync from "browser-sync";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import sassGlob from "gulp-sass-glob"; // импортирует sass файлы через специальные маски, for example: @import "block/*.scss"
import dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

import webpCss from 'gulp-webp-css'; // вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // добавление вендорных префиксов
import shorthand from "gulp-shorthand"; // заменяет все возможные свойства на их краткие формы
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групировка медиа запросов
import size from "gulp-size";
import rename from "gulp-rename";
import csso from "gulp-csso"; // сжатие
import gulpIf from "gulp-if";

// Обработка SCSS
export default () => {
    return gulp.src(path.scss.src, { sourcemaps: app.isDev })
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
        .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(browserSync.stream());
}