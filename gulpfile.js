/**
 * Created by fed on 2016/10/26.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src('./app.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
});