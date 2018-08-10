const gulp = require('gulp')
const webp = require('gulp-webp')
const clean = require('gulp-clean')
const rename = require('gulp-rename')
const resize = require('gulp-image-resize')
const parallel = require('concurrent-transform')
const os = require('os')

gulp.task('default', ['clean'], function() {
    gulp.start('webp-convert')
    gulp.start('imageResize85')
    gulp.start('imageResize65')
    gulp.start('imageResize50')
    gulp.start('imageResize30')
})

gulp.task('imageResize85', imagesResize(85, "-1366"))
gulp.task('imageResize65', imagesResize(65, "-1024"))
gulp.task('imageResize50', imagesResize(50, "-768"))
gulp.task('imageResize30', imagesResize(30, "-460"))

function imagesResize(percent, sufixResolution) {
    gulp.src('SiteZeus/**/*.{png,jpg}')
        .pipe(parallel(
            resize({
                percentage : percent
            }),
            os.cpus().length
        ))
        .pipe(rename(function(path) {
            path.basename += sufixResolution
        }))
        .pipe(gulp.dest('dist'))
}

gulp.task('webp-convert', function () {
    return gulp.src('SiteZeus/**/*.{jpg,png}')
            .pipe(webp({ quality: 100 }))
            .pipe(gulp.dest('dist'))
})

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean())
})
