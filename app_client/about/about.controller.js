(function(){
  function aboutController($scope){
    $scope.pageHeader = {
      title: "About WIFInder"
    };
    $scope.main = {
      content: "WIFInder was created to help people find places to sit and get work done. \n\nLorem ipsum dolor sit amet, dicant perfecto scripserit eu sit, Omnis dicunt ex per, probatus disputando philosophia pro an, sit cu velit virtute. Eam ad saepe vidisse feugiat, his te delicata torquatos, detracto electram sapientem ne vix mea sale concludaturque ex, in vis perfecto repudiandae. "

    };
  }

  angular.module("wifinderApp").controller("aboutController", ["$scope", aboutController]);


})();
