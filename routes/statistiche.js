var express = require('express');
var router = express.Router();

/* GET general stats page. */
router.get('/', function(req, res, next) {
  res.render('generalStats', { title: "General Statistics of the Museum" });
});

module.exports = router;