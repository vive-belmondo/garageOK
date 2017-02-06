'use strict';

/**
 * Module dependencies
 */
var carsPolicy = require('../policies/cars.server.policy'),
  cars = require('../controllers/cars.server.controller');

module.exports = function (app) {
  // Cars collection routes
  app.route('/api/cars').all(carsPolicy.isAllowed)
    .get(cars.list)
    .post(cars.create);

  app.route('/api/uploadCarPicture').all(carsPolicy.isAllowed)
    .post(cars.uploadCarPicture);


  app.route('/api/carsByMark/:idMark').all(carsPolicy.isAllowed)
    .get(cars.listByMark);

  app.route('/api/carsByMark').all(carsPolicy.isAllowed)
    .get(cars.list);

  // Single car routes

  app.route('/api/cars/:carId').all(carsPolicy.isAllowed)
    .get(cars.read)
    .put(cars.update)
    .delete(cars.delete);
  
  app.route('/api/cars/pdf/:carId').all(carsPolicy.isAllowed)
    .get(cars.generatePdf);

  // Finish by binding the car middleware
  app.param('carId', cars.carByID);
};
