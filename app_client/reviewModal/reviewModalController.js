(function(){

  function reviewModalController($scope, $uibModalInstance, wifinderData, locationData){
    $scope.modal = {
      cancel: function(){
        $uibModalInstance.dismiss("cancel");
      },
      close: function(result){
        $uibModalInstance.close(result);
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
        $scope.doAddReview($scope.locationData.locationid, $scope.formData);
        return false;
      }

    };

    $scope.doAddReview = function(locationid, formData){
      wifinderData.addReviewById(locationid,{
        author: $scope.formData.name,
        rating: $scope.formData.rating,
        reviewText: $scope.formData.reviewText
      }).then(function(response){
        console.log("Success");
        $scope.modal.close(response);
      }, function(error){
        $scope.formError = "Your review has not been saved, try again.";
      });
      return false;
    };
  }

  angular.module("wifinderApp").controller("reviewModalController", ["$scope", "$uibModalInstance", "wifinderData", "locationData", reviewModalController]);
})();
