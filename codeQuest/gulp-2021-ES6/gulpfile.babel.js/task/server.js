// Пакеты
import browserSync from "browser-sync"; // локальный сервер

// Конфигурация
import path from "../config/path.js";

// Сервер
export default () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
}