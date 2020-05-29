var express = require('express');
var router = express.Router();
var visitatore = require("../controllers/visitatore.js");
var presentazione = require("../controllers/presentazione.js");
var posizione = require("../controllers/posizione.js");

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
// router.post("/select", visitatore.form);

router.post("/select", posizione.findByUser);
/* router.post("/select", function(req, res) {
    console.log(req.body.visitors);
    var prova = presentazione.findByUser(req.body.visitors);
    console.log(prova);
    res.write("PROVA");
    res.end();
    //res.write(presentazione.findByUser(req.body.visitors));
    //res.write(posizione.findByUser(req.body.visitors));
}); */

module.exports = router;