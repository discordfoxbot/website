var gulp = require('gulp'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    obfuscate = require('gulp-js-obfuscator'),
    uglify = require('gulp-uglify');

gulp.task('default', ['clean'], ()=> {
    gulp.start('scripts', 'stylesheets', 'copy');
});

gulp.task('dev', ['clean'], ()=> {
    gulp.start('scripts_dev', 'stylesheets', 'copy');
});

gulp.task('clean', function () {
    return del(['public/*']);
});

gulp.task('scripts', function () {
    return gulp.src('public_source/scripts/*.js')
        .pipe(uglify({
            compress: {
                sequences: false,
                conditionals: false
            }
        }))
        .pipe(obfuscate())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('scripts_dev',()=>{
    return gulp.src('public_source/scripts/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('stylesheets', function () {
    return gulp.src('public_source/stylesheets/*.css')
        .pipe(cleanCSS({debug: true, processImportFrom: ['!fonts.googleapis.com']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/stylesheets'));
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
