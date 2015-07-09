# gulp-juice-concat
Pipe a list of Vinyl objects and get out some inline CSS

Check the Gulpfile included for an example.

Or, just look here:

```
var gulp = require('gulp');
var juice = require('gulp-juice-concat');

gulp.task('juice', function(){
  gulp.src(['./test/**/*.html', './test/**/*.css'])
    .pipe(juice({}))
    .pipe(gulp.dest('./.build'));
});
```

Easy as that. Pipe HTML and CSS files in, or just make sure something has concerted the files into CSS,
e.g. gulp-sass, and then it will inject it into an HTML file. It looks for the HTML comment <!-- juice.inject -->
as the placement point for the `<style>` tags. 

If you don't include one, it will still juice the HTML. So, no need to include external CSS files if you find
your dev workflow is better off without it.

I'd rather have a comment than just injecting it into the head because some people may prefer their emails don't
have all of the regular markup. So, just do it this way. Maybe in the future I'll change it

## Options

You can pass in any options you would pass into juice in the configuration of the plugin. There are no other options at this time.
