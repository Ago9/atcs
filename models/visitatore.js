const sql = require("./dbconnection");
var utils = require("./utils.js");

var Visitatore = function(visitatore){
    this.id = visitatore.id;
    this.gruppo = visitatore.gruppo;
    this.data = visitatore.data;
    this.ora_inzio = visitatore.ora_inzio;
    this.ora_fine = visitatore.ora_fine;
}

Visitatore.findById = (id, result) => {
    sql.query("SELECT * FROM visitatore where id = ?", [id], (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        if(res.length){
            console.log("visitatore trovato: ", res[0])
            res[0].visitTime = utils.visitTime(res[0].inizio_visita, res[0].fine_visita);
            result(null, res[0])
            return
        }
    });
};

Visitatore.findAll = result => {
    sql.query("SELECT * FROM visitatore", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        console.log("visitatori:", res);
        result(null, res);
    })
}

Visitatore.countPerHour = result => {
    sql.query("SELECT COUNT(id) as count, HOUR(inizio_visita) as ora FROM visitatore GROUP BY HOUR(inizio_visita) ORDER BY ora", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        result(null, res);
    })
}


module.exports = Visitatore;