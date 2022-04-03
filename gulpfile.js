var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    beeper = require('beeper'),
    notifier = require('node-notifier'),
    cleanCSS = require('gulp-clean-css');

gulp.task('SassCompile', function () {
    return gulp.src(['Sass/index.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', function (err) {
            console.log(`-----------------------------------------------------------------`);
            console.log(err.message);
            console.log(`-----------------------------------------------------------------`);
            beeper();

            notifier.notify(
                {
                    title: 'Sass Error Compiling',
                    message: `Error in File : ${err.relativePath} \nError in Line : ${err.line} , Column : ${err.column} `,
                    sound: false,
                    wait: false,
                    timeout: 1
                },
                function (err, response) {
                    // Response is response from notification
                }
            );
            this.emit('end');
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});

////////////////////////////////////////////////////////////////////
gulp.task('minifycss', function () {
    return gulp.src(['css/vendor/*.css','css/index.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('CSS/minifiedStyles'));
});
//////////////////////////////////////////////////////////////////
gulp.task('minifyJs', function () { 
    return gulp.src(['js/vendor/*.js' , 'js/main.js'])
     .pipe(concat('scripts.min.js'))
     .pipe(uglify()) 
     .pipe(gulp.dest('js/MinifiedJs'));
}); 
////////////////////////////////////////////////////////////

gulp.task('watch', function () {
    gulp.watch(['sass/*.scss','js/*.js'], 
    gulp.series(['SassCompile','minifycss','minifyJs']));
});