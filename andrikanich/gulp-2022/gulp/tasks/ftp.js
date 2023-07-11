import { configFTP } from '../config/ftp.js'; // Конфигурационный файл
import vinylFTP from 'vinyl-ftp'; // Отправка на ftp
import util from 'gulp-util'; // Отображаем ход копирования файлов на ftp

export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP); // Создаем подключение
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FTP",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}