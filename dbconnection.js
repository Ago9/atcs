var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "atcs"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("connected!");
    var sql = "SELECT distinct * FROM atcs.visitatore where id<=200";
    con.query(sql, function(err ,result, field){
        if(err) throw err;
        var visita = result;

    
    });
});




