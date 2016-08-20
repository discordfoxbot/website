var gulp = require('gulp'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    //jsoneditor = require('gulp-json-editor'),
    //revAll = require('gulp-rev-all'),
    //jsonmerge = require('gulp-merge-json'),
    //jsonminify = require('gulp-jsonminify'),
    obfuscate = require('gulp-js-obfuscator'),
    uglify = require('gulp-uglify');

gulp.task('default', ['clean'], ()=> {
    gulp.start('scripts', 'stylesheets', 'copy');
});

gulp.task('clean', function () {
    return del(['public/*']);
});

gulp.task('scripts', function () {
    /*var rev = new revAll({
     replacer: function () {

     }
     });*/
    return gulp.src('public_source/scripts/*.js')
        .pipe(uglify({
            compress: {
                sequences: false,
                conditionals: false
            }
        }))
        .pipe(obfuscate())
        .pipe(rename({suffix: '.min'}))
        //.pipe(rev.revision())
        .pipe(gulp.dest('public/scripts'));
    /* .pipe(rev.manifestFile())
     .pipe(jsoneditor(function (json) {
     var keys = Object.keys(json);
     keys.forEach(function (key) {
     json[key] = '/assets/js/' + json[key];
     });
     return json;
     }))
     .pipe(gulp.dest('assets/paths/js'));*/
});

gulp.task('stylesheets', function () {
    //var rev = new revAll();
    return gulp.src('public_source/stylesheets/*.css')
        .pipe(cleanCSS({debug: true}))
        .pipe(rename({suffix: '.min'}))
        //.pipe(rev.revision())
        .pipe(gulp.dest('public/stylesheets'));
    /*.pipe(rev.manifestFile())
     .pipe(jsoneditor(function (json) {
     var keys = Object.keys(json);
     keys.forEach(function (key) {
     json[key] = '/assets/css/' + json[key];
     });
     return json;
     }))
     .pipe(gulp.dest('assets/paths/css'));*/
});

gulp.task('copy', ['copy_fonts', 'copy_images']);

gulp.task('copy_fonts', ()=> {
    return gulp.src('public_source/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('copy_images', ()=> {
    return gulp.src('public_source/images/*')
        .pipe(gulp.dest('public/images'));
});
