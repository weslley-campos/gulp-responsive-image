const gulp = require('gulp')
const webp = require('gulp-webp')
const clean = require('gulp-clean')
const rename = require('gulp-rename')
const resize = require('gulp-image-resize')
const sequence = require('gulp-run-sequence')
const parallel = require('concurrent-transform')
const os = require('os')

gulp.task('default', ['build'], function () {
    gulp.task('imageResize70', imagesResize(70, "_1366"))
    gulp.task('imageResize55', imagesResize(55, "_1024"))
    gulp.task('imageResize40', imagesResize(40, "_768"))
    gulp.task('imageResize25', imagesResize(25, "_460"))
})

gulp.task('build', function (callback) {
    return sequence('copy', 'webp-convert', 'rename-images',callback)
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

gulp.task('rename-images', function () {
    return gulp.src("SiteZeus/**/*.{png,jpg,webp}")
        .pipe(rename(function (path) {
            path.basename += "_1920"
        }))
        .pipe(gulp.dest("dist/SiteZeus"))
})

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
    return gulp.src("SiteZeus/**/*")
        .pipe(clean())
})