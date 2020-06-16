const Area_museo = require("../models/area_museo.js");
const Visitatore = require("../models/visitatore.js");

exports.findAll = (req, res) => {
    Visitatore.findAll((err, data) => {
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving customers."
            });
        else 
          //res.send(data);
            res.render('area', { title: 'visitatori', visitatori: data})
        
    });
};

exports.findOne = (req, res) => {
    Area_museo.findById(req.body.visitors, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: 'Not found Customer with id '
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " 
          });
        }
      } else 
          res.render('mappa', {coordinate: data});
    });
  };


