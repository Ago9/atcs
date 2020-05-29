const Presentazione = require('../models/presentazione.js');

exports.findByUser = (req, res) => {
    console.log(req.params.id);
    Presentazione.findByUser(req.body.visitors, (err, data) => {
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