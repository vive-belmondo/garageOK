(function () {
  'use strict';

  angular
    .module('marks.admin')
    .controller('MarksAdminController', MarksAdminController);

  MarksAdminController.$inject = ['$scope', '$state', '$window', 'markResolve', 'Authentication', 'Notification'];

  function MarksAdminController($scope, $state, $window, mark, Authentication, Notification) {
    var vm = this;

    vm.mark = mark;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing Mark
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.mark.$remove(function() {
          $state.go('admin.marks.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Mark deleted successfully!' });
        });
      }
    }


    // Save Mark
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.markForm');
        return false;
      }

      // Create a new mark, or update the current instance
      vm.mark.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.marks.list'); // should we send the User to the list or the updated Mark's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Mark saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Mark save error!' });
      }
    }
  }
}());
