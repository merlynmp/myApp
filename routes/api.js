var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/prices/:stock/:multiply/:time/:from/:to", function(req, res) {

  res.json({ 

    stocksTicker: req.params.stock,
    multiplier: req.params.multiply,
    timespan: req.params.time,
    from: req.params.from,
    to: req.params.to
  });
});

module.exports = router;
