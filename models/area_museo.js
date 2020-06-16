const sql = require('./dbconnection');

var Area_museo = function Area_museo(area){
    this.id = area.id;
    this.nome = area.nome;
    this.x = area.x;
    this.y = area.y;
}

Area_museo.findById = (id, result)  => {
    sql.query("SELECT user_id, nome, x, y FROM area_museo join posizione where nome = posizione.id && user_id = ?", [id], (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Area_museo.findAll = result => {
    sql.query("SELECT * FROM area_museo", (err, res) => {
        if(err){
            console.log("error:", err)
            result(err, null);
            return;
        }

        console.log("aree:", res);
        result(null, res);
    })
}

module.exports = Area_museo;