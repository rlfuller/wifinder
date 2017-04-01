(function(){

  function reviewModalController($scope, $uibModalInstance, locationData){
    $scope.modal = {
      cancel: function(){
        $uibModalInstance.dismiss("cancel");
      }
    };
    $scope.locationData = locationData;
    console.log("tom", $scope);

    $scope.onSubmit = function(){
      //event.preventDefault();
      console.log("this form has been submitted");
      $scope.formError = "";
      if(!$scope.formData.name || !$scope.formData.rating || !$scope.formData.reviewText){
        $scope.formError = "All fields required, please try again";
        return false;
      } else {
        console.log($scope.formData);
        return false;
      }

    };
  }

  angular.module("wifinderApp").controller("reviewModalController", ["$scope", "$uibModalInstance", "locationData", reviewModalController]);
})();
