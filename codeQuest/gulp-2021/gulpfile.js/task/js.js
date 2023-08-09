const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel"); // преобразовывает код в синтаксис ES5
// const uglify = require("gulp-uglify"); // минифицирует, не нужен при исп. webpack
const gulpIf = require("gulp-if");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();

// Обработка JavaScript
const js = () => {
    return src(path.js.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JavaScript",
                message: error.message
            }))
        }))
        .pipe(gulpIf(app.isProd, babel()))
        .pipe(webpack(app.webpack))
        // .pipe(uglify()) // не нужен при использовании webpack
        .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
        .pipe(browserSync.stream());
}

module.exports = js;