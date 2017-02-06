(function () {
  'use strict';

  angular
    .module('xprs.admin')
    .controller('XprsAdminController', XprsAdminController);

  XprsAdminController.$inject = ['$timeout','XprsService', 'MarksService', '$scope', '$state', '$window', 'xprResolve', 'Authentication', 'Notification', 'Upload'];

  function XprsAdminController($timeout, XprsService, MarksService, $scope, $state, $window, xpr, Authentication, Notification, Upload) {
    var vm = this;

    vm.xpr = xpr;
    vm.authentication = Authentication;
    vm.form = {};
    // vm.remove = remove;
    // vm.save = save;
    vm.addNewChoice = addNewChoice;
    vm.removeChoice = removeChoice;
    vm.marks = MarksService.query();
    vm.progress = 0;


   

/////// Called after the user has failed to upload a new picture
    // function onErrorItem(response) {
    //   vm.fileSelected = false;
    //   vm.progress = 0;

    //   //---- Show error message
    //   Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change xpr picture' });
    // }
     

///////////// REMOVE EXISTING Xperience /////////////
    // function remove() {
    //   if ($window.confirm('Are you sure you want to delete?')) {
    //     vm.xpr.$remove(function() {
    //       $state.go('admin.xprs.list');
    //       Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xpr deleted successfully!' });
    //     });
    //   }
    // }


/////////////// SAVE Xperience //////////////
    // function save(isValid) {
    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'vm.form.xprForm');
    //     return false;
    //   }
    //   if (vm.fileSelected){
    //     Upload.upload({
    //       url: '/api/uploadXprPicture',
    //       data: {
    //         newXprPicture: vm.image
    //       }
    //     }).then(function (response) {
    //       $timeout(function () {
    //         onSuccessItem(response.data);
    //       });
    //     }, function (response) {
    //       if (response.status > 0) onErrorItem(response.data);
    //     }, function (evt) {
    //       vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
    //     });

    //     function onSuccessItem(cheminImage) {
    //       vm.xpr.image = cheminImage;
    //       vm.xpr.createOrUpdate()
    //         .then(successCallback)
    //         .catch(errorCallback);
    //     }
    //     function onErrorItem(response) {
    //       vm.fileSelected = false;
    //       vm.progress = 0;
    //       //---- Show error message
    //       Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change xpr picture' });
    //     }
    //   }
    //   else {

    //     vm.xpr.createOrUpdate()
    //       .then(successCallback)
    //       .catch(errorCallback);
    //   }

    //   //----- Create a new xpr, or update the current instance
    //   function successCallback(res) {
    //     $state.go('admin.xprs.list'); // should we send the xpr to the list or the updated Xpr's view?
    //     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xpr saved successfully!' });
    //   }

    //   function errorCallback(res) {
    //     Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Xpr save error!' });
    //   }
    // }
    function addNewChoice() {
    var newItemNo = vm.xprs.length+1;
    vm.xprs.push({'id':'xpr'+newItemNo});
  };
    
  function removeChoice() {
    var lastItem = vm.xprs.length-1;
    vm.xprs.splice(lastItem);
  };
  }

////////////////////// MULTI FORM (fonction pour ajouter une expérience) //////////////////////////


  
  




   // var fields = [{name:'hobby 1', val:''}];  
   // //va contenir toutes les valeurs de notre formulaire
   // $scope.formData = {};
   // $scope.formData.dynamicFields = fields;
   // $scope.SentValues;
   
   // //fonction pour ajouter un champ hobby
   // // nous ajoutons à notre objet formDatadynamicFields un nouvel objet
   // $scope.addField=function(){
     
   //   var newItemNum = $scope.formData.dynamicFields.length+1;
   //   $scope.formData.dynamicFields.push( {name: 'Hobby '+newItemNum, val: ''});        
       
   // }


}());
