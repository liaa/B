var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync',function(){
	browserSync.init(null, {
		server: {
			baseDir: './'
		}
	})

	gulp.watch('./*.html',['bs-reload']);
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync']);
