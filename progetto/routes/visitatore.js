var express = require('express');
var router = express.Router();
var visitatore = require("../controllers/visitatore.js");
var presentazione = require("../controllers/presentazione.js");

// trova visitatori
router.get("/", visitatore.findAll);

// trova il singolo visitatore per id
router.get("/:id", visitatore.findOne);


// commento momentaneamente per fare test
//router.post("/select", function(req, res){
//    response = {
//        visitor:req.body.visitors
//    };
//    
//    var presentations = presentazione.findByUser(response['visitor']);
//    console.log(presentations);
//    res.end(JSON.stringify(presentations));
//});

// gestisci la form di selezione del visitatore
router.post("/select", visitatore.form);


module.exports = router;