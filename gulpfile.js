'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var del = require('del');

var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var spritesmith  = require('gulp.spritesmith');

var _dev, _dev_js, _dev_css, _dev_images, _dev_plugins, _dev_fonts,
    _prod, _prod_plugins, _prod_js, _prod_css, _prod_images, _prod_fonts;
_dev = './dev/';
_dev_js = _dev + 'public/js';
_dev_css = _dev + 'public/css';
_dev_images = _dev + 'public/images';
_dev_plugins = _dev + 'public/plugins';
_dev_plugins = _dev + 'public/fonts';

_prod = './prod/';
_prod_js = _prod + 'public/js';
_prod_css = _prod + 'public/css';
_prod_images = _prod + 'public/images';
_prod_plugins = _prod + 'public/plugins';
_prod_fonts = _prod + 'public/fonts';


gulp.task('connect', function() {
    return connect.server({
        livereload: true
    });
});

gulp.task('copy-from-css', function() {

    return gulp.src([_dev_css + '/*.*','!' + _dev_css + '/*.css'])
        .pipe(gulp.dest(_prod_css));

});

gulp.task('minify-css', function() {
    return
        gulp.src(_dev_css + '/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(_prod_css));
});

gulp.task('minify-img', function() {
    return gulp.src(_dev_images + '/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(_prod_images))
});



gulp.task('copy-html-or-php', function() {
    gulp.src([_dev + '*.php'
            ,_dev + '*.html'
            ,_dev + '*.htaccess'
            ,_dev + '*.png'
        ])
        .pipe(gulp.dest(_prod));
});
gulp.task('copy-plugins', function() {
    gulp.src([
            _dev_plugins + '/**/*.*'
        ])
        .pipe(gulp.dest(_prod_plugins));
});

gulp.task('copy-fonts', function() {
    gulp.src([
            _dev_fonts + '/**/*.*'
        ])
        .pipe(gulp.dest(_prod_fonts));
});

gulp.task('js', function () {
    gulp.src(_dev_js + '/*.js')
        .pipe(jsmin())
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest(_prod_js));
});

gulp.task('sprites', function() {
    var spriteData =
        gulp.src(_dev_images + '/icons/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                padding: 10
            }));


    spriteData.img
        .pipe(gulp.dest(_prod_images + '/sprite')); // путь, куда сохраняем картинку
    spriteData.css
        .pipe(gulp.dest(_prod_css)); // путь, куда сохраняем стили
});

gulp.task('watch', function(){
    gulp.watch([_dev_js+'/*.js'], ['js']);
    gulp.watch([_dev_css + '/*.*'], ['minify-css','copy-from-css']);
    gulp.watch([_dev_images + '/images/*.*'], ['minify-img']);
    gulp.watch([_dev_images + '/images/icons/*.*'], ['sprites']);
    gulp.watch([_dev + '*.php'
        ,_dev + '*.html'
        ,_dev + '*.htaccess'
        ,_dev + '*.png'
    ], ['copy-html-or-php']);

    gulp.watch([
        _dev_plugins + '/**/*.*'
    ], ['copy-plugins']);

    gulp.watch([
        _dev_fonts + '/**/*.*'
    ], ['copy-fonts']);
    gulp.watch([
        _dev_images + '/**/*.*',
        _dev_css + '/*.css'

    ], ['sprites']);
});

gulp.task('default', ['connect'
                        , 'watch'
                        , 'copy-html-or-php'
                        , 'copy-plugins'
                        , 'copy-fonts'
                        , 'sprites'
                        , 'js'
                        , 'minify-img'
                        , 'copy-from-css'
                        , 'minify-css'
]);
