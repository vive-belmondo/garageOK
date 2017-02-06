// (function () {
//   'use strict';

//   angular
//     .module('xprs.admin')
//     .controller('XprsAdminListController', XprsAdminListController);

//   XprsAdminListController.$inject = ['XprsService', 'MarksService', '$window', 'Notification'];

//   function XprsAdminListController(XprsService, MarksService, $window, Notification) {
//     var vm = this;
//     vm.remove = remove;


// 	vm.xprs = XprsService.query();
//   vm.marks = MarksService.query();

//     // Remove existing Xpr
//     function remove(xpr) {
//       if ($window.confirm('Are you sure you want to delete?')) {
//         xpr.$remove(function() {
// 	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xpr deleted successfully!' });
// 	        vm.xprs.splice(vm.xprs.indexOf(xpr),1);
//         });
//       }
//     }
//  }
// }());

(function () {
  'use strict';

  angular
    .module('xprs.admin')
    .controller('XprsAdminListController', XprsAdminListController);

  XprsAdminListController.$inject = ['XprsService', 'MarksService', '$window', 'Notification', '$http'];

  function XprsAdminListController(XprsService, MarksService, $window, Notification, $http) {
    var vm = this;
    vm.remove = remove;
    vm.xprs = XprsService.query();
    // vm.getXprsByMark = getXprsByMark;

    vm.marks = MarksService.query();
    vm.downloadPdf = downloadPdf;


    // Remove existing Xpr
    function remove(xpr) {
      if ($window.confirm('Are you sure you want to delete?')) {
        xpr.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xpr deleted successfully!' });
          vm.xprs.splice(vm.xprs.indexOf(xpr),1);
        });
      }
    }

    // function getXprsByMark() {
    //   console.log(vm.marquetype);
    //   vm.xprs = XprsByMarkService.query({ idMark: vm.marquetype });

    // }

 function downloadPdf(xpr) {

  $http.get('/api/xprs/pdf/' + xpr._id)
     .then(function(response) {
      

        var path = response.data;
            path = path.slice(1);

        // var link = angular.element('<a></a>');

        // link.attr('href', path);
        // link.attr('download', 'xpr.pdf');
        location.href = path;

        // link[0].click();

    });

  
 }

 }
}());
