(function () {
  'use strict';

  var electron = require('electron');
  var remote = electron.remote;

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

  function MainController($scope, toaster) {
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
  }
  MainController.$inject = ['$scope', 'toaster'];

})();

