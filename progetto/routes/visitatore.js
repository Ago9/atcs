var express = require('express');
var router = express.Router();
var visitatore = require("../controllers/visitatore.js");

// trova visitatori
    router.get("/", visitatore.findAll);

// trova il singolo visitatore per id
    router.get("/:visitatoreId", visitatore.findOne);

module.exports = router;