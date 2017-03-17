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
  $scope.data = { locations: wifinderData };
};

var wifinderData = function(){
  return[
      {
        name: "Burger King",
        address: "125 High Street, Reading, RG6 1PS",
        rating: 3,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        distance: "889.296456",
        _id: "44"
      },
      {
        name: "Costy",
        address: "126 High Street, Reading, RG6 1PS",
        rating: 5,
        facilities: ["Hot drinks", "Food", "Alcoholic drinks"],
        distance: "123.7865456",
        _id: "45"
      }
  ];
};

angular
  .module("wifinderApp")
  .controller("locationListCtrl", locationListCtrl)
  .filter("formatDistance", formatDistance)
  .directive("ratingStars", ratingStars)
  .service("wifinderData", wifinderData);
