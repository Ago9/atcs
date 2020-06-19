var Presentazione = require("../models/presentazione.js");
var Posizione = require("../models/posizione.js");
var Visitatore = require("../models/visitatore.js");
var Area_museo = require("../models/area_museo.js")
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
        },
        visitatore: function(callback){
            Visitatore.findById(req.body.visitors, (err,data) => {
                if(err)
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while retrieving customers."
                }); 
                else
                    callback(null, data);
            });
        },
        coordinate: function(callback){
            Area_museo.findById(req.body.visitors, (err, data) => {
                if (err) {
                    res.status(500).send({
                      message: "Error retrieving Customer with id " 
                    });
                  }else
                        callback(null,data);
            })
        }
    }, function(err, results){
        if(err) return err;

        else
            res.render('statistiche', { visitatori: results.visitatore, posizioni: results.posizione, presentazioni: results.presentazione, coordinate: results.coordinate})

    });
}

exports.generalStats = function(req, res){
    
    async.parallel({
        visitatoriPerHour: function(callback){
            Visitatore.countPerHour((err, data) => {
                if(err)
                    res.status(500).send({
                        message: 
                            err.message || "Some error occurred while retrieving customers."
                    }); 
                else
                    callback(null, data);
            });
        
        },
        visitatoriPerRoomPerHour: function(callback){
            Posizione.countPerRoomPerHour((err, data) => {
                if(err)
                    res.status(500).send({
                        message: 
                            err.message || "Some error occurred while retrieving customers."
                    }); 
                else
                    callback(null, data);
            });
        
        },
        posizionePerHour: function(callback){
            Posizione.countPerHour((err,data) => {
                if(err)
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while retrieving customers."
                }); 
                else
                    callback(null, data);
            });
        },
        visitorsPerPoi: function(callback){
            Posizione.visitorsPerPoi((err,data) => {
                if(err)
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while retrieving customers."
                }); 
                else
                    callback(null, data);
            });
        },
        /*visitatore: function(callback){
            Visitatore.findById(req.body.visitors, (err,data) => {
                if(err)
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while retrieving customers."
                }); 
                else
                    callback(null, data);
            });
        }*/
    }, function(err, results){
        if(err) return err;

        else {
            const poiPerHour = results.posizionePerHour.reduce((objectsByKeyValue, obj) => {
                const value = obj['id'];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
              }, {});
              const visitorsPerPoi = results.visitorsPerPoi.reduce((objectsByKeyValue, obj) => {
                const value = obj['id'];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
              }, {});
              res.render('generalStats', { title: "General Statistics of the Museum", countPerHour: results.visitatoriPerHour, visitorsPerPoi: visitorsPerPoi, posizionePerHour: poiPerHour, countPerRoomPerHour: results.visitatoriPerRoomPerHour});

        }

        
    });
}