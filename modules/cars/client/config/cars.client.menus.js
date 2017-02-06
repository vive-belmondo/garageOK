(function () {
  'use strict';

  angular
    .module('cars')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Voiture',
      state: 'cars',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'cars', {
      title: 'Liste des voitures',
      state: 'cars.list',
      roles: ['*']
    });
  }
}());
