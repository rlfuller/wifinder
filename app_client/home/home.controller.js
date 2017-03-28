(function() {
  var homeController = function($scope, wifinderData, geolocation){

    $scope.pageHeader = {
      title: "WIFInder",
      strapline: "Find places to work with wifi near you!"
    };

    $scope.sidebar = {
      content: "Looking for wifi and a seat? WIFInder helps you find places to work when out and about. Perhaps with coffee, food, or a beer? Let WIFInder help you find the place you are looking for."
    };

    $scope.message = "Checking your location";

    $scope.getData = function(position){
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      $scope.message = "Searching for nearby places";
      wifinderData.locationByCoords(lat, lng)
        .then(function(response){

          $scope.message = response.data.length > 0 ? "" : "No locations found nearby";

          $scope.data = response.data;  
        //  $scope.data = response.data;
        }, function(error){
          $scope.message = "Sorry, something's gone wrong";
        });
    };
    console.log("rachel", $scope);

    $scope.showError = function(error){
      $scope.$apply(function(){
        $scope.message = error.message;
      });
    };

    $scope.noGeo = function(){
      $scope.$apply(function(){
        $scope.message = "Geolocation is not supported by this browser.";
      });
    };
      geolocation.getPosition($scope.getData,$scope.showError, $scope.noGeo);

  };


  angular.module("wifinderApp")
    .controller("homeController", ["$scope", "wifinderData", "geolocation", homeController]);



}());
