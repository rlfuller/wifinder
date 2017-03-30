(function(){
  var app = angular.module("wifinderApp",["ngRoute", "ngSanitize"]);

  // app.config(["$routeProvider","$locationProvider", function($routeProvider, $locationProvider){
  //   $routeProvider
  //     .when("/", {
  //       controller: "homeController",
  //       templateUrl: "home/home.view.html"
  //     })
  //     .otherwise({redirectTo: "/"});
  //
  //     $locationProvider.html5Mode(true).hashPrefix("");
  // }]);


  function config($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
          controller: "homeController",
          templateUrl: "home/home.view.html"
        })
        .when("/about",{
          templateUrl: "/common/views/genericText.view.html",
          controller: "aboutController"
        })
        .otherwise({redirectTo: "/"});

        $locationProvider.html5Mode(true).hashPrefix("");
  };

  app.config(["$routeProvider", "$locationProvider", config]);

})();
