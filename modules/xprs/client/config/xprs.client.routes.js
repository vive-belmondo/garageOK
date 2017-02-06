(function () {
  'use strict';

  angular
    .module('xprs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('xprs', {
        abstract: true,
        url: '/xprs',
        template: '<ui-view/>'
      })
      .state('xprs.list', {
        url: '',
        templateUrl: '/modules/xprs/client/views/list-xprs.client.view.html',
        controller: 'XprsAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Xprs List'
        }
      })
      .state('xprs.pdf', {
        url: '',
        templateUrl: '/modules/xprs/client/views/html-pdf.xpr.client.view.html',
        controller: 'XprsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Xpr Pdf'
        }
      })
      .state('xprs.view', {
        url: '/:xprId',
        templateUrl: '/modules/xprs/client/views/view-xpr.client.view.html',
        controller: 'XprsController',
        controllerAs: 'vm',
        resolve: {
          xprResolve: getXpr
        },
        data: {
          pageTitle: 'Xpr {{ xprResolve.title }}'
        }
      });
  }

  getXpr.$inject = ['$stateParams', 'XprsService'];

  function getXpr($stateParams, XprsService) {
    return XprsService.get({
      xprId: $stateParams.xprId
    }).$promise;
  }
}());
