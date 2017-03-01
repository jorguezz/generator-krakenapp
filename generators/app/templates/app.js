// npm packages
const express = require('express'),
  bodyParser =  require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  compression = require('compression'),
  helmet = require('helmet'),
  subdomain = require('express-subdomain'),
  cors = require('cors');

// Export app domains
const api = require('./routes.js');

const app = express();

module.exports.init = function(appName){
  // Middlewares
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded( {extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(subdomain(appName, api));
  app.use(compression());
};

exports.app = app;

