const Presentazione = require('../models/presentazione.js');


// pare che basta usare il req.body. nome che dai al form per farlo andare 
exports.findByUser = (req, res) => {
    Presentazione.findByUser(req.body.visitors, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving customers."
            });
        else 
           res.send(data);
          //res.render('statistiche', {presentazioni: data})
        
    });
}