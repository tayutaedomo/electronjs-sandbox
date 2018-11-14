'use strict';

var gulp = require('gulp');
var packager = require('electron-packager');


gulp.task('package:darwin', function(done) {
  packager({
    dir: '.',                 // Directory of Application
    out: 'release/darwin',    // Directory of .app or .exe
    name: 'Electron',
    arch: 'x64',              // x64 or ia32
    platform: 'darwin',       // darwin or win32 or linux
    version: '3.0.9',         // Electron version
    overwrite: true
  }, function (err, path) {
    done();
  });
});

