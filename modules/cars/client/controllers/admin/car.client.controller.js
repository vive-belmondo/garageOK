(function () {
  'use strict';

  angular
    .module('cars.admin')
    .controller('CarsAdminController', CarsAdminController);

  CarsAdminController.$inject = ['$timeout','CarsService', 'MarksService', '$scope', '$state', '$window', 'carResolve', 'Authentication', 'Notification', 'Upload'];

  function CarsAdminController($timeout, CarsService, MarksService, $scope, $state, $window, car, Authentication, Notification, Upload) {
    var vm = this;

    vm.car = car;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.marks = MarksService.query();
    vm.progress = 0;


   

/////// Called after the user has failed to upload a new picture
    function onErrorItem(response) {
      vm.fileSelected = false;
      vm.progress = 0;

      //---- Show error message
      Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change car picture' });
    }
     

///////////// REMOVE EXISTING CAR /////////////
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.car.$remove(function() {
          $state.go('admin.cars.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Car deleted successfully!' });
        });
      }
    }


/////////////// SAVE CAR //////////////
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.carForm');
        return false;
      }
      if (vm.fileSelected){
        Upload.upload({
          url: '/api/uploadCarPicture',
          data: {
            newCarPicture: vm.image
          }
        }).then(function (response) {
          $timeout(function () {
            onSuccessItem(response.data);
          });
        }, function (response) {
          if (response.status > 0) onErrorItem(response.data);
        }, function (evt) {
          vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
        });

        function onSuccessItem(cheminImage) {
          vm.car.image = cheminImage;
          vm.car.createOrUpdate()
            .then(successCallback)
            .catch(errorCallback);
        }
        function onErrorItem(response) {
          vm.fileSelected = false;
          vm.progress = 0;
          //---- Show error message
          Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change car picture' });
        }
      }
      else {
        console.log(vm.car);
        vm.car.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);
      }

      //----- Create a new car, or update the current instance
      function successCallback(res) {
        $state.go('admin.cars.list'); // should we send the car to the list or the updated Car's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Car saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Car save error!' });
      }
    }
  }




}());
