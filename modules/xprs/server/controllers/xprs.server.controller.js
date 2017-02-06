'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  pdf = require('html-pdf'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Xpr = mongoose.model('Xpr'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  handlebars = require('handlebars');
  


////////////// CREATE A CAR WITH UPLOAD IMAGE //////////////

exports.uploadXprPicture = function(req, res) {
  var xpr = req.xpr;
  var existingImageUrl;

// Filtering to upload only images
  var multerConfig = config.uploads.xprFile.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newXprPicture');


  
  uploadImage()
    
//upload image
  function uploadImage () {
    upload(req, res, function(uploadError) {

      if (uploadError) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(uploadError)
        });
      }
      else {
        var path = config.uploads.xprFile.image.dest + req.file.filename;
        path = path.slice(1);
        res.json(path);
      }
    });
  }
};

//envoi des données de create a xpr
exports.create = function(req, res) {
  var xpr = new Xpr(req.body);
  xpr.xpr = req.xpr;

  xpr.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(xpr);
    }
  });
};



////////////// SHOW CURRENT CAR //////////////

exports.read = function(req, res) {
  // convert mongoose document to JSON
  var xpr = req.xpr ? req.xpr.toJSON() : {};

  // Add a custom field to the Xpr, for determining if the current xpr is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Xpr model.
  xpr.isCurrentxprOwner = !!(req.xpr && xpr.xpr && xpr.xpr._id.toString() === req.xpr._id.toString());

  res.json(xpr);
};



////////////// UPDATE A CAR ////////////////////
exports.update = function(req, res) {
  var xpr = req.xpr;
  
  // if (req.xpr.image !== req.body.image) {
  //   fs.unlink('.' + xpr.image, function(unlinkError){
  //     if(unlinkError){
  //       console.log(unlinkError);
  //       return res.status(422).send({
  //         message: errorHandler.getErrorMessage(unlinkError)
  //       });
  //     }
  //   });
  // }

  xpr.marque = req.body.marque;
  xpr.modele = req.body.modele;
  xpr.puissance = req.body.puissance;
  xpr.energie = req.body.energie;
  xpr.prix = req.body.prix;
  // xpr.image = req.body.image; //config.uploads.xprFile.image.dest + req.file.filename;

  xpr.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(xpr);
    }
  });  
};




////////////// DELETE A CAR ////////////////////
exports.delete = function (req, res) {
  var xpr = req.xpr;


  xpr.remove(function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      fs.unlink('.' + xpr.image, function(unlinkError){
        if(unlinkError){
          console.log(unlinkError);
          return res.status(422).send({
            message: errorHandler.getErrorMessage(unlinkError)
          });
        } else { 
          res.json(xpr);
        }
      });
    }
  });
};





////////////// LIST OF CARS ////////////////////
exports.list = function (req, res) {
  Xpr.find().sort('-created').populate('marque').exec(function (err, xprs) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log(xprs);
      res.json(xprs);
    }
  });
};
////////////////////////// LIST OF MARK ////////////////// 
exports.listByMark = function (req, res) {
  console.log('pass');
  Xpr.find({ marque: req.params.idMark }).sort('modele').populate('marque').exec(function (err, xprs) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log(xprs);
      res.json(xprs);
    }
  });
};


////////////// CAR MIDDLEWARE ////////////////////
exports.xprByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Xpr is invalid'
    });
  }

  Xpr.findById(id).populate('user', 'displayName').populate('marque').exec(function (err, xpr) {
    
    if (err) {
      return next(err);
    } else if (!xpr) {
      return res.status(404).send({
        message: 'No xpr with that identifier has been found'
      });
    }
    req.xpr = xpr;
    next();
  });
};
//////////////////////////GENERER UN PDF///////////////////////////

exports.generatePdf = function(req, res){
  var xpr = req.xpr;

  var html = fs.readFileSync('./modules/xprs/server/views/html-pdf.xpr.server.view.html', 'utf8');

  var template = handlebars.compile(html);

  var result = template(xpr);

  pdf.create(result).toFile('./modules/xprs/client/pdf/html-pdf.xpr.server.view.pdf', function(err, res) {
    if (err) return console.log(err);
  });

 res.json('./modules/xprs/client/pdf/html-pdf.xpr.server.view.pdf');

};