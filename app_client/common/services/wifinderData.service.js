(function() {
  var wifinderData = function($http){

    var locationByCoords = function(lat, lng){
      return $http.get("/api/locations?lng=" + lng + "&lat=" + lat);
      //return $http.get("/api/locations?lng=-80.8641380&lat=35.2189070)";
    };

    return {
      locationByCoords: locationByCoords
    };

  };

  //wifinderData.$inject = ["$http"];

  //angular.module("wifinderApp")
  //  .service("wifinderData", wifinderData);
  angular.module("wifinderApp").service("wifinderData", ["$http", wifinderData]);
}());
