(function() {
var ratingStars = function() {
  return {
    restrict: 'EA',
    scope: {
      thisRating: "=rating"
    },
    templateUrl: "/common/directives/ratingStars/rating-stars.html"
  };
};


angular.module("wifinderApp").directive("ratingStars", ratingStars);
})();
