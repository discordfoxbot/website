var gulp = require('gulp'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    obfuscate = require('gulp-js-obfuscator'),
    babel = require('gulp-babel'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify');

gulp.task('default', ['scripts', 'stylesheets', 'copy']);

gulp.task('dev', ['scripts_dev', 'stylesheets', 'copy']);

gulp.task('clean', ()=>del['public/*']);

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
    .pipe(rev())
    .pipe(gulp.dest('public/scripts'))
    .pipe(rev.manifest('public/rev-manifest.json', {
        merge: true, transformer: {
            parse: JSON.parse,
            stringify: (object)=> {
                var k = Object.keys(object);
                for (var i of k) {
                    if (!object[i].endsWith('.css'))object[i] = `/public/scripts/${object[i]}`
                }
                return JSON.stringify(object);
            }
        }
    }))
    .pipe(gulp.dest('')));

gulp.task('scripts_dev', ()=> {
    return gulp.src('public_source/scripts/*.js')
        .pipe(babel({presets: ['es2015'], ignore: ['./public_source/scripts/wow.js']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(rev())
        .pipe(gulp.dest('public/scripts'))
        .pipe(rev.manifest('public/rev-manifest.json', {
            merge: true, transformer: {
                parse: JSON.parse,
                stringify: (object)=> {
                    var k = Object.keys(object);
                    for (var i of  k) {
                        if (!object[i].endsWith('.css')) object[i] = `/public/scripts/${object[i]}`
                    }
                    return JSON.stringify(object);
                }
            }
        }))
        .pipe(gulp.dest(''));
});

gulp.task('stylesheets', () => gulp.src('public_source/stylesheets/*.css')
    .pipe(cleanCSS({debug: true, processImportFrom: ['remote', '!fonts.googleapis.com']}))
    .pipe(rename({suffix: '.min'}))
    .pipe(rev())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(rev.manifest('public/rev-manifest.json', {
        merge: true, transformer: {
            parse: JSON.parse,
            stringify: (object)=> {
                var k = Object.keys(object);
                for (var i of  k) {
                    if (!object[i].endsWith('.js'))object[i] = `/public/stylesheets/${object[i]}`
                }
                return JSON.stringify(object);
            }
        }
    }))
    .pipe(gulp.dest('')));

gulp.task('copy', ['copy_fonts', 'copy_images']);

gulp.task('copy_fonts', ()=> {
    return gulp.src('public_source/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('copy_images', ()=> gulp.src('public_source/images/*')
    .pipe(gulp.dest('public/images')));