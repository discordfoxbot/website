var gulp = require('gulp'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    obfuscate = require('gulp-js-obfuscator'),
    babel = require('gulp-babel');
uglify = require('gulp-uglify');

gulp.task('default', ['clean'], ()=> {
    gulp.start('scripts', 'stylesheets', 'copy');
});

gulp.task('dev', ['clean'], ()=> {
    gulp.start('scripts_dev', 'stylesheets', 'copy');
});

gulp.task('clean', () => del(['public/*']));

gulp.task('scripts', () => gulp.src('public_source/scripts/*.js')
    .pipe(babel({presets: ['es2015'], ignore: ['./public_source/scripts/wow.js']}))
    .pipe(uglify({
        compress: {
            sequences: false,
            conditionals: false
        }
    }))
    .pipe(obfuscate())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/scripts')));

gulp.task('scripts_dev', ()=> {
    return gulp.src('public_source/scripts/*.js')
        .pipe(babel({presets: ['es2015'], ignore: ['./public_source/scripts/wow.js']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('stylesheets', () => gulp.src('public_source/stylesheets/*.css')
    .pipe(cleanCSS({debug: true, processImportFrom: ['remote','!fonts.googleapis.com']}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/stylesheets')));

gulp.task('copy', ['copy_fonts', 'copy_images']);

gulp.task('copy_fonts', ()=> {
    return gulp.src('public_source/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('copy_images', ()=> {
    return gulp.src('public_source/images/*')
        .pipe(gulp.dest('public/images'));
});
