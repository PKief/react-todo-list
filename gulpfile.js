var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');

gulp.task('default', function() {  
//   gulp.watch('src/*.scss', ['sass']);
}); 

gulp.task("babel", function(){
    return gulp.src("src/jsx/*.jsx").
        pipe(babel({
            plugins: ['transform-react-jsx']
        }))
        .pipe(gulp.dest("src/js/"))        
});

gulp.task('sass', function () {
  gulp.src('src/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/css/'));    
});

gulp.task('watch_scss', function() {  
  gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('watch_babel', function() {
  gulp.watch('src/jsx/*.jsx', ['babel']);  
});

gulp.task('default', ['babel', 'watch_babel', 'sass', 'watch_scss']);