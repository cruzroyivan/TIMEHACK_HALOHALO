const express    = require('express');
const router = express.Router();
const path = require('path');
var LoginController = require(path.resolve('routes/controller/LoginController'))

router.get('/', function(req, res, next) {
  res.json(LoginController.execute);
});

module.exports = router;
