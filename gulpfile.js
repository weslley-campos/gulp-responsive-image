const gulp = require('gulp')
    , webp = require('gulp-webp')
    , clean = require('gulp-clean')
    , rename = require('gulp-rename')
    , resize = require('gulp-image-resize')
    , sequence = require('gulp-run-sequence')
    , parallel = require('concurrent-transform')
    , os = require('os')

const suffix = ['_460', '_768', '_1024', '_1366','_1920']
    , srcFolder = 'SiteZeus'
    , destFolder = 'SiteZeus'

gulp.task('default', ['build'], function () {
    gulp.task('imageResize25', imagesResize(25, suffix[0]))
    gulp.task('imageResize40', imagesResize(40, suffix[1]))
    gulp.task('imageResize55', imagesResize(55, suffix[2]))
    gulp.task('imageResize70', imagesResize(70, suffix[3]))
    gulp.task('imageResize100', imagesResize(100, suffix[4]))
})

gulp.task('build', function (callback) {
    return sequence('clean','copy', 'webp-convert', callback)
})

function imagesResize(percent, sufixResolution) {
    gulp.src("SiteZeus/**/*.{png,jpg,webp}")
        .pipe(parallel(
            resize({
                percentage: percent
            }),
            os.cpus().length
        ))
        .pipe(rename(function (path) {
            path.basename += sufixResolution
        }))
        .pipe(gulp.dest("dist/SiteZeus"))
}

gulp.task('webp-convert', function () {
    return gulp.src('SiteZeus/**/*.{jpg,png}')
        .pipe(webp({ quality: 100 }))
        .pipe(gulp.dest('SiteZeus'))
})

gulp.task('copy', function () {
    return gulp.src("copy/**/*")
        .pipe(gulp.dest("."))
        .pipe(gulp.dest('dist'))
})

gulp.task('clean', function () {
    return gulp.src([
        'dist/SiteZeus/**/*'+ suffix[0] + '.{jpg,png,webp}',
        'dist/SiteZeus/**/*'+ suffix[1] + '.{jpg,png,webp}',
        'dist/SiteZeus/**/*'+ suffix[2] + '.{jpg,png,webp}',
        'dist/SiteZeus/**/*'+ suffix[3] + '.{jpg,png,webp}',
        'dist/SiteZeus/**/*'+ suffix[4] + '.{jpg,png,webp}'
    ])
    .pipe(clean())
})

// gulp.task('rename-images', function () {
//     return gulp.src("SiteZeus/**/*.{png,jpg,webp}")
//         .pipe(rename(function (path) {
//             path.basename += "_1920"
//         }))
//         .pipe(gulp.dest("dist/SiteZeus"))
// })
