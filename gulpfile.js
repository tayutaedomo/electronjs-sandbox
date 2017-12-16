'use strict';

var gulp = require('gulp');
var packager = require('electron-packager');


gulp.task('package:darwin', [], function (done) {
  packager({
    dir: 'app',               // Directory of Application
    out: 'release/darwin',    // Directory of .app or .exe
    name: 'Electron',
    arch: 'x64',              // x64 or ia32
    platform: 'darwin',       // darwin or win32 or linux
    version: '1.7.9'          // Electron version
  }, function (err, path) {
    done();
  });
});

