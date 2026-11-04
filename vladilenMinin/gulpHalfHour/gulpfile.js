import gulp from 'gulp';
const { src, dest, series, watch } = gulp;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import csso from 'gulp-csso';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import { deleteAsync as del } from 'del';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
const sync = browserSync.create();

const sass = gulpSass(dartSass);

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'));
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'));
}

function clear() {
    return del('dist');
}

function serve() {
    sync.init({
        server: './dist'
    });

    watch('src/**.html', series(html)).on('change', sync.reload);
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload);
}

// exports.html = html();
// gulp.task(html);

const build = series(clear, scss, html);
const serve = series(clear, scss, html, serve);

export { build };
export { clear };
export { serve };