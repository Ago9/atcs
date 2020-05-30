var Presentazione = require("../models/presentazione.js");
var Posizione = require("../models/posizione.js");
var async = require("async");

exports.stasts = function(req, res){

    async.parallel({
        posizione: function(callback){
            Posizione.findByUser(req.body.visitors, (err,data) => {
                if(err)
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while retrieving customers."
                }); 
                else
                    callback(null, data);
            });
        },
        presentazione: function(callback){
            Presentazione.findByUser(req.body.visitors, (err,data) => {
                if(err)
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while retrieving customers."
                }); 
                else
                    callback(null, data);
        });
    }
    }, function(err, results){
        if(err) return err;

        else
            res.render('statistiche', { posizioni: results.posizione, presentazioni: results.presentazione})

    });
}


