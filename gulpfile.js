var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');

gulp.task('browser-sync', function () {
	browserSync.init(null, {
		server: {
			baseDir: './'
		}
	})

	gulp.watch('./*.html', ['bs-reload']);
	gulp.watch(['./dist/**/*'], ['bs-reload']);
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
	browserSync.reload();
});


gulp.task('less', function () {
	return gulp.src('./src/less/style.less')
		.pipe(less())
		.pipe(gulp.dest('./dist/css/'))
});

gulp.task('default', ['browser-sync','less'],function(){
	gulp.watch(['src/less/*', 'src/less/**/*'], ['less']);
});
