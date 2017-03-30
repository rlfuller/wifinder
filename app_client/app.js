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


  function config($routeProvider, $locationProvider, $sceDelegateProvider){
    $routeProvider
        .when("/", {
          controller: "homeController",
          templateUrl: "home/home.view.html"
        })
        .when("/about",{
          templateUrl: "/common/views/genericText.view.html",
          controller: "aboutController"
        })
        .when("/location/:locationid",{
          templateUrl: "/locationDetail/locationDetail.view.html",
          controller: "locationDetailController"
        })
        .otherwise({redirectTo: "/"});

        $locationProvider.html5Mode(true).hashPrefix("");

        $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://maps.google.com/**']);
  };

  app.config(["$routeProvider", "$locationProvider", "$sceDelegateProvider",config]);

})();
