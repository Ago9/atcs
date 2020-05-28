const sql = require('./dbconnection');

var Presentazione = function Presentazione(presentazione) {
    this.id = presentazione.id;
    this.nome = presentazione.nome;
    this.inizio = presentazione.inizio;
    this.fine = presentazione.fine;
}

Presentazione.findByUser = (id, result) => {
    sql.query("SELECT * FROM presentazione where id = '" + id + "'", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        //console.log("Presentations:", res);
        result(null, res);
    })
}

module.exports = Presentazione;