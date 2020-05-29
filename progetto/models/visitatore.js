const sql = require("./dbconnection");

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
            console.log("visitatore trovato: ", res[0]);
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

module.exports = Visitatore;