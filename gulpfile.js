import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

// Initialize gulp-sass with Dart Sass
const sass = gulpSass(dartSass);

// Define paths
const paths = {
  scss: './Resources/Public/Scss/*.scss',
  cssOutput: './Resources/Public/Css'
};

// Compile SCSS files to CSS
export function compileScss() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.cssOutput));
}

// Watch SCSS files for changes
export function watchScss() {
  gulp.watch(paths.scss, compileScss);
}

// Define the default task
export default gulp.series(compileScss, watchScss);
