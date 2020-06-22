const sql = require('./dbconnection');
var utils = require("./utils.js");

var Presentazione = function Presentazione(presentazione) {
    this.id = presentazione.id;
    this.nome = presentazione.nome;
    this.inizio = presentazione.inizio;
    this.fine = presentazione.fine;
}

Presentazione.getAverage = (result) => {
    sql.query("SELECT * from presentazione", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        let watchedByUser = {};
        let present = {};
        let duplicates = {};
        
        for (let i = 0; i < res.length; i++) {
            
            if (present[res[i].id]) {
                if (!duplicates[res[i].nome]) {
                    watchedByUser[res[i].id]++
                    duplicates[res[i].nome] = true;
                }
            }
            else {
                present[res[i].id] = true;
                watchedByUser[res[i].id] = 0;
                duplicates = {};
            }
        }

        let sum = 0;

        Object.keys(watchedByUser).forEach(function (key) {
            sum += watchedByUser[key];
        });

        let average = Math.round(sum/Object.keys(watchedByUser).length);

        result(null, average);
    })
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
                var count = utils.countNameOccurrence(res, res[i].nome) - 1;

                if (count > 0)
                    res[i].paused = "paused " + count + " time(s)";
                present[res[i].nome] = true;
                ris[i] = res[i];
            }
        }
        //console.log("Presentations:", res);
        result(null, ris);
    })
}

module.exports = Presentazione;