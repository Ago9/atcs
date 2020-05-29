const Posizione = require('../models/posizione.js');

exports.findByUser = (req, res) => {
    Posizione.findByUser(req.body.visitors, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving customers."
            });
        else 
          res.send(data);
          //  res.render('presentazioni', { title: 'presentazioni', visitatori: data})
        
    });
}