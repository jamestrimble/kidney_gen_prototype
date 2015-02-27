'use strict';

var kidneyApp = angular.module("kidneyApp", [
  "ngRoute",
  "kidneyControllers"
]);

kidneyApp.config(["$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/generator", {
        templateUrl: "partials/generator.html",
        controller: "GeneratorCtrl"
      })
      .when("/analyser", {
        templateUrl: "partials/analyser.html",
        controller: "AnalyserCtrl"
      })
      .when("/converter", {
        templateUrl: "partials/converter.html",
        controller: "ConverterCtrl"
      })
      .otherwise({redirectTo: "/generator"})
}]);
