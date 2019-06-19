'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    // uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    // rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    pug = require('gulp-pug'),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        pug: 'build/',
        php: 'build/',
        libs: 'build/sources/libs/',
        js: 'build/sources/js/',
        css: 'build/sources/css/',
        img: 'build/sources/img/',
        fonts: 'build/sources/fonts/',
        video: 'build/sources/video/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        pug: 'src/*.pug',
        php: 'src/**/*.php',
        libs: 'src/libs/*',
        js: 'src/js/*.js', //В стилях и скриптах нам понадобятся только main файлы
        // js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/css/*.scss',
        // style: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*',
        video: 'src/video/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        pug: 'src/**/*.pug',
        php: 'src/**/*.php',
        libs: 'src/libs/*',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        video: 'src/video/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Server"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        // .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выкинем их в папку build
        .pipe(reload({
            stream: true
        })); //И перезагрузим наш сервер для обновлений
});

gulp.task('pug:build', function buildHTML() {
    gulp.src(path.src.pug) //Выберем файлы по нужному пути
        // gulp.src('*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest(path.build.pug)) //Выкинем их в папку build
        .pipe(reload({
            stream: true
        })); //И перезагрузим наш сервер для обновлений
});

gulp.task('php:build', function () {
    gulp.src(path.src.php) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.php)) //Выкинем их в папку build
        .pipe(reload({
            stream: true
        })); //И перезагрузим наш сервер для обновлений
});

gulp.task('libs:build', function () {
    gulp.src(path.src.libs) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.libs)) //Выкинем их в папку build
        .pipe(reload({
            stream: true
        })); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        // .pipe(rigger())
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: false,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        //.pipe(imagemin({
        //    progressive: true,
        //    svgoPlugins: [{removeViewBox: false}],
        //    use: [pngquant()],
        //    interlaced: true
        //}))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('video:build', function () {
    gulp.src(path.src.video)
        .pipe(gulp.dest(path.build.video))
});

gulp.task('build', [
    'image:build',
    'html:build',
    'pug:build',
    'php:build',
    'libs:build',
    'js:build',
    'style:build',
    'fonts:build',
    'video:build'
]);


gulp.task('watch', function () {
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.pug], function (event, cb) {
        gulp.start('pug:build');
    });
    watch([path.watch.php], function (event, cb) {
        gulp.start('php:build');
    });
    watch([path.watch.libs], function (event, cb) {
        gulp.start('libs:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.video], function (event, cb) {
        gulp.start('video:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);