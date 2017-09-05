const gulp = require('gulp');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const jasmine = require('gulp-jasmine');

gulp.task('lint', () =>
  gulp.src(['./DECISION_MAKER/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('test-run', () =>
  gulp.src(['./DECISION_MAKER/**/*.spec.js'])
    .pipe(jasmine())
);

gulp.task('test', ['lint', 'test-run']);