// Пакеты
import gulp from "gulp";
import browserSync from "browser-sync";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"; // сообщения (подсказки)
import newer from "gulp-newer"; // проверка обновления
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import gulpIf from "gulp-if"; // условное ветвление

// Обработка Image
export default () => {
    return gulp.src(path.img.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Image",
                message: error.message
            }))
        }))
        .pipe(newer(path.img.dest))
        .pipe(gulpIf(app.isProd, webp()))
        .pipe(gulpIf(app.isProd, gulp.dest(path.img.dest)))
        .pipe(gulpIf(app.isProd, gulp.src(path.img.src)))
        .pipe(gulpIf(app.isProd, newer(path.img.dest)))
        .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
        .pipe(gulp.dest(path.img.dest))
        .pipe(browserSync.stream());
}