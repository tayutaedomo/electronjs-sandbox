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
  }
  MainController.$inject = ['$scope', 'toaster'];

})();

