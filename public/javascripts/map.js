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

        tool.html( d.nome +"<br/>")	
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
        

	svg.append("path")
	    .datum(data)
	    .attr("class", "path")
	    .attr("d", line)
	    .attr("stroke-width", "2.5px")
	    .attr("stroke", "black")
        .attr("fill", "none")
        .attr("opacity", "0.7")
		
}

   

