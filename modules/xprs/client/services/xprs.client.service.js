(function () {
  'use strict';

  angular
    .module('xprs.services')
    .factory('XprsService', XprsService);

  XprsService.$inject = ['$resource', '$log'];

  function XprsService($resource, $log) {
    var Xpr = $resource('/api/xprs/:xprId', {
      xprId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Xpr.prototype, {
      createOrUpdate: function () {
        var xpr = this;
        return createOrUpdate(xpr);
      }
    });

    return Xpr;

    function createOrUpdate(xpr) {
      if (xpr._id) {
        return xpr.$update(onSuccess, onError);
      } else {
        return xpr.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(xpr) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
