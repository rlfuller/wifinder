(function() {
  function locationDetailController($scope, $routeParams, wifinderData){
    $scope.locationid = $routeParams.locationid;
    // $scope.pageHeader = {
    //   title: $scope.locationid
    // };

    wifinderData.locationById($scope.locationid)
      .then(function(response){
        $scope.response = {
          location: response.data
        };
        console.log($scope.response);
        $scope.pageHeader = {
          title: response.data.name
        };
        $scope.getIframeSrc = 'https://maps.google.com/maps?q=' + $scope.response.location.coords[1] + ',' + $scope.response.location.coords[0];// + '&output=embed" width="600" height="450" frameborder="0" style="border:0" allowfullscreen';
        console.log("heyha", $scope.getIframeSrc);

      }, function(error){
        console.log(error);
      });

  };

  angular.module("wifinderApp")
    .controller("locationDetailController", ["$scope", "$routeParams", "wifinderData", locationDetailController]);
})();
