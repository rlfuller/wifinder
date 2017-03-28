(function(){
  function formatDistance(){
    return function(distance){
        var numDistance, unit;

        numDistance = parseInt(distance,10).toFixed(2);
        numDistance = Number(numDistance / 1609.344).toFixed(2); //1609.344 meters in a mile
        unit = "mi";

        return numDistance + unit;
      };
  };


  angular.module("wifinderApp").filter("formatDistance", formatDistance);
})();
