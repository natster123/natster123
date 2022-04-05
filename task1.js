var grades = [{Student: 1, marks: 6}, { Student: 2, marks: 100}, { Student: 3, marks: 90}, { Student: 4,
    marks: 55}, { Student: 5, marks: 83}, { Student: 6, marks: 88}, { Student: 7, marks: 91}, {
    Student: 8, marks: 92}, { Student: 9, marks: 67}, { Student: 10, marks: 73}];
    

    grades.sort(function(x, y){
        return d3.ascending(x.marks, y.marks);
     })

    for (i = 0; i < grades.length; i++) {
        console.log(grades[i].marks);
    }
  
  

function HBar (grades){

  var margin = {top: 20, right: 30, bottom: 40, left: 90},
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;


  var svg = d3.select(".Task1")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, 100])
      .range([ 0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
      .range([ 0, height ])
      .domain(grades.map(function(d) { return d.Student; }))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
      .data(grades)
      .enter()
      .append("rect")
      .attr("x", x(0) )
      .attr("y", function(d) { return y(d.Student); })
      .attr("width", function(d) { return x(d.marks); })
      .attr("height", y.bandwidth() )
      .attr("fill", "#b36969")
    
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height/2 + 20)
      .text("Student #")

      svg.append("text")
          .attr("x", 150)
          .attr("y", 475 )
          .text("Marks")
      
      svg.append("text")
          .attr("x", 100)
          .attr("y", 2 )
          .text("Student vs Marks")
}

 function updateGraph(){
   
    var deleteIndex = 0;
    d3.selectAll("rect").style("opacity",  function() {
      deleteIndex++
      return deleteIndex <= 3 ? 0 : 1;
    });

}

HBar(grades)

function displayOG(){
  d3.selectAll("rect").style("opacity",  1)
}
        