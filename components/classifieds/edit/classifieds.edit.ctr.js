(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('editClassifiedsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

      var vm = this;

      vm.classifieds = classifiedsFactory.ref;
      vm.classified = vm.classifieds.$getRecord($state.params.id);
      vm.closeSidebar = closeSidebar;
      vm.saveEdit = saveEdit;

      vm.sidebarTitle = 'Edit Classifed';

      $timeout(function() {
        $mdSidenav('left').open();    
      });

      $scope.$watch('sidenavOpen', function(sidenavOpen) {
        if(sidenavOpen === false) {
          $mdSidenav('left')
            .close()
            .then(function() {
              $state.go('classifieds');
          });
        }
      });

      // Case 1 - close the sidenav and change state manually
      // function closeSidebar = function() {
      //   vm.classified = {};
      //   $mdSidenav('left')
      //     .close()
      //     .then(function() {
      //       $state.go('classifieds');
      //   });      
      // }

      // Case 2 - simply use the watcher to move state
      function closeSidebar() {
        vm.classified = {};
        $scope.sidenavOpen = false;        
      }

      function saveEdit() {
        vm.classifieds.$save(vm.classified).then(function() {
          $scope.sidenavOpen = false;
          $scope.$emit('editSaved', 'Edit Saved');
        });
      }

    });

})();