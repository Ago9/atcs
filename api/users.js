var con = require('./db');

exports.getTimeSpent = function (id) {
    let time;

    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM visitatore where id = '" + id + "'", function (err, result, fields) {
            if (err) reject(err);

            time = visitTime(result[0].inizio_visita, result[0].fine_visita);

            resolve(time);
        });
    });
}

exports.getPOIList = function (id) {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM posizione where user_id = '" + id + "'", function (err, result, fields) {
          if (err) reject(err);

          resolve(result);
    });
});
}

exports.getPresentationList = function (id) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM presentazione where id = '" + id + "'", function (err, result, fields) {
            if (err) reject(err);

            resolve(result);
        });
    });
}

exports.getAverageTime = function () {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM visitatore", function (err, result, fields) {
        if (err) reject(err);
        
        let totalTime = 0;
          
        for (let i = 0; i < result.length; i++) {
          totalTime += toMinutes(visitTime(result[i].inizio_visita, result[i].fine_visita));
        }

        let averageTime = toHours(parseInt(totalTime /  result.length));

        resolve(averageTime);
    });
});
}

//subtracts endtime - starttime, in order to get the time spent into the museum
function visitTime(i, f) {
    inizio = i.split(":");
    fine = f.split(":");
    
    ora = (fine[0] - inizio[0]);
    min = (fine[1] - inizio[1]);
  
    if (min < 0) {
        min += 60;
        min += (ora - 1) * 60;
    } 
    else {
        min += 60 * ora;
    }
  
    return toHours(min);
}
  
  //converts hour to minutes
function toMinutes(time) {
    hours = time.split(":");
  
    return parseInt(hours[0] * 60) + parseInt(hours[1]);
}
  
  //converts minutes to hours
function toHours(time) {
    hours   = parseInt(time / 60);
    minutes = time % 60;
  
    if (minutes < 10)
        minutes = "0" + minutes;
    
    return hours + ":" + minutes;  
}
  
  //count how many times "element" oocurs into "array"
function countOccurrence(array, element) {
    var count = 0;
  
    for (let i = 0; i < array.length; i++) {
        if (array[i].nome == element) {
          count++;
        }
    }
  
    return count;
}