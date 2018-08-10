const gulp = require('gulp')
const webp = require('gulp-webp')
const rename = require('gulp-rename')
const resize = require('gulp-image-resize')
const parallel = require('concurrent-transform')
const os = require('os')

gulp.task('default', function() {

})

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
    gulp.src('SiteZeus/**/*.{jpg,png}')
        .pipe(webp({ quality: 100 }))
        .pipe(gulp.dest('dist'))
})
