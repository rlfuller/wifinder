(function() {
  function locationDetailController($scope, $routeParams, $uibModal, wifinderData){
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
        $scope.getIframeSrc = 'https://maps.google.com/maps?q=(' + $scope.response.location.coords[1] + ',' + $scope.response.location.coords[0] + ')&output=embed';// + '&output=embed" width="600" height="450" frameborder="0" style="border:0" allowfullscreen';
        //console.log("heyha", $scope.getIframeSrc);

      }, function(error){
        console.log(error);
      });

      $scope.popupReviewForm = function(){
        var modalInstance = $uibModal.open({
          templateUrl: "/reviewModal/reviewModal.view.html",
          controller: "reviewModalController",
          resolve: {
            locationData: function(){
              return {
                locationid: $scope.locationid,
                locationName: $scope.response.location.name
              };
            }
          }
        });

        modalInstance.result.then(function(response){
          //console.log(response);
          $scope.response.location.reviews.push(response.data);
        });
      };

  };

  angular.module("wifinderApp")
    .controller("locationDetailController", ["$scope", "$routeParams", "$uibModal", "wifinderData", locationDetailController]);
})();
