var margin = {top: 40, right: 100, bottom: 70, left: 40},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

function drawGraph(data) {
	
  x.domain((data.map(function(d) { return d.ini; })).sort());
  y.domain([0, d3.max(data, function(d) { return d.count; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("x", width+10)
      .attr("dy", ".71em")
      .style("fill", "white")
      .style("font-size", "15px")
      .text("Hour")
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("x", 30)
      .attr("y", -25)
      .attr("dy", ".71em")
      .style("fill", "white")
      .style("font-size", "15px")
      .style("text-anchor", "end")
      .text("Visitors");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "#FF9933")
      .attr("x", function(d) { return x(d.ini); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); });

};