// set the dimension and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
	width = 1500 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page

var svg = d3.select("#timeline")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top +")");

var tool = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


function drawData(data){
	console.log(data);
}


function drawTimeline(data){

	var len = data.length;
	var spazio = width/len;

	var r = 6;
	
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("cx", function(d,i){ return (i+1)*spazio;})
		.attr("cy", function(d,i){ return scalino(i); })
		.attr("r", r)
	    .text(function(d,i){ return d.id; })
		.on("mouseover", function(d,i){
			d3.select(this)
				.attr("fill","orange")
				.attr("r", r*1.5);

			tool.transition()		
	            .duration(200)		
	            .style("opacity", .9)	

			tool.html(d.id + "<br/>" + d.inizio + "<br/>" + d.fine + "<br/>")	
	            .style("left", (d3.event.pageX) + "px")		
	            .style("top", (d3.event.pageY - 28) + "px");	
	        })			

		.on("mouseout", function(d,i){
			d3.select(this)
				.attr("fill","black")
				.attr("r", r);
			tool.transition()		
	            .duration(200)		
	            .style("opacity", 0)	
		});

	var pos = [];	
		

	for (var j = 0; j<len; j++){
		var y = scalino(j)
		pos.push({'x' : (j+1)*spazio, 'y' : y});
	}

	let line = d3.line()
	    .x(d=> d.x)
	    .y(d=> d.y);

	svg.append("path")
	    .datum(pos)
	    .attr("class", "path")
	    .attr("d", line)
	    .attr("stroke-width", "2.5px")
	    .attr("stroke", "black")
	    .attr("fill", "none")
		.attr("opacity", 0.5)
	
}

function scalino(num){
	if(num%2==0)
		return 100;
	else
		return 50;
}