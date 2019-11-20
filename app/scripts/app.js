(function () {
  'use strict';

  var electron = require('electron');
  var remote = electron.remote;

  const Store = require('electron-store');

  var template_base = './scripts';

  var app = angular.module('app', [
    'ngRoute',
    'toaster',
    'ngAnimate'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: template_base + '/main.html' ,
      controller: 'MainController',
      controllerAs: '_ctrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
  }]);

  app.controller('MainController', MainController);

  function MainController($scope, $document, toaster) {
    const that = this;


    this.openDialog = function() {
      remote.dialog.showMessageBox(function () {
      });
    };

    toaster.pop('info', "title", "text");
    toaster.pop('success', "title", "text");
    toaster.pop('warning', "title", "text");
    toaster.pop('error', "title", "text");


    // getPath, getAppPath
    console.log('remote.app.getAppPath:',        remote.app.getAppPath());
    console.log('remote.app.getPath home:',      remote.app.getPath('home'));
    console.log('remote.app.getPath appData:',   remote.app.getPath('appData'));
    console.log('remote.app.getPath userData:',  remote.app.getPath('userData'));
    console.log('remote.app.getPath temp:',      remote.app.getPath('temp'));
    console.log('remote.app.getPath exe:',       remote.app.getPath('exe'));
    console.log('remote.app.getPath module:',    remote.app.getPath('module'));
    console.log('remote.app.getPath desktop:',   remote.app.getPath('desktop'));


    // electron-store
    this.store = new Store();


    this.execExtraResource = () => {
      const path = require('path');
      const lib_process = require('./lib/process');

      let adb_path = null;

      if (process.platform === 'win32') {
        adb_path = 'bin/platform-tools/win/adb.exe';
      } else if (process.platform === 'darwin') {
        adb_path = 'bin/platform-tools/darwin/adb';
      }

      if (! adb_path) return;

      if (remote.app.isPackaged) {
        adb_path = path.join(remote.app.getAppPath(), '..', 'app', adb_path);
      } else {
        adb_path = path.join(__dirname, adb_path);
      }

      const cmd = `"${adb_path}" devices`;

      lib_process.promise_exec(cmd).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    };


    // Local video file
    this.local_video_file = null;

    this.on_video_file_load = () => {
      if (! that.local_video_file) return;

      const video = document.querySelector('#video');
      video.src = `file://${that.local_video_file.path}`;
    };


    this.selected_dir = null;
  }

  MainController.$inject = ['$scope', '$document', 'toaster'];


  // Refer: https://stackoverflow.com/questions/17063000/ng-model-for-input-type-file-with-directive-demo
  app.directive('fileread', [function () {
    // return {
    //   scope: {
    //     fileread: "="
    //   },
    //   link: function (scope, element, attributes) {
    //     element.bind('change', function (changeEvent) {
    //       var reader = new FileReader();
    //       reader.onload = function(loadEvent) {
    //         scope.$apply(function () {
    //           scope.fileread = loadEvent.target.result;
    //         });
    //       };
    //       reader.readAsDataURL(changeEvent.target.files[0]);
    //     });
    //   }
    // }
    return {
      scope: {
        fileread: '='
      },
      link: function (scope, element, attributes) {
        element.bind('change', function (changeEvent) {
          scope.$apply(function () {
            scope.fileread = changeEvent.target.files[0];
            // or all selected files:
            // scope.fileread = changeEvent.target.files;
          });
        });
      }
    }
  }]);

  app.directive('dirread', [function () {
    return {
      scope: {
        dirread: '='
      },
      link: function (scope, element, attributes) {
        element.bind('change', function (changeEvent) {
          scope.$apply(function () {
            console.log('dirread', changeEvent.target.files[0]);
            scope.dirread = changeEvent.target.files[0];
          });
        });
      }
    }
  }]);
})();

