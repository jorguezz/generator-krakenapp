const express = require('express');

const common = require('../common/routes.js');
const auth = require('../common/auth.js');

const api = express.Router();


api.route('/').get(function(req, res) {
  res.status(200).json({ message: 'api example started!'});
});

api.use(common);

module.exports = api;
