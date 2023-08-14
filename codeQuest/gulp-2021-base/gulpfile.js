// Пакеты
const { series, parallel, watch } = require("gulp");

// Конфигурация
const path = require("./config/path.js");
const app = require("./config/app.js");

// Задачи
const clear = require("./task/clear.js");
const pug = require("./task/pug.js");
const scss = require("./task/scss.js");
const js = require("./task/js.js");
const img = require("./task/img.js");
const font = require("./task/font.js");
const server = require("./task/server.js");

// Наблюдение
const watcher = () => {
    watch(path.pug.watch, pug);
    watch(path.scss.watch, scss);
    watch(path.js.watch, js);
    watch(path.img.watch, img);
    watch(path.font.watch, font);
}

const build = series(
    clear,
    parallel(pug, scss, js, img, font)
);

const dev = series(
    build,
    parallel(watcher, server)
);

// Задачи
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

exports.clear = clear;

// Сборка
// exports.dev = dev;
// exports.build = build;
exports.default = app.isProd ? build : dev;