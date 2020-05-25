var api = require('./api/users');
var http = require('http');

//var res = api.getTimeSpent(199).then(time => console.log(time));
/* var ris = api.getPOIList(199).then(result => {
    for(let i = 0; i < result.length; i++) {
        console.log(result[i].id);
    }
}); */

var ris = api.getPresentationList(199).then(result => {
    for(let i = 0; i < result.length; i++) {
        console.log(result[i].nome);
    }
});


//var ris = api.getAverageTime().then(averageTime => console.log(averageTime));