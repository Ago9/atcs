var express = require('express');
var router = express.Router();
var area = require("../controllers/area_museo")



router.get('/', area.findAll);

router.post("/select", area.findOne);

module.exports = router;