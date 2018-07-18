(function() {

   "use strict";

   angular
      .module("ngClassifieds")
      .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast) {

         classifiedsFactory.getClassifieds().then(function(classifieds) {
             $scope.classifieds = classifieds.data;
         });  

         var contact = {
             name: "matt Freitas",
             phone: "(555) 555-5555",
             email: "matt@matttt.com"
         }

         $scope.openSideBar = function() {
             $mdSidenav('left').open();
         }

         $scope.closeSideBar = function() {
             $mdSidenav('left').close();
         }

         $scope.saveClassified = function(classified) {
             if(classified) {
                classified.contact = contact;
                $scope.classifieds.push(classified);
                $scope.classified = {};
                $scope.closeSideBar();
                showToast("Classified saved!");
             }
         }

         $scope.editClassified = function(classified) {
             $scope.editing = true; 
             $scope.openSideBar(); 
             $scope.classified = classified; 
         }

         $scope.saveEdit = function() {
             $scope.editing = false;
             $scope.classified = {};
             $scope.closeSideBar();
             showToast("Edited!");
         }

         function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000)
            );
         }

      });
})();