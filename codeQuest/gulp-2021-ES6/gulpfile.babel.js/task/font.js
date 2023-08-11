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
import fonterUnx from 'gulp-fonter-unx';
// import fonter from "gulp-fonter"; // use for window
import ttf2woff2 from 'gulp-ttf2woff2';

// Обработка Font
export default () => {
    return gulp.src(path.font.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Font",
                message: error.message
            }))
        }))
        .pipe(newer(path.font.dest))
        .pipe(fonterUnx(app.fonter))
        .pipe(gulp.dest(path.font.dest))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.font.dest))
        .pipe(browserSync.stream());
}