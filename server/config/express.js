var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'), 
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {

  mongoose.connect(config.db.uri); //connect to database

  var app = express(); //initialize app

  app.use(morgan('dev')); //enable request logging for development debugging

   
  app.use(bodyParser.json()); //body parsing middleware


  /* server wrapper around Google Maps API to get latitude + longitude coordinates from address */
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });

  /* use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter);

  /* serve static files: homepage */ 
  app.use('/js', express.static(__dirname + '/../../client/js'));
  app.use('/js/controllers',express.static(__dirname + '/../../client/js/controllers'));
  app.use('/js/factories', express.static(__dirname + '/../../client/js/factories'));
  app.use('/styles', express.static(__dirname + '/../../client/styles'));
  app.use('/*', express.static(__dirname + '/../../client'));



  return app;
};  