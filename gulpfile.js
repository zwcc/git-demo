'use strict'

var gulp =  require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

gulp.task('css',function () {
    gulp.src('src/css/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('js',function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('img',function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images/'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('html',function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('serve', function() {

    browserSync.init({
        server: "dist"
    });
    gulp.watch("src/css/*.less", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch('src/images/*.*', ['img']);
    gulp.watch("src/*.html", ['html']);
});