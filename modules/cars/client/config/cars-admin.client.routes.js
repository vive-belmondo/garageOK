﻿(function () {
  'use strict';

  angular
    .module('cars.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.cars', {
        abstract: true,
        url: '/cars',
        template: '<ui-view/>'
      })
      .state('admin.cars.list', {
        url: '',
        templateUrl: '/modules/cars/client/views/admin/list-cars.client.view.html',
        controller: 'CarsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.cars.create', {
        url: '/create',
        templateUrl: '/modules/cars/client/views/admin/form-car.client.view.html',
        controller: 'CarsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          carResolve: newCar
        }
      })
      .state('admin.cars.pdf', {
        url: '/generate',
        templateUrl: '/modules/cars/client/views/html-pdf.car.client.view.html',
        controller: 'CarsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
      })
      .state('admin.cars.edit', {
        url: '/:carId/edit',
        templateUrl: '/modules/cars/client/views/admin/form-car.client.view.html',
        controller: 'CarsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          carResolve: getCar
        }
      });
  }

  getCar.$inject = ['$stateParams', 'CarsService'];

  function getCar($stateParams, CarsService) {
    return CarsService.get({
      carId: $stateParams.carId
    }).$promise;
  }

  newCar.$inject = ['CarsService'];

  function newCar(CarsService) {
    return new CarsService();
  }
}());
