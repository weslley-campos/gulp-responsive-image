const gulp = require('gulp')
    , webp = require('gulp-webp')
    , clean = require('gulp-clean')
    , rename = require('gulp-rename')
    , resize = require('gulp-image-resize')
    , sequence = require('gulp-run-sequence')
    , parallel = require('concurrent-transform')
    , os = require('os')

const suffix = ['_460', '_768', '_1024', '_1366','_1920']
    , folder = 'SiteZeus'

gulp.task('default', ['build'], function () {
    gulp.task('imageResize25', imagesResize(25, suffix[0]))
    gulp.task('imageResize40', imagesResize(40, suffix[1]))
    gulp.task('imageResize55', imagesResize(55, suffix[2]))
    gulp.task('imageResize70', imagesResize(70, suffix[3]))
    gulp.task('imageResize100', imagesResize(100, suffix[4]))
})

gulp.task('build', function (callback) {
    return sequence('clean', 'webp-convert', callback)
})

function imagesResize(percent, suffixResolution) {
    gulp.src(folder + "/**/*.{png,jpg,webp}")
        .pipe(parallel(
            resize({
                percentage: percent
            }),
            os.cpus().length
        ))
        .pipe(rename(function (path) {
            path.basename += suffixResolution
        }))
        .pipe(gulp.dest(folder))
}

gulp.task('webp-convert', function () {
    return gulp.src(folder + "/**/*.{jpg,png}")
        .pipe(webp({ quality: 100 }))
        .pipe(gulp.dest(folder))
})

gulp.task('clean', function () {
    return gulp.src([
        folder + "/**/*"+ suffix[0] + ".{jpg,png,webp}",
        folder + "/**/*"+ suffix[1] + ".{jpg,png,webp}",
        folder + "/**/*"+ suffix[2] + ".{jpg,png,webp}",
        folder + "/**/*"+ suffix[3] + ".{jpg,png,webp}",
        folder + "/**/*"+ suffix[4] + ".{jpg,png,webp}",
        folder + "/**/*.webp"
    ])
    .pipe(clean())
})