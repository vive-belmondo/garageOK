(function () {
  'use strict';

  angular
    .module('marks')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Marques',
      state: 'marks',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'marks', {
      title: 'Liste des Marques',
      state: 'marks.list',
      roles: ['*']
    });
  }
}());
