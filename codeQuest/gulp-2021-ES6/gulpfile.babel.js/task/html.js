// Пакеты
import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"; // сообщения (подсказки)
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import size from "gulp-size";
import webpHtml from "gulp-webp-html";
import gulpIf from "gulp-if"; // условное ветвление

// Обработка HTML
export default () => {
    return gulp.src(path.html.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileInclude())
        .pipe(gulpIf(app.isProd, webpHtml()))
        .pipe(size({ title: "До сжатия" }))
        .pipe(gulpIf(app.isProd, htmlmin(app.htmlmin)))
        .pipe(size({ title: "После сжатия" }))
        .pipe(gulp.dest(path.html.dest));
}