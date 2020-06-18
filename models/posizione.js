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
        result(null, res);
    })
}

Posizione.countPerHour = (result) => {
    sql.query("SELECT COUNT(id) as count, HOUR(inizio) as ora, id FROM posizione GROUP BY HOUR(inizio), id ORDER BY id", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Posizione.visitorsPerPoi = (result) => {
    sql.query("SELECT id, COUNT(id) as count, AVG((((HOUR(fine)*60)+MINUTE(fine))-((HOUR(inizio)*60)+MINUTE(inizio)))*60) as durata FROM posizione GROUP BY id ORDER BY id", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Posizione;