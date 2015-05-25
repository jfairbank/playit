var gulp = require('gulp');
var babel = require('gulp-babel');

var SRC_FILES = __dirname + '/src/*.js';

gulp.task('compile', function() {
  gulp.src(SRC_FILES)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
