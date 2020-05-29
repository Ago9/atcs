const Visitatore = require("../models/visitatore.js");

// trova tutti i visitatori nel db, manda il risultato alla vista visitatori.pug
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
// gestisce la pagina visitatore/id. (non utilizzato) lo lascio perchè può tornare utile
exports.findOne = (req, res) => {
    Visitatore.findById(req.params.id, (err, data) => {
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
          res.send(data);
    });
  };

// gestisce la select cercando il visitatore con l'id selezionato
exports.form = (req, res) => {
  Visitatore.findById(req.body.visitors, (err, data) => {
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
        res.send(data);
  });
};
