// Пакеты
import gulp from "gulp";
// import browserSync from "browser-sync";

// Конфигурация
import path from "./config/path.js";
import app from "./config/app.js";

// Задачи
import clear from "./task/clear.js";
import pug from "./task/pug.js";
import scss from "./task/scss.js";
import js from "./task/js.js";
import img from "./task/img.js";
import font from "./task/font.js";
import server from "./task/server.js";

// Отслеживание изменений
const watcher = () => {
    gulp.watch(path.pug.watch, pug); // .on('all', browserSync.reload);
    gulp.watch(path.scss.watch, scss);
    gulp.watch(path.js.watch, js);
    gulp.watch(path.img.watch, img);
    gulp.watch(path.font.watch, font);
}

const build = gulp.series(
    clear,
    gulp.parallel(pug, scss, js, img, font)
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server)
);

// Задачи
export { pug };
export { scss };
export { js };
export { img };
export { font };

// Сборка
export default app.isProd ? build : dev;
// export { dev };
// export { build };