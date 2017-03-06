const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const puglint = require('gulp-pug-lint');

gulp.task('lint-scss', () => {
    return gulp
        .src('src/public/stylesheets/*.css')
        .pipe(gulpStylelint({
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});

gulp.task('pug', function () {
  return gulp
    .src('src/views/*.pug')
    .pipe(puglint({
      reporters: [{
        formatter: 'string',
        console: true
    }]
  }));
});

gulp.task('lint', ['lint-scss']);
gulp.task('pug', ['pug']);
