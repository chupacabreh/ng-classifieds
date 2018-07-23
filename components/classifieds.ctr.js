(function() {

   "use strict";

   angular
      .module("ngClassifieds")
      .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

         classifiedsFactory.getClassifieds().then(function(classifieds) {
             $scope.classifieds = classifieds.data;
             $scope.categories = getCategories($scope.classifieds);
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

         $scope.deleteClassified = function(event, classified) {
             var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete ' + classified.title + '?')
                .ok('Yes')
                .cancel('No')
                .targetEvent(event);
            $mdDialog.show(confirm).then(function() {
                var index = $scope.classifieds.indexOf(classified);
                $scope.classifieds.splice(index, 1);
            }, function() {
                
            }); 
         }

         function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000)
            );
         }

         function getCategories(classifieds) {
             var categories = [];

             angular.forEach(classifieds,function(item) {
                angular.forEach(item.categories, function(category){
                    categories.push(category);
                });
             });
             return _.uniq(categories);
         }

      });
})();