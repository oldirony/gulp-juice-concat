var juice = require('./src/gulp-juice');
var gulp = require('gulp');


gulp.task('juice', function(){
  gulp.src(['./test/**/*.html'])
    .pipe(juice({}))
    .pipe(gulp.dest('./.build/bootloader'));
});
