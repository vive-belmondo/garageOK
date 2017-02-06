(function () {
  'use strict';

  angular
    .module('marks.admin')
    .controller('MarksAdminListController', MarksAdminListController);

  MarksAdminListController.$inject = ['MarksService', '$window', 'Notification'];

  function MarksAdminListController(MarksService, $window, Notification) {
    var vm = this;
    vm.remove = remove;


	vm.marks = MarksService.query();

    // Remove existing Mark
    function remove(mark) {
      if ($window.confirm('Are you sure you want to delete?')) {
        mark.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Mark deleted successfully!' });
	        vm.marks.splice(vm.marks.indexOf(mark),1);

        });
      }
    }
  }
}());
