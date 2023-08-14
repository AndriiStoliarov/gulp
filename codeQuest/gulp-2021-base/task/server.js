// Пакеты
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("../config/path.js");

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
}

module.exports = server;