var width = 1150,
    height = 550;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

var img = g.append("svg:image")
    .attr("xlink:href", "/images/clean_map.jpg")
    .attr("position","relative")

//var x = d3.scaleLinear()
//    .domain([0, 840])
//    .range([width,0]);
//
//var y = d3.scaleLinear()
//    .domain([0, 650])
//    .range([height,0]);

var tool = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


function drawCircle(data){

    console.log(data)

    svg.selectAll("circle")
    	.data(data)
    	.enter()
    	.append("svg:circle")
    	.attr("class", "circle")
    	.attr("cx", function(d){ return d.x;})
    	.attr("cy", function(d){ return d.y;})
        .attr("r", 6)
        .text(function(d){ return d.nome})
        .on("mouseover", function(d,i){
            d3.select(this)
                .attr("fill","orange")
                .attr("r", 6*1.5);
        
            tool.transition()		
                .duration(200)		
                .style("opacity", .9)	
        
            tool.html( "<br/>" + d.nome +"<br/>")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })			
        
        .on("mouseout", function(d,i){
            d3.select(this)
                .attr("fill","black")
                .attr("r", 6);
            tool.transition()		
                .duration(200)		
                .style("opacity", 0)	
        });
    
    var line = d3.line()
        .x(d=> d.x)
        .y(d=> d.y)
        

	path = svg.append("path")
	    .datum(data)
	    .attr("class", "path")
	    .attr("d", line)
	    .attr("stroke-width", "2.5px")
	    .attr("stroke", "black")
        .attr("fill", "none")
        .attr("opacity", "0.7");

    var pos_iniziale = data[0]; 

    posizione = svg.append("circle")
        .attr("cx", pos_iniziale.x)
        .attr("cy", pos_iniziale.y)
        .attr("r", 10)
        .attr("fill", "none")
        .attr("stroke","red")
        .attr("stroke-width", "2 px")
        .attr("class", "posizione")
        
    return {posizione, path};

    };


function pathTween(path, posizione, i){
    var length = path.node().getTotalLength(); // Get the length of the path
    var r = d3.interpolate(i, length); //Set up interpolation from 0 to the path length
    return function(t){
        point = path.node().getPointAtLength(r(t)); // Get the next point along the path
        posizione // Select the circle
            .attr("cx", point.x) // Set the cx
            .attr("cy", point.y) // Set the cy	
            .attr("stroke-dashoffset", r(t));
              
    }
};

var pause = false;

function start_transition(posizione, path){
    var duration = 70000;
    var length = path.node().getTotalLength();
    var r = posizione.attr("stroke-dashoffset");
	var remain = length - r;
	posizione.transition()
		.delay(500)
		.duration(duration*remain/length)
		.ease(d3.easeLinear)
        .tween("pathTween", function(){ return pathTween(path,posizione, 0)})		 
}

function ferma_transizione(posizione, path){
	if(!pause){
		posizione.transition()
			.duration(0)
		this.pause = true;
	} else {
		var r = posizione.attr("stroke-dashoffset");
		posizione
			.transition()
			.duration(70000)
			.ease(d3.easeLinear)
			.tween("pathTween", function(){return pathTween(path, posizione, r)})

		this.pause = false;
    }
    
    
}

function slow_transition(posizione, path){
	var r = posizione.attr("stroke-dashoffset");
	d3.select(".posizione")
		.transition()
		.duration(100000)
		.ease(d3.easeLinear)
		.tween("pathTween", function(){return pathTween(path, posizione, r)})
}

function fast_transition(posizione, path){
	var r = posizione.attr("stroke-dashoffset");
	d3.select(".posizione")
		.transition()
		.ease(d3.easeLinear)
		.duration(10000)
		.tween("pathTween", function(){return pathTween(path,posizione, r)})
}

function start(){
    start_transition(posizione, path);
}

function ferma(){
    ferma_transizione(posizione, path);
}

function slow(){
    slow_transition(posizione, path);
}

function fast(){
    fast_transition(posizione, path);
}








   

