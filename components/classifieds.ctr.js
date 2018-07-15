(function() {

   "use strict";

   angular
      .module("ngClassifieds")
      .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav) {

         classifiedsFactory.getClassifieds().then(function(classifieds) {
             $scope.classifieds = classifieds.data;
         });  

         $scope.openSideBar = function() {
             $mdSidenav('left').open();
         }

         $scope.closeSideBar = function() {
             $mdSidenav('left').close();
         }

      });
})();