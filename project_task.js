
var width = 900;
var height = 900;

var continent = "BothCon";

//Map Code
// ---------------------------------------------------------

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
.scale(200)
.center([-100, 400])
.translate([width/2 , height/2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
.domain([500, 5000, 10000, 50000, 100000, 150000, 200000])
.range(d3.schemeReds[6]);

var div1 = d3.select("body").append("div").attr("id", "task1div")
.attr("width", width)
.attr("height", height);
d3.queue()
.defer(d3.json, "geo.json")
.defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { data.set(d["Country/Other"], (d["Cases in the last 7 days"] - d["Cases in the preceding 7 days"])); })
.defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { data.set(d["Country/Other"], (d["Cases in the last 7 days"] - d["Cases in the preceding 7 days"])); })

.await(Choropleth);

function Choropleth(error, topo) {

var svg = d3.select("#task1div").append("svg")
    .attr("id", "project_task1")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "outline: thin solid orange;")
    .style('background-color', '#8be092')
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform)
 }))
 .append("g");

    svg.append("circle").attr("cx",20).attr("cy",410).attr("r", 10).attr("stroke", "#fee5d9").style("fill", "#fee5d9").style("stroke-width", function(d) { return "4"; })
    svg.append("circle").attr("cx",20).attr("cy",440).attr("r", 10).attr("stroke", "#fcbba1").style("fill", "#fcbba1").style("stroke-width", function(d) { return "4"; })
    svg.append("circle").attr("cx",20).attr("cy",470).attr("r", 10).attr("stroke", "#fc9272").style("fill", "#fc9272").style("stroke-width", function(d) { return "4"; })
    svg.append("circle").attr("cx",20).attr("cy",500).attr("r", 10).attr("stroke", "#fb6a4a").style("fill", "#fb6a4a").style("stroke-width", function(d) { return "4"; })
    svg.append("circle").attr("cx",20).attr("cy",530).attr("r", 10).attr("stroke", "#de2d26").style("fill", "#de2d26").style("stroke-width", function(d) { return "4"; })
    svg.append("circle").attr("cx",20).attr("cy",560).attr("r", 10).attr("stroke", "#a50515").style("fill", "#a50515").style("stroke-width", function(d) { return "4"; })

    svg.append("text").attr("x", 10).attr("y", 15).text(" Covid Cases in both North and South America ").style("font-size", "20px").attr("alignment-baseline","middle")

    svg.append("text").attr("x", 10).attr("y", 35).text(" You can drag and zoom on the map ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 10).attr("y", 55).text("(Note* have to click on any of the coloured map areas to do so) ").style("font-size", "15px").attr("alignment-baseline","middle")
    
    svg.append("text").attr("x", 10).attr("y", 390).text(" # of Covid Cases ").style("font-size", "20px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 40).attr("y", 410).text(" 0 - 5k ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 40).attr("y", 440).text(" 5k - 20k ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 40).attr("y", 470).text(" 20k - 30k ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 40).attr("y", 500).text(" 30k - 60k ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 40).attr("y", 530).text(" 60k - 160k ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 40).attr("y", 560).text(" 240k - 330k ").style("font-size", "15px").attr("alignment-baseline","middle")

// Draw the map
svg.append("g")
  .selectAll("path")
  .data(topo.features)
  .enter()
  .append("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set the color of each country
    .attr("fill", function (d) {
      if(continent == d.properties.continent || continent == "BothCon"){
      console.log(d.properties.name + ":" + data.get(d.properties.name))
      d.total = data.get(d.properties.name) || 0;
      return colorScale(d.total);
      }
      return "#eeeeee";
    });
  }



var NAonly = function(){
    d3.select("#project_task1").remove();
    continent = "North America"
    d3.queue()
    .defer(d3.json, "geo.json")
    .defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
    .await(Choropleth);}


var SAonly = function(){
    d3.select("#project_task1").remove();
    continent = "South America"
    d3.queue()
    .defer(d3.json, "geo.json")
    .defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
    .await(Choropleth);}

var BothCon = function(){
  d3.select("#project_task1").remove();
  continent = "BothCon"
  d3.queue()
  .defer(d3.json, "geo.json")
  .defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
  .defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
  .await(Choropleth);
}

//---------------------------------------------------------------



//Horizontal graph Code
//----------------------------------------------------------------



d3.queue()
.defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
.defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })

.await(TableInfo);

function TableInfo(error, data){
  var width = 1750
  var height = 1000
  
  var svg = d3.select("body").append("div").append("svg")
    .attr("id", "project_task2")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "outline: thin solid red;")
    .style('background-color', '#eded7e');

    svg.append("text").attr("x", 300).attr("y", 20).text(" Cases Compared from Current Week to Last Week ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 300).attr("y", 985).text(" # of Covid Cases ").style("font-size", "15px").attr("alignment-baseline","middle")

    var margin = {top: 20, right: 50, bottom: 50, left: 120},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleBand()			// x = d3.scaleBand()	
    .rangeRound([0, height])	// .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

var x = d3.scaleLinear()		// y = d3.scaleLinear()
    .rangeRound([0, width]);	// .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#7b6888", "#a05d56", "#d0743c"]);

d3.csv("Combined.csv",  function(d, i, columns) {
 d.total = 600000
  
  
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = ["Cases in the last 7 days", "Cases in the preceding 7 days"];

  data.sort(function(a, b) { return b.total - a.total; });
  y.domain(data.map(function(d) { return d["Country/Other"]; }));					// x.domain...
  x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();	// y.domain...
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("y", function(d) { return y(d.data["Country/Other"]); })	    
      .attr("x", function(d) { return x(d[0]); })			    
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })	
      .attr("height", y.bandwidth());						   

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,0)") 						
      .call(d3.axisLeft(y));								

  g.append("g")
      .attr("class", "axis")
	  .attr("transform", "translate(0,"+height+")")			
      .call(d3.axisBottom(x).ticks(50, "s"))					
    .append("text")
      .attr("y", 2)												
      .attr("x", x(x.ticks().pop()) + 0.5) 						
      .attr("dy", "0.32em")									
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("# of Covid Cases")
	  .attr("transform", "translate("+ (-width) +",-10)");   	

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
   
	 .attr("transform", function(d, i) { return "translate(-50," + (300 + i * 20) + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
}


//top 5 countries with lowest cases per 1 million
//----------------------------------------------------------------



d3.queue()
.defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
.defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })

.await(Top);

function Top(error, data){
  var width = 1000
  var height = 200
  
  var svg = d3.select("body").append("div").append("svg")
    .attr("id", "project_task4")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "outline: thin solid blue;")
    .style('background-color', '#6dfcd6');


    svg.append("text").attr("x", 300).attr("y", 20).text(" Top 5 Countries lowest cases/1M ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 300).attr("y", 190).text("# of Covid Cases ").style("font-size", "15px").attr("alignment-baseline","middle")

  var margin = {top: 40, right: 50, bottom: 40, left: 120},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleBand()			// x = d3.scaleBand()	
    .rangeRound([0, height])	// .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

var x = d3.scaleLinear()		// y = d3.scaleLinear()
    .rangeRound([0, width]);	// .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#ff8c00"]);

d3.csv("Combined.csv",  function(d, i, columns) {
 d.total = 70000
  
  
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = ["Cases in the last 7 days/1M pop"];
  data.sort((a, b) => b["Cases in the last 7 days/1M pop"] - a["Cases in the last 7 days/1M pop"]);
  var data = data.slice(0, 5) 


  y.domain(data.map(function(d) { return d["Country/Other"]; }));					// x.domain...
  x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();	// y.domain...
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("y", function(d) { return y(d.data["Country/Other"]); })	    
      .attr("x", function(d) { return x(d[0]); })			    
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })	
      .attr("height", y.bandwidth());						    

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,0)") 					
      .call(d3.axisLeft(y));									

  g.append("g")
      .attr("class", "axis")
	  .attr("transform", "translate(0,"+height+")")				
      .call(d3.axisBottom(x).ticks(25, "s"))					
    .append("text")
      .attr("y", 2)											
      .attr("x", x(x.ticks().pop()) + 0.5) 						//     .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")									
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
	  .attr("transform", "translate("+ (-width) +",-10)");   	// Newline

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	 .attr("transform", function(d, i) { return "translate(-50," + (300 + i * 20) + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
}

// bottom 5 countries with lowest cases per 1 million
//----------------------------------------------------------------



d3.queue()
.defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
.defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })

.await(Bottom);

function Bottom(error, data){
  var width = 1000
  var height = 200
  

  var svg = d3.select("body").append("div").append("svg")
    .attr("id", "project_task4.5")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "outline: thin solid green;")
    .style('background-color', '#ed775f');
  
    svg.append("text").attr("x", 300).attr("y", 20).text(" Bottom 5 Countries lowest cases/1M (There are 0 cases, respectively) ").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 300).attr("y", 190).text(" # of Covid Cases ").style("font-size", "15px").attr("alignment-baseline","middle")

    var margin = {top: 40, right: 50, bottom: 40, left: 120},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleBand()			// x = d3.scaleBand()	
    .rangeRound([0, height])	// .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

var x = d3.scaleLinear()		// y = d3.scaleLinear()
    .rangeRound([0, width]);	// .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#6b486b"]);

d3.csv("Combined.csv",  function(d, i, columns) {
 d.total = 10
  
  
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = ["Cases in the last 7 days/1M pop"];
  data.sort((a, b) => b["Cases in the last 7 days/1M pop"] - a["Cases in the last 7 days/1M pop"]);
  var data = data.slice(46,51) 
  
  y.domain(data.map(function(d) { return d["Country/Other"]; }));					// x.domain...
  x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();	// y.domain...
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("y", function(d) { return y(d.data["Country/Other"]); })	   
      .attr("x", function(d) { return x(d[0]); })			    
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })	
      .attr("height", y.bandwidth());						    

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,0)") 					
      .call(d3.axisLeft(y));								

  g.append("g")
      .attr("class", "axis")
	  .attr("transform", "translate(0,"+height+")")				
      .call(d3.axisBottom(x).ticks(50, "s"))					
    .append("text")
      .attr("y", 2)												
      .attr("x", x(x.ticks().pop()) + 0.5) 					
      .attr("dy", "0.32em")										
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
	  .attr("transform", "translate("+ (-width) +",-10)");   	

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
	 .attr("transform", function(d, i) { return "translate(-50," + (300 + i * 20) + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
}


//# of cases increased/ reduced

//----------------------------------------------------------------


d3.queue()
.defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })
.defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { data.set(d["Country/Other"], d["Cases in the last 7 days"]); })

.await(WeeklyCaseChange);

function WeeklyCaseChange(error, data){

  var width = 1600
  var height = 1500
  

  var svg = d3.select("body").append("div").append("svg")
    .attr("id", "project_task3")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "outline: thin solid green;")
    .style('background-color', '#db881a');
  
  
    svg.append("text").attr("x", 600).attr("y", 20).text(" Weekly % Change/Cases Increased vs Decreased ").style("font-size", "20px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 900).attr("y", 1490).text("% Change from Last to Current week ").style("font-size", "20px").attr("alignment-baseline","middle")

    var margin = {top: 10, right: 0, bottom: 0, left: 0},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var x = d3.scaleLinear()
    .range([0,width]);

var y = d3.scaleBand()
    .rangeRound([height,0])
    .padding(0.2);

d3.csv("Combined.csv",types,function(error,data){

  if (error) throw error;


  x.domain(d3.extent(data, function(d){ return d["Weekly Case % Change"]; }));
  y.domain(data.map(function(d) { return d["Country/Other"]; }));

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d){ return d["Weekly Case % Change"] < 0 ? x(d["Weekly Case % Change"]) : x(0); })
      .attr("width", function(d){ return d["Weekly Case % Change"] < 0 ? x(d["Weekly Case % Change"] * -1) - x(0) : x(d["Weekly Case % Change"]) - x(0); })
      .attr("y", function(d){ return y(d["Country/Other"]); })
      .attr("height", y.bandwidth())
      .attr("fill", function(d){ return d["Weekly Case % Change"] > 0 ? "#d7191c": "#1a9641"; });

  svg.selectAll(".value")
      .data(data)
    .enter().append("text")
      .attr("class", "value")
      .attr("x", function(d){
        if (d["Weekly Case % Change"] < 0){
          return (x(d["Weekly Case % Change"] * -1) - x(0)) > 20 ? x(d["Weekly Case % Change"]) + 2 : x(d["Weekly Case % Change"]) - 1;
        } else {
          return (x(d["Weekly Case % Change"]) - x(0)) > 20 ? x(d["Weekly Case % Change"]) - 2 : x(d["Weekly Case % Change"]) + 1;
        }
      })
      .attr("y", function(d){ return y(d["Country/Other"]); })
      .attr("dy", y.bandwidth() - 2.55)
      .attr("text-anchor", function(d){
        if (d["Weekly Case % Change"] < 0){
          return (x(d["Weekly Case % Change"] * -1) - x(0)) > 20 ? "start" : "end";
        } else {
          return (x(d["Weekly Case % Change"]) - x(0)) > 20 ? "end" : "start";
        }
      })
      .style("fill", function(d){
        if (d["Weekly Case % Change"] < 0){
          return (x(d["Weekly Case % Change"] * -1) - x(0)) > 20 ? "#fff" : "#3a403d";
        } else {
          return (x(d["Weekly Case % Change"]) - x(0)) > 20 ? "#fff" : "#3a403d";
        }
      })
      .text(function(d){ return d["Weekly Case % Change"]; });

  svg.selectAll(".name")
      .data(data)
    .enter().append("text")
      .attr("class", "name")
      .attr("x", function(d){ return d["Weekly Case % Change"] < 0 ? x(0) + 2.55 : x(0) - 2.55 })
      .attr("y", function(d){ return y(d["Country/Other"]); })
      .attr("dy", y.bandwidth() - 2.55)
      .attr("text-anchor", function(d){ return d["Weekly Case % Change"] < 0 ? "start" : "end"; })
      .text(function(d){ return d["Country/Other"]; });

  svg.append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", 0 + margin.top)
      .attr("y2", height - margin.top)
      .attr("stroke", "#3a403d")
      .attr("stroke-width", "1px");

});

function types(d){
  d["Weekly Case % Change"] = +d["Weekly Case % Change"];
  return d;
}



}