(function () {
  'use strict';

  // Configuring the Xprs Admin module
  angular
    .module('xprs.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Xprs',
      state: 'admin.xprs.list'
    });
  }
}());
