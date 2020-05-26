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
            res.render('visitatori', { title: 'visitatori', visitatori: data})
        
    });
}

exports.findOne = (req, res) => {
    Visitatore.findById(req.params.visitatoreId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.visitatoreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.visitatoreId
          });
        }
      } else res.send(data);
    });
  };