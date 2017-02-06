(function () {
  'use strict';

  angular
    .module('xprs')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'experiences',
      state: 'xprs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'xprs', {
      title: 'Liste des experiences',
      state: 'xprs.list',
      roles: ['*']
    });
  }
}());
