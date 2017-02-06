(function () {
  'use strict';

  angular
    .module('xprs.services')
    .factory('XprsByMarkService', XprsByMarkService);

  XprsByMarkService.$inject = ['$resource', '$log'];

  function XprsByMarkService($resource, $log) {
    return $resource('/api/xprsByMark/:idMark', {
      idMark: '@_id'
    });
  }
}());
