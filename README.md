# gulp-juice-concat
Pipe a list of Vinyl objects and get out some inline CSS

Check the Gulpfile included for an example.

Or, just look here:

```node
var gulp = require('gulp');
var juice = require('gulp-juice-concat');

gulp.task('juice', function(){
  gulp.src(['./test/**/*.html'])
    .pipe(juice({}))
    .pipe(gulp.dest('./.build'));
});
```

Additionally, the plugin can accept CSS files through the pipe. If a file is provided, it will be used before the plugin tries to look for it in the filesystem. This means you can pipe in virtual files that have been run through other gulp tasks, like so.

```node
var juice = require('gulp-juice');
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
```

## Important Changes

Previously you would enter in a CSS and HTML array and it detected the type based on the extension. This is no longer how it works. Now, you just enter the HTML array and it detects the styles you want by looking at the `<link>` and `<style>` tags in the HTML document provided. It resolves the path using the directory of the HTML as a base directory (maybe I will make it so this can be reconfigured) and reads those files and injects their CSS into the document.

This means there is no more inject tag

Easy as that. Pipe HTML files in and it will find the css you're looking for (or try at least).

If you're using a pre-processor, make sure the paths in the HTML files
have been updated before you pipe it into the juicer. This thing takes
CSS, not SCSS or LESS.

## Options

You can pass in any options you would pass into juice in the configuration of the plugin. There are no other options at this time.
