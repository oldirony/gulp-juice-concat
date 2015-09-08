var juice = require('./src/gulp-juice');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpFilter = require('gulp-filter');

gulp.task('juice', function(){

  var sassFilter = gulpFilter('**/*.scss', {restore: true});

  gulp.src(['./test/**/*.{scss,html}'])
    .pipe(sassFilter)
    .pipe(sass().on('error', sass.logError))
    .pipe(sassFilter.restore)
    .pipe(juice({}))
    .pipe(gulp.dest('./build/bootloader'));
    
});
