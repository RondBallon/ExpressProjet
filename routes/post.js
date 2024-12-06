var express = require('express');
var router = express.Router();

// GET method route
router.get('/post', function (req, res) {
    res.send('GET posts try');
  });
  
  // POST method route
router.post('/post', function (req, res) {
    res.send('POST posts try');
  });
  
  module.exports = router;