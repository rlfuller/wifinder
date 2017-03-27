(function(){
  var app = angular.module("wifinderApp",["ngRoute"]);

  app.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when("/", {
        controller: "homeController",
        templateUrl: "home/home.view.html"
      })
      .otherwise({redirectTo: "/"});

      $locationProvider.html5Mode(true).hashPrefix("");
  });

}());
