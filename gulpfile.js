const gulp = require('gulp')
const webp = require('gulp-webp')
const clean = require('gulp-clean')
const rename = require('gulp-rename')
const resize = require('gulp-image-resize')
const parallel = require('concurrent-transform')
const os = require('os')

gulp.task('default', ['rename'], function() {
    gulp.start('webp-convert')
    gulp.start('imageResize70')
    gulp.start('imageResize55')
    gulp.start('imageResize40')
    gulp.start('imageResize25')
})

gulp.task('imageResize70', imagesResize(70, "_1366"))
gulp.task('imageResize55', imagesResize(55, "_1024"))
gulp.task('imageResize40', imagesResize(40, "_768"))
gulp.task('imageResize25', imagesResize(25, "_460"))

function imagesResize(percent, sufixResolution) {
    gulp.src("SiteZeus/**/*.{png,jpg}")
        .pipe(parallel(
            resize({
                percentage : percent
            }),
            os.cpus().length
        ))
        .pipe(rename(function(path) {
            path.basename += sufixResolution
        }))
        .pipe(gulp.dest("SiteZeus"))
}

gulp.task('webp-convert', function () {
    return gulp.src('SiteZeus/**/*.{jpg,png}')
            .pipe(webp({ quality: 100 }))
            .pipe(gulp.dest('SiteZeus'))
})

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean())
})

gulp.task('rename', function() {
    return gulp.src("SiteZeus/**/*.{jpg, png}")
                .pipe(rename(function(path) {
                    path.basename += "_1080"
                }))
                .pipe(gulp.dest("SiteZeus"))
})