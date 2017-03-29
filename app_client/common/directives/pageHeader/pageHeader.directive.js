(function(){
  function pageHeader(){
    return {
      restrict: "EA",
      scope: {
        content: "=content"
      },
      templateUrl: "/common/directives/pageHeader/pageHeader.template.html"
    };
  }

  angular.module("wifinderApp").directive("pageHeader", pageHeader);
})();
