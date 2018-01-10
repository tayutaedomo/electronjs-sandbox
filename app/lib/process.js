'use strict';

var child_process = require('child_process');
var Promise = require('bluebird');


function promise_exec(cmd, opts) {
  opts || (opts = {});

  opts.maxBuffer = 1024 * 1024 * 512; // 512MB

  return new Promise(function(resolve, reject) {
    var child = child_process.exec(cmd, opts, function(err, stdout, stderr) {
      if (err) reject(err);
      else resolve({ stdout: stdout, stderr: stderr });
    });

    if (opts.stdout) {
      child.stdout.pipe(opts.stdout);
    }

    if (opts.stderr) {
      child.stderr.pipe(opts.stderr);
    }
  });
}


module.exports = {
  promise_exec: promise_exec
};

