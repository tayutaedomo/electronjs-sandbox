(function () {
  'use strict';

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
  }

})();

