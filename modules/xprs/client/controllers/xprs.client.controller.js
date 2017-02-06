(function () {
  'use strict';

  angular
    .module('xprs')
    .controller('XprsController', XprsController);

  XprsController.$inject = ['$scope', 'xprResolve', 'Authentication'];

  function XprsController($scope, xpr, Authentication) {
    var vm = this;

    vm.xpr = xpr;
    vm.authentication = Authentication;

  }
}());
