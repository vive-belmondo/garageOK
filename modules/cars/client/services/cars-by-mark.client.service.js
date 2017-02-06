(function () {
  'use strict';

  angular
    .module('cars.services')
    .factory('CarsByMarkService', CarsByMarkService);

  CarsByMarkService.$inject = ['$resource', '$log'];

  function CarsByMarkService($resource, $log) {
    return $resource('/api/carsByMark/:idMark', {
      idMark: '@_id'
    });
  }
}());
