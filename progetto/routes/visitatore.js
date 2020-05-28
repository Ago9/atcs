var express = require('express');
var router = express.Router();
var visitatore = require("../controllers/visitatore.js");
var presentazione = require("../controllers/presentazione.js");

// trova visitatori
router.get("/", visitatore.findAll);

// trova il singolo visitatore per id
//    router.get("/:visitatoreId", visitatore.findOne);

router.post("/select", function(req, res){
    response = {
        visitor:req.body.visitors
    };
    
    var presentations = presentazione.findByUser(response['visitor']);
    console.log(presentations);
    res.end(JSON.stringify(presentations));
});

module.exports = router;