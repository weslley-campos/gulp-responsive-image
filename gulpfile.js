const gulp = require('gulp')
const webp = require('gulp-webp')
const rename = require('gulp-rename')
const resize = require('gulp-image-resize')
const parallel = require('concurrent-transform')
const os = require('os')

gulp.task('default', function() {

})

gulp.task('webp-convert', function () {
    gulp.src('SiteZeus/**/*.{jpg,png}')
        .pipe(webp({ quality: 100 }))
        .pipe(gulp.dest('dist'))
})