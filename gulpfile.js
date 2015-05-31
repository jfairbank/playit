var gulp = require('gulp');
var babel = require('gulp-babel');

var SRC_FILES = __dirname + '/src/**/*.js';

gulp.task('compile', function() {
  gulp.src(SRC_FILES)
    .pipe(babel({
      optional: ['runtime'],
      stage: 0
    }))
    .pipe(gulp.dest('dist'));
});
