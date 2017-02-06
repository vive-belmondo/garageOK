(function () {
  'use strict';

  // Configuring the Marks Admin module
  angular
    .module('marks.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Marks',
      state: 'admin.marks.list'
    });
  }
}());
