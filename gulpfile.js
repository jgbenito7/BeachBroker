var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./assets/scss/villareal-turquoise.scss')
            .pipe(sass())
            .pipe(gulp.dest('./assets/css/'));
});

gulp.task('watch', function() {
	gulp.watch('./assets/scss/helpers/*.scss', ['sass']); 
    gulp.watch('./assets/scss/villareal-turquoise.scss', ['sass']);
});

gulp.task('compile', function() {
	gulp.src( './assets/scss/*.scss' )
		.pipe(sass())
		.pipe(gulp.dest('./assets/css/'));
});