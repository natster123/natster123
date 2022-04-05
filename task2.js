var margin = {top: 10, right: 30, bottom: 40, left: 50},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".Task2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

// Add the grey background that makes ggplot2 famous
svg
  .append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("height", height)
    .attr("width", height)
    .style("fill", "EBEBEB")

d3.csv("Kaggle-modified-Suddharshan.csv").then(function(data){

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 50])
    .range([ 0, width ])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(10))
    .select(".domain").remove()

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([4.4, 5.2])
    .range([ height, 0])
    .nice()
  svg.append("g")
    .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(10))
    .select(".domain").remove()

  svg.selectAll(".tick line").attr("stroke", "white")

  // X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left)
      .attr("y", height + margin.top + 20)
      .text("Course Duration");

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height/2 + 20)
      .text("Average Rating")

 svg.append("text")
     .attr("x", 110)
     .attr("y", 502 )
     .text("Course Duration vs Average Rating")


  //dots
  var node = svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    node.append("circle")
      .attr("cx", function (d) { return x(d.Course_duration); } )
      .attr("cy", function (d) { return y(d.Average_rating); } )
      .attr("r", 5)
      .style("fill", "red")

    node.append("text")
     .attr("x", function (d) { return x(d.Course_duration); })
     .attr("y", function (d) { return y(d.Average_rating); })
     .text(function (d) {return d.Initials;})
     .style("fill", "yellow")

    node.append("text")
     .attr("x", 100)
     .attr("y", 2)
     .text("Course Duration vs Average Rating")
     .style("fill", "green")


})
