(function() {

    "use strict";
  
    angular
      .module('ngClassifieds')
      .factory('classifiedsFactory', function($http, $firebaseArray) {
  
        var ref = new Firebase('https://ng-classifieds-27b5e.firebaseio.com/');
  
        return {
          ref: $firebaseArray(ref)
        }
        
      });
      
})();