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
  Car = mongoose.model('Car'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  handlebars = require('handlebars');
  


////////////// CREATE A CAR WITH UPLOAD IMAGE //////////////

exports.uploadCarPicture = function(req, res) {
  var car = req.car;
  var existingImageUrl;

// Filtering to upload only images
  var multerConfig = config.uploads.carFile.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newCarPicture');


  
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
        var path = config.uploads.carFile.image.dest + req.file.filename;
        path = path.slice(1);
        res.json(path);
      }
    });
  }
};

//envoi des données de create a car
exports.create = function(req, res) {
  var car = new Car(req.body);
  car.car = req.car;

  car.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};



////////////// SHOW CURRENT CAR //////////////

exports.read = function(req, res) {
  // convert mongoose document to JSON
  var car = req.car ? req.car.toJSON() : {};

  // Add a custom field to the Car, for determining if the current car is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Car model.
  car.isCurrentcarOwner = !!(req.car && car.car && car.car._id.toString() === req.car._id.toString());

  res.json(car);
};



////////////// UPDATE A CAR ////////////////////
exports.update = function(req, res) {
  var car = req.car;
  
  if (req.car.image !== req.body.image) {
    fs.unlink('.' + car.image, function(unlinkError){
      if(unlinkError){
        console.log(unlinkError);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(unlinkError)
        });
      }
    });
  }

  car.marque = req.body.marque;
  car.modele = req.body.modele;
  car.puissance = req.body.puissance;
  car.energie = req.body.energie;
  car.prix = req.body.prix;
  car.image = req.body.image; //config.uploads.carFile.image.dest + req.file.filename;

  car.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });  
};




////////////// DELETE A CAR ////////////////////
exports.delete = function (req, res) {
  var car = req.car;


  car.remove(function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      fs.unlink('.' + car.image, function(unlinkError){
        if(unlinkError){
          console.log(unlinkError);
          return res.status(422).send({
            message: errorHandler.getErrorMessage(unlinkError)
          });
        } else { 
          res.json(car);
        }
      });
    }
  });
};





////////////// LIST OF CARS ////////////////////
exports.list = function (req, res) {
  Car.find().sort('-created').populate('marque').exec(function (err, cars) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log(cars);
      res.json(cars);
    }
  });
};
////////////////////////// LIST OF MARK ////////////////// 
exports.listByMark = function (req, res) {
  console.log('pass');
  Car.find({ marque: req.params.idMark }).sort('modele').populate('marque').exec(function (err, cars) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log(cars);
      res.json(cars);
    }
  });
};


////////////// CAR MIDDLEWARE ////////////////////
exports.carByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Car is invalid'
    });
  }

  Car.findById(id).populate('user', 'displayName').populate('marque').exec(function (err, car) {
    
    if (err) {
      return next(err);
    } else if (!car) {
      return res.status(404).send({
        message: 'No car with that identifier has been found'
      });
    }
    req.car = car;
    next();
  });
};
//////////////////////////GENERER UN PDF///////////////////////////

exports.generatePdf = function(req, res){
  var car = req.car;

  var html = fs.readFileSync('./modules/cars/server/views/html-pdf.car.server.view.html', 'utf8');

  var template = handlebars.compile(html);

  var result = template(car);

  pdf.create(result).toFile('./modules/cars/client/pdf/' + car._id + '.pdf', function(error, result) {
    if (error) return console.log(error);
    res.json('./modules/cars/client/pdf/' + car._id + '.pdf');
  });

 

};