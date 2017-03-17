angular.module("wifinderApp", []);

var _isNumberic = function(n) {
  return !isNAN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function(){
  return function(distance){
      var numDistance, unit;

      numDistance = parseInt(distance,10).toFixed(2);
      numDistance = Number(numDistance / 1609.344).toFixed(2); //1609.344 meters in a mile
      unit = "mi";

      return numDistance + unit;
    }
  };

var ratingStars = function() {
  return {
    scope: {
      thisRating: "=rating"
    },
    templateUrl: "/angular/rating-stars.html"
  };
};

var locationListCtrl = function($scope, wifinderData){
  $scope.message = "Searching for nearby places ...";
  wifinderData
  .success(function(data){
    $scope.message = data.length > 0 ? "" : "No locations found";
    $scope.data = { locations: data };
  })
  .error(function(err){
    $scope.message = "Sorry, something's gone wrong";
  });
};

var wifinderData = function($http){
  return $http.get("/api/locations?lng=-80.8641380&lat=35.2189070");
};

angular
  .module("wifinderApp")
  .controller("locationListCtrl", locationListCtrl)
  .filter("formatDistance", formatDistance)
  .directive("ratingStars", ratingStars)
  .service("wifinderData", wifinderData);
