// Пакеты
import gulp from "gulp";
import browserSync from "browser-sync";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import pug from "gulp-pug";
import webpHtml from "gulp-webp-html";
import gulpIf from "gulp-if";
// import loadPlugins from "gulp-load-plugins";
// const gp = loadPlugins();

// Обработка PUG
export default () => {
    return gulp.src(path.pug.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Pug",
                message: error.message
            }))
        }))
        .pipe(pug(app.pug))
        .pipe(gulpIf(app.isProd, webpHtml()))
        .pipe(gulp.dest(path.pug.dest))
        .pipe(browserSync.stream());
}