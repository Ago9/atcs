var express = require('express');
var router = express.Router();
var statistiche = require("../controllers/statistiche.js")

/* GET general stats page. */
router.get('/', statistiche.generalStats);

module.exports = router;