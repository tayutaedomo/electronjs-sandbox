(function () {
  'use strict';

  var electron = require('electron');
  var remote = electron.remote;

  var template_base = './scripts';

  var app = angular.module('app', [
    'ngRoute'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: template_base + '/main.html' ,
      controller: 'MainController',
      controllerAs: '_ctrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
  }]);

  app.controller('MainController', ['$scope', MainController]);

  function MainController($scope) {
    this.openDialog = function() {
      remote.dialog.showMessageBox(function () {
      });
    };
  }

})();

