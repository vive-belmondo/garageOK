'use strict';

/**
 * Module dependencies
 */
 var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Cars Permissions
 */
 exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/cars',
      permissions: '*'
    }, {
      resources: '/api/cars/:carId',
      permissions: '*'
    }, {
      resources: '/api/uploadCarPicture',
      permissions: '*'
    }, {
      resources: '/api/carsByMark/:idMark',
      permissions: '*'
    }, {
      resources: '/api/carsByMark',
      permissions: '*'
    },{
      resources: '/api/cars/pdf/:carId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/cars',
      permissions: ['get']
    }, {
      resources: '/api/cars/:carId',
      permissions: ['get']
    }, {
      resources: '/api/carsByMark/:idMark',
      permissions: ['get']
    }, {
      resources: '/api/carsByMark',
      permissions: ['get']
    },
    {
      resources: '/api/cars/pdf/:carId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/cars',
      permissions: ['get']
    }, {
      resources: '/api/cars/:carId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Cars Policy Allows
 */
 exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

    // If an car is being processed and the current user created it then allow any manipulation
    if (req.car && req.user && req.car.user && req.car.user.id === req.user.id) {
      return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
      if (err) {
            // An authorization error occurred
            return res.status(500).send('Unexpected authorization error');
          } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
              } else {
                return res.status(403).json({
                  message: 'User is not authorized'
                });
              }
            }
          });
  };