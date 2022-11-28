import gulp from 'gulp'
const { src, dest, series, parallel, watch } = gulp

//============Плагины================================================================================
import cleanCSS from 'gulp-clean-css'; //Компилятор
import del from 'del'; //очитска dist
import rename from 'rename'; //переменовывание файлов

import dartSass from 'sass'; //scss/sass
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass);

import less from 'gulp-less'; //less
import concat from 'gulp-concat'; //объединение файлов
import filesInclude from 'gulp-file-include'; //объединение html файлов
import replace from 'gulp-replace'; //редактирование файлов
import webpHtmlNosvg from 'gulp-webp-html-nosvg'; //обработка всех картинок в webP кроме svg
import plumber from 'gulp-plumber'; //обработка ошибок
import notify from 'gulp-notify'; //сообщение об ошибке
import browsersync from 'browser-sync'; //локальный сервер
import webpcss from 'gulp-webpcss';//вывод WEBP картинок
import autoprefixer from 'gulp-autoprefixer';//добавление префиксов для кроссбраузерности
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import groupMediaQueries from 'gulp-group-css-media-queries'; //объединяет одинаковые медиа запросы
import uglify from 'gulp-uglify'; //обработка минимизация js файлов
import fonter from 'gulp-fonter'; //конвертирует из otf в ttf и woff шрифты
import ttf2woff2 from 'gulp-ttf2woff2'; //конвертирует из woff в woff2
import zipPlugin from 'gulp-zip'; //папку результата конвертирует в zip
//============Пути===================================================================================
const DIST = './dist/**/*.*';

const path = {
    dist: {
        assets: './dist/assets',
        js: './dist/assets/js',
        css: './dist/assets/css',
        fonts: './dist/assets/fonts',
        iconFonts: './dist/assets/iconFonts'
    },
    src: {
        assets: './src/assets',
        css: './src/assets/css/*.{css,less,scss}',
        modal: './src/html/modal',
        html: './src/html/*.html',
        images: './src/assets/img/**/*.{jpeg,jpg,png,svg,gif,ico,webp}',
        js: './src/assets/js/**/*.js',
        fonts: './src/assets/fonts/**/*.*'
    },
    watch: {
        css: './src/assets/css/**/*.{css,less,scss}',
        html: './src/html/**/*.html',
        images: './src/assets/img/**/*.{jpeg,jpg,png,svg,gif,ico,webp}',
        js: './src/assets/js/**/*.js',
        fonts: './src/assets/fonts/**/*.*',
        iconFonts: './src/assets/iconFonts/**/*.*'
    }
}

//============Задачи==================================================================================
function dell() {
    return del(DIST)
}
function copyMinCss() {
    return gulp.src(path.src.css)
        .pipe(plumber(
            notify.onError({
                title: "CSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sass())
        .pipe(less())
        .pipe(groupMediaQueries())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: false
        }))
        .pipe(replace(/@img\//g, '../img/'))
        .pipe(concat('style.css'))
        .pipe(webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp"
        }))
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.dist.css))
        .pipe(browsersync.stream());
}
function copyHTML() {
    return gulp.src(path.src.html)
        .pipe(plumber(
            notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(filesInclude())
        .pipe(replace(/@img\//g, 'assets/img/'))
        .pipe(webpHtmlNosvg())
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.stream());
}
function copyJS() {
    return gulp.src(['./src/assets/js/*.js', './src/assets/js/vendor/*.js'])
        .pipe(plumber(
            notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))

        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browsersync.stream());
}
function browser() {
    browsersync.init({
        server: {
            baseDir: 'dist/'
        },
        notify: false,
        port: 3000,
    })
}
function images() {
    return gulp.src(path.src.images)
        .pipe(plumber(
            notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(newer('dist/assets/img'))
        .pipe(webp())
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(gulp.src(path.src.images))
        .pipe(newer('dist/assets/img'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(gulp.src('src/assets/img/**/*.svg'))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(browsersync.stream())
}
function ttf() {
    return gulp.src(`${path.src.assets}/fonts/*.otf`)
        .pipe(plumber(
            notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(gulp.dest(`${path.src.assets}/fonts`))
}
function woffWoff2() {
    return gulp.src(`${path.src.assets}/fonts/*.ttf`)
        .pipe(plumber(
            notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(gulp.src(`${path.src.assets}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browsersync.stream());
}
function zip() {
    del('./*.zip')
    return src(DIST)
        .pipe(plumber(
            notify.onError({
                title: "ZIP",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(zipPlugin('dist.zip'))
        .pipe(gulp.dest('./'))
}
function fontsIcon() {
    return gulp.src('src/assets/iconFonts/fonts/*.*', { allowEmpty: true })
        .pipe(gulp.dest(path.dist.iconFonts))
        .pipe(browsersync.stream());
}
function fontsIconCss() {
    return gulp.src('src/assets/iconFonts/iconFonts.css', { allowEmpty: true })
        .pipe(gulp.dest(path.dist.css))
        .pipe(browsersync.stream());
}

const iconFonts = parallel(fontsIcon, fontsIconCss)
const fonts = gulp.series(ttf, woffWoff2);
const copyParallel = gulp.parallel(copyMinCss, images, copyJS, fonts, copyHTML, iconFonts);
export const deployZIP = gulp.series(dell, copyParallel, zip);

const def = gulp.series(dell, copyParallel, gulp.parallel(watcher, browser));

gulp.task('default', def);

function watcher() {
    gulp.watch(path.watch.html, copyHTML);
    gulp.watch(path.watch.css, copyMinCss);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.js, copyJS);
    gulp.watch(path.watch.fonts, fonts);
    gulp.watch(path.watch.iconFonts, iconFonts);
}
