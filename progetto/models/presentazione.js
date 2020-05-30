const sql = require('./dbconnection');
var utils = require("./utils.js");

var Presentazione = function Presentazione(presentazione) {
    this.id = presentazione.id;
    this.nome = presentazione.nome;
    this.inizio = presentazione.inizio;
    this.fine = presentazione.fine;
}

Presentazione.findByUser = (id, result) => {
    sql.query("SELECT DISTINCT * FROM presentazione where id = '" + id + "'", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        let present = {};
        let ris = {};

        for (let i = 0; i < res.length; i++) {
            if (!present[res[i].nome]) {
                var count = utils.countOccurrence(res, res[i].nome) - 1;

                if (count > 0)
                    res[i].paused = "paused " + count + " times";
                present[res[i].nome] = true;
                ris[i] = res[i];
            }
        }
        //console.log("Presentations:", res);
        result(null, ris);
    })
}

module.exports = Presentazione;