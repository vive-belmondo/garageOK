(function () {
  'use strict';

  angular
    .module('cars')
    .controller('CarsListController', CarsListController);

  CarsListController.$inject = ['CarsService', 'MarksService'];

  function CarsListController(CarsService, MarksService) {
    var vm = this;

    vm.cars = CarsService.query();
    vm.marks = MarksService.query();
  }
}());
