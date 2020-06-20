const sql = require("./dbconnection");
var utils = require("./utils.js");

var Visitatore = function(visitatore){
    this.id = visitatore.id;
    this.gruppo = visitatore.gruppo;
    this.data = visitatore.data;
    this.inizio_visita = visitatore.inizio_visita;
    this.fine_visita = visitatore.fine_visita;
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
    sql.query("SELECT  distinct vis.id FROM visitatore as vis join posizione on vis.id=user_id", (err, res) => {
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
    sql.query("select count(*) as count, ora from (SELECT distinct user_id, hour(inizio) as ora FROM posizione order by ora) as x group by ora", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        result(null, res);
    })
}


Visitatore.getAverageTime = result => {
    sql.query("select * from visitatore", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }
        
        var averagetime = 0;

        for(let i = 0; i < res.length; i++) {
            averagetime += parseInt(utils.toMinutes(utils.visitTime(res[i].inizio_visita, res[i].fine_visita)));
        }
        
        res[0].average = utils.toHours(parseInt(averagetime / res.length));
        result(null, res[0]);
    }) 
}


module.exports = Visitatore;