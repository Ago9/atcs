exports.countNameOccurrence = function(array, element) {
    var count = 0;
  
    for (let i = 0; i < array.length; i++) {
        if (array[i].nome == element) {
          count++;
        }
    }
  
    return count;
}

exports.countIdOccurrence = function(array, element) {
    var count = 0;
  
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == element) {
          count++;
        }
    }
  
    return count;
}

exports.visitTime = function(i, f) {
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
  
    return this.toHours(min);
}

  //converts minutes to hours
exports.toHours = function(time) {
    hours   = parseInt(time / 60);
    minutes = time % 60;
  
    if (minutes < 10)
        minutes = "0" + minutes;
    
    return hours + ":" + minutes;  
}

exports.toMinutes = function(time) {
    hours = time.split(":");
    
    return (parseInt(hours[0]) * 60) + parseInt(hours[1]); 
}