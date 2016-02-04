var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var gutil = require('gulp-util');
var sftp = require('gulp-sftp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');

var env = gutil.env.ENV;

var buildDir = "./build";  // 编译目标文件夹
var sftpConfig = {};

if(env == "release") {
  buildDir = "./dist";
  sftpConfig = {
    host: '',
    user: '',
    pass: '',
    port: 22,
    remotePath: "/usr/share/nginx/liaa.xyz/linki/",
    remotePlatform: "unix"
  }
}
gulp.task('copy', function () {
    gulp.src('./src/images/*')
        .pipe(gulp.dest(buildDir + '/images'));
    gulp.src('./src/*.html')
        .pipe(gulp.dest(buildDir));
})

gulp.task('sftp', function () {
  return gulp.src(['./dist/**'])
  .pipe(sftp(
    sftpConfig
  ))
  // you need to have some kind of stream after gulp-ftp to make sure it's flushed
  // this can be a gulp plugin, gulp.dest, or any kind of stream
  // here we use a passthrough stream
});

gulp.task('browser-sync', function () {
	browserSync.init(null, {
		server: {
			baseDir: buildDir
		}
	})
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('less', function () {
	return gulp.src('./src/less/style.less')
		.pipe(less())
		.pipe(gulp.dest(buildDir + "/css"));
});

gulp.task('default', [],function(){
  if(env == "dev") {
    gulp.run(['browser-sync','less', 'copy'], function(){
      gulp.watch(['src/less/*', 'src/less/**/*'], ['less']);
      gulp.watch('./src/*.html', ['copy', 'bs-reload']);
      gulp.watch(['./dist/**/*'], ['bs-reload']);
    }) ;
  }
  if(env == "release") {
    runSequence(['less', 'copy'], function(){
      runSequence(['sftp'])
    });
  }
});
