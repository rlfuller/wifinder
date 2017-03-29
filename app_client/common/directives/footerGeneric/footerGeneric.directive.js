(function(){
  function footerGeneric() {
    return {
      restrict: "EA",
      templateUrl: "/common/directives/footerGeneric/footerGeneric.template.html"
    };
  }

  angular.module("wifinderApp").directive("footerGeneric", footerGeneric);
})();
