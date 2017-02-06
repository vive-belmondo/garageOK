'use strict';

/**
 * Module dependencies
 */
 var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Xprs Permissions
 */
 exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/xprs',
      permissions: '*'
    }, {
      resources: '/api/xprs/:xprId',
      permissions: '*'
    }, {
      resources: '/api/uploadXprPicture',
      permissions: '*'
    }, {
      resources: '/api/xprsByMark/:idMark',
      permissions: '*'
    }, {
      resources: '/api/xprsByMark',
      permissions: '*'
    },{
      resources: '/api/xprs/pdf/:xprId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/xprs',
      permissions: ['get']
    }, {
      resources: '/api/xprs/:xprId',
      permissions: ['get']
    }, {
      resources: '/api/xprsByMark/:idMark',
      permissions: ['get']
    }, {
      resources: '/api/xprsByMark',
      permissions: ['get']
    },
    {
      resources: '/api/xprs/pdf/:xprId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/xprs',
      permissions: ['get']
    }, {
      resources: '/api/xprs/:xprId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Xprs Policy Allows
 */
 exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

    // If an xpr is being processed and the current user created it then allow any manipulation
    if (req.xpr && req.user && req.xpr.user && req.xpr.user.id === req.user.id) {
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