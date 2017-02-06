(function () {
  'use strict';

  angular
    .module('xprs')
    .controller('XprsListController', XprsListController);

  XprsListController.$inject = ['XprsService', 'MarksService'];

  function XprsListController(XprsService, MarksService) {
    var vm = this;

    vm.xprs = XprsService.query();
    vm.marks = MarksService.query();
  }
}());
