(function (app) {
  'use strict';

  app.registerModule('xprs', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('xprs.admin', ['core.admin']);
  app.registerModule('xprs.admin.routes', ['core.admin.routes']);
  app.registerModule('xprs.services');
  app.registerModule('xprs.routes', ['ui.router', 'core.routes', 'xprs.services']);
}(ApplicationConfiguration));
