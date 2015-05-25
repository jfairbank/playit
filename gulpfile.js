var gulp = require('gulp');
var babel = require('gulp-babel');

var SRC_FILES = [
  './src/client-compile.js',
  './src/server.js',
  './src/ws-client-template.js'
];

gulp.task('compile', function() {
  gulp.src(SRC_FILES)
    .pipe(babel({
      optional: ['runtime']
    }))
    .pipe(gulp.dest('dist'));
});
