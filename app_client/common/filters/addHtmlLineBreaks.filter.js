(function(){
  function addHtmlLineBreaks(){
    return function(text){
      var output = text.replace(/\n/g, "<br/>");
      return output;
    };
  }
  angular.module("wifinderApp").filter("addHtmlLineBreaks", addHtmlLineBreaks);
})();
