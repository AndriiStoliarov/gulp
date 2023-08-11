// Пакеты
import gulp from "gulp";
import browserSync from "browser-sync";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import babel from "gulp-babel"; // преобразовывает код в синтаксис ES5
// import uglify from "gulp-uglify"; // минифицирует, не нужен при исп. webpack
import webpack from "webpack-stream";
import gulpIf from "gulp-if";

// Обработка JavaScript
export default () => {
    return gulp.src(path.js.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JavaScript",
                message: error.message
            }))
        }))
        .pipe(gulpIf(app.isProd, babel()))
        .pipe(webpack(app.webpack))
        // .pipe(uglify()) // не нужен при использовании webpack
        .pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }))
        .pipe(browserSync.stream());
}