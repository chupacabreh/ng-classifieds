(function() {

   "use strict";

   angular
      .module("ngClassifieds")
      .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

         var vm = this;

         vm.openSideBar = openSideBar;
         vm.closeSideBar = closeSideBar;
         vm.saveClassified = saveClassified;
         vm.editClassified = editClassified;
         vm.saveClassified = saveClassified;
         vm.deleteClassified = deleteClassified;

         vm.classifieds;
         vm.categories;
         vm.editing;
         vm.classified;

         classifiedsFactory.getClassifieds().then(function(classifieds) {
             vm.classifieds = classifieds.data;
             vm.categories = getCategories(vm.classifieds);
         });  

         var contact = {
             name: "matt Freitas",
             phone: "(555) 555-5555",
             email: "matt@matttt.com"
         }

         function openSideBar() {
             $mdSidenav('left').open();
         }

         function closeSideBar() {
             $mdSidenav('left').close();
         }

         function saveClassified(classified) {
             if(classified) {
                classified.contact = contact;
                $scope.classifieds.push(classified);
                $scope.classified = {};
                $scope.closeSideBar();
                showToast("Classified saved!");
             }
         }

         function editClassified(classified) {
             vm.editing = true; 
             openSideBar(); 
             vm.classified = classified; 
         }

         function saveEdit() {
             vm.editing = false;
             vm.classified = {};
             closeSideBar();
             showToast("Edited!");
         }

         function deleteClassified(event, classified) {
             var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete ' + classified.title + '?')
                .ok('Yes')
                .cancel('No')
                .targetEvent(event);
            $mdDialog.show(confirm).then(function() {
                var index = $scope.classifieds.indexOf(classified);
                vm.classifieds.splice(index, 1);
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