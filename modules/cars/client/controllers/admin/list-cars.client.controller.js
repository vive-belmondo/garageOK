// (function () {
//   'use strict';

//   angular
//     .module('cars.admin')
//     .controller('CarsAdminListController', CarsAdminListController);

//   CarsAdminListController.$inject = ['CarsService', 'MarksService', '$window', 'Notification'];

//   function CarsAdminListController(CarsService, MarksService, $window, Notification) {
//     var vm = this;
//     vm.remove = remove;


// 	vm.cars = CarsService.query();
//   vm.marks = MarksService.query();

//     // Remove existing Car
//     function remove(car) {
//       if ($window.confirm('Are you sure you want to delete?')) {
//         car.$remove(function() {
// 	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Car deleted successfully!' });
// 	        vm.cars.splice(vm.cars.indexOf(car),1);
//         });
//       }
//     }
//  }
// }());

(function () {
  'use strict';

  angular
    .module('cars.admin')
    .controller('CarsAdminListController', CarsAdminListController);

  CarsAdminListController.$inject = ['CarsService', 'MarksService', '$window', 'Notification', '$http'];

  function CarsAdminListController(CarsService, MarksService, $window, Notification, $http) {
    var vm = this;
    vm.remove = remove;
    vm.cars = CarsService.query();
    // vm.getCarsByMark = getCarsByMark;

    vm.marks = MarksService.query();
    vm.downloadPdf = downloadPdf;


    // Remove existing Car
    function remove(car) {
      if ($window.confirm('Are you sure you want to delete?')) {
        car.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Car deleted successfully!' });
          vm.cars.splice(vm.cars.indexOf(car),1);
        });
      }
    }

    // function getCarsByMark() {
    //   console.log(vm.marquetype);
    //   vm.cars = CarsByMarkService.query({ idMark: vm.marquetype });

    // }

 function downloadPdf(car) {

  $http.get('/api/cars/pdf/' + car._id)
     .then(function(response) {
      

        var path = response.data;
            path = path.slice(1);

        // var link = angular.element('<a></a>');

        // link.attr('href', path);
        // link.attr('download', 'car.pdf');
           // location.href = path;
        $window.open (path, '_blank');
        // link[0].click();

    });

  
 }

 }
}());
