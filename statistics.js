
// dummy data for test
var visitor = [
	{"id":"1", "group":"1","group_size":"2","data":"17/03/11","start_time":"12:26", "end_time": "13:15"},
	{"id":"2", "group":"1","group_size":"2","data":"17/03/11","start_time":"12:26", "end_time": "13:15"},
	{"id":"3", "group":"2","group_size":"1","data":"17/03/11","start_time":"13:45", "end_time": "14:40"},
	{"id":"4", "group":"3","group_size":"1","data":"17/03/11","start_time":"14:20", "end_time": "15:14"},
	{"id":"5", "group":"4","group_size":"2","data":"17/03/11","start_time":"14:45", "end_time": "15:20"},
	{"id":"6", "group":"4","group_size":"2","data":"17/03/11","start_time":"14:45", "end_time": "15:20"},
	{"id":"7", "group":"5","group_size":"1","data":"17/03/11","start_time":"12:26", "end_time": "13:53"},
	{"id":"8", "group":"6","group_size":"1","data":"18/03/11","start_time":"12:00", "end_time": "13:53"},
	{"id":"9", "group":"6","group_size":"1","data":"18/03/11","start_time":"12:00", "end_time": "13:53"},
	{"id":"10", "group":"7","group_size":"1","data":"18/03/11","start_time":"14:05", "end_time": "14:58"},
	];

// count the total number of group
var groupCount = d3.nest()
	.key(function(d){ return d.group; })
	.rollup(function(v){ return v.length; })
	.entries(visitor);

// calculate the visit duration for a group
var visitDuration = visitor.map(function(d){
	return {
		group: d.id,
		durata: durata(d.start_time,d.end_time)
	};
});

// count the total number of visitors
var visitorCount = d3.nest()
	.key(function(d){ return d.id; })
	.rollup(function(v){ return v.length; })
	.entries(visitor);

// count the number of visitors for each date in db
var visitorPerData = d3.nest()
	.key(function(d){ return d.data; })
	.rollup(function(v){ return v.length; }) 
	.entries(visitor);

// count the total number of groups for each data
var groupPerData = d3.nest()
	.key(function(d){return d.data; })
	.key(function(d){return d.group; })
	.rollup(function(v){ return v.length; })
    .entries(visitor);
    
// count the total number of visitors for each hour
var visitorPerHour = d3.nest()
	.key(function(d){ return d.start_time.split(":",1); })
	.rollup(function(v){ return v.length; })
	.object(visitor);

// calculate the visit duration
function durata(i,f){
	inizio = i.split(":");
	fine = f.split(":");
	ora = (fine[0]-inizio[0]);
	min = (fine[1]-inizio[1]);

	if (min < 0){
		min += 60;
		min += (ora-1)*60;
	} else {
		min += 60*ora;
	}

	return min

}