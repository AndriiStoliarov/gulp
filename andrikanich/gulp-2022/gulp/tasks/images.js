import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        // проверяем картинки, которые изменились либо которых там нет
        .pipe(app.plugins.newer(app.path.build.images))
        // создаем изображение
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp()
            )
        )
        // выгружаем в папку с результатом
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )
        // получаем доступ к исходникам
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)
            )
        )
        // опять проверяем на изменения
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)
            )
        )
        // задача для сжатия картинок
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3 // 0 to 7
                })
            )
        )
        // выгружаем оптимизированные картинки в папку с результатом
        .pipe(app.gulp.dest(app.path.build.images))
        // получаем доступ к svg-изображениям
        .pipe(app.gulp.src(app.path.src.svg))
         // копируем в изтбражения в папку с результатом
        .pipe(app.gulp.dest(app.path.build.images))
        // обновляем браузер
        .pipe(app.plugins.browsersync.stream());
}   ;