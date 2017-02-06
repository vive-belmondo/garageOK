(function () {
  'use strict';

  angular
    .module('xprs.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.xprs', {
        abstract: true,
        url: '/xprs',
        template: '<ui-view/>'
      })
      .state('admin.xprs.list', {
        url: '',
        templateUrl: '/modules/xprs/client/views/admin/list-xprs.client.view.html',
        controller: 'XprsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.xprs.create', {
        url: '/create',
        templateUrl: '/modules/xprs/client/views/admin/form-xpr.client.view.html',
        controller: 'XprsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          xprResolve: newXpr
        }
      })
      .state('admin.xprs.pdf', {
        url: '/generate',
        templateUrl: '/modules/xprs/client/views/html-pdf.xpr.client.view.html',
        controller: 'XprsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
      })
      .state('admin.xprs.edit', {
        url: '/:xprId/edit',
        templateUrl: '/modules/xprs/client/views/admin/form-xpr.client.view.html',
        controller: 'XprsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          xprResolve: getXpr
        }
      });
  }

  getXpr.$inject = ['$stateParams', 'XprsService'];

  function getXpr($stateParams, XprsService) {
    return XprsService.get({
      xprId: $stateParams.xprId
    }).$promise;
  }

  newXpr.$inject = ['XprsService'];

  function newXpr(XprsService) {
    return new XprsService();
  }
}());
