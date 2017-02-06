'use strict';

/**
 * Module dependencies
 */
var xprsPolicy = require('../policies/xprs.server.policy'),
  xprs = require('../controllers/xprs.server.controller');

module.exports = function (app) {
  // Xprs collection routes
  app.route('/api/xprs').all(xprsPolicy.isAllowed)
    .get(xprs.list)
    .post(xprs.create);

  app.route('/api/uploadXprPicture').all(xprsPolicy.isAllowed)
    .post(xprs.uploadXprPicture);


  app.route('/api/xprsByMark/:idMark').all(xprsPolicy.isAllowed)
    .get(xprs.listByMark);

  app.route('/api/xprsByMark').all(xprsPolicy.isAllowed)
    .get(xprs.list);

  // Single xpr routes

  app.route('/api/xprs/:xprId').all(xprsPolicy.isAllowed)
    .get(xprs.read)
    .put(xprs.update)
    .delete(xprs.delete);
  
  app.route('/api/xprs/pdf/:xprId').all(xprsPolicy.isAllowed)
    .get(xprs.generatePdf);

  // Finish by binding the xpr middleware
  app.param('xprId', xprs.xprByID);
};
