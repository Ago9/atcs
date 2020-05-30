const sql = require('./dbconnection');

var Posizione = function Posizione(posizione) {
    this.id = posizione.id;
    this.user_id = posizione.user_id;
    this.inizio = posizione.inizio;
    this.fine = posizione.fine;
}

Posizione.findByUser = (id, result) => {
    sql.query("SELECT * FROM posizione where user_id = '" + id + "'", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        //console.log("Presentations:", res);
        result(null, res);
    })
}

module.exports = Posizione;