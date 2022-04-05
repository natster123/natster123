
    var marks = null

    var keylist = null

    d3.json("task1.json").then(function (file) {
        marks = file;
        keylist = Object.keys(marks.Marks[0])
        BubChart(genData(marks,false));
    })

    


    var genData = function(file,removeLit)
    {
    var data = {}
    data.name = "student"
    data.children = []
    data.size = null
    console.log(data)
    
    // keylist.shift()
    for (var i = 0; i < file.Marks.length; i++){
        var stu = file.Marks[i]
        var subject = []
        for (var j = 1; j < keylist.length; j++){
            if(removeLit  && keylist[j] == "LIT") continue;
            subject.push({"name": keylist[j], "children": null, "mark": stu[keylist[j]], "size": 50 + stu[keylist[j]]})
        }
        data.children.push({"name": stu.student, "children": subject, "size": null})
    }
    return data
    }

    
var Colorize = function(marks){
    var green = (~~(marks * 2.55)).toString(16)
    var red = (~~((100 - marks) * 2.55)).toString(16)
    if(red.length < 2) red = "0" + red
    if(green.length < 2) green = "0" + green
    var color = "#" + red  + green + "00"
    return color
}

var BubChart = function(data)
{

var subjectColor = {"AI": "#03fcc3", "DB": "#d4ff00", "CG": "#7369b3", "ITP": "#3c00ff", "LIT": "#f200ff"}
var diameter = 500,
format = d3.format(",d"),
dataSource = 0;

var pack = d3.layout.pack()
.size([diameter - 75, diameter - 75])
.sort( function(a, b) {
    return -(a.value - b.value);
})
.value(function(d) { return d.size; });

var svg = d3.select("body").append("svg")
.attr("id", "task1")
.attr("width", diameter)
.attr("height", diameter);

var vis = svg.datum(data).selectAll(".node")
.data(pack.nodes)
.enter()
.append("g");

var titles = vis.append("title")
.attr("x", function(d) { return d.x; })
.attr("y", function(d) { return d.y; })
.text(function(d) { return d.name +
    (d.children ? "" : ": " + format(d.mark)); });


var circles = vis.append("circle")
.style("stroke-width", function(d) { return keylist.includes(d.name) && d.name != "student" ? "4": "1"; })
.style("fill", function(d) { 
    var color = null
    if(keylist.includes(d.name) && d.name != "student"){
        color = Colorize(d.mark)
        console.log(color)
    }
    return color != null ? color : "#a3a683"; })
    
    .attr("stroke", function(d) { 
        var color = "#ffffff"
        if(keylist.includes(d.name)){
            color = subjectColor[d.name]
        }
        return !d.children ? color : "black"; })

.attr("cx", function(d) { return d.x; })
.attr("cy", function(d) { return d.y; })
.attr("r", function(d) { return d.r; });



var tt = vis.append("text")
.attr("x", function(d) { return d.x + (d.children ? -10 : -5); })
.attr("y", function(d) { 
    var y =  d.y + (d.children ? -40 : 0);
    return d.name == "student" ? -20: y;
})
.text(function(d) { return (d.children ? d.name : ""); });


 



svg.append("circle").attr("cx",450).attr("cy",290).attr("r", 10).attr("stroke", subjectColor["AI"]).style("fill", "#ffffff").style("stroke-width", function(d) { return "4"; })
svg.append("circle").attr("cx",450).attr("cy",320).attr("r", 10).attr("stroke", subjectColor["DB"]).style("fill", "#ffffff").style("stroke-width", function(d) { return "4"; })
svg.append("circle").attr("cx",450).attr("cy",350).attr("r", 10).attr("stroke", subjectColor["CG"]).style("fill", "#ffffff").style("stroke-width", function(d) { return "4"; })
svg.append("circle").attr("cx",450).attr("cy",380).attr("r", 10).attr("stroke", subjectColor["ITP"]).style("fill", "#ffffff").style("stroke-width", function(d) { return "4"; })
svg.append("circle").attr("cx",450).attr("cy",410).attr("r", 10).attr("stroke", subjectColor["LIT"]).style("fill", "#ffffff").style("stroke-width", function(d) { return "4"; })


svg.append("text").attr("x", 395).attr("y", 30).text(" Grade Range (%) ").style("font-size", "20px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 50).text(" -0 ").style("font-size", "12px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 70).text(" -10 ").style("font-size", "12px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 90).text(" -20 ").style("font-size", "12px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 110).text(" -30 ").style("font-size", "12px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 130).text(" -40 ").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 150).text(" -50 ").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 170).text(" -60 ").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 190).text(" -70 ").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 210).text(" -80 ").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 230).text(" -90 ").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 470).attr("y", 250).text(" -100 ").style("font-size", "10px").attr("alignment-baseline","middle")


svg.append("text").attr("x", 440).attr("y", 270).text(" Subjects ").style("font-size", "20px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 465).attr("y", 290).text(" AI ").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 465).attr("y", 320).text(" DB ").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 465).attr("y", 350).text(" CG ").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 465).attr("y", 380).text(" ITP ").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 465).attr("y", 410).text(" LIT ").style("font-size", "15px").attr("alignment-baseline","middle")

svg.append("text").attr("x", 1).attr("y", 8).text(" Students vs Marks ").style("font-size", "18px").attr("alignment-baseline","middle").attr("stroke-width", function(d) { return 10; })





var gradient = svg.append("linearGradient")
.attr("id", "svgGradient")
.attr("x1", "0%")
.attr("x2", "0%")
.attr("y1", "0%")
.attr("y2", "100%");

gradient.append("stop")
.attr("class", "start")
.attr("offset", "0%")
.attr("stop-color", "red")
.attr("stop-opacity", 1);

gradient.append("stop")
.attr("class", "end")
.attr("offset", "100%")
.attr("stop-color", "#00ff00")
.attr("stop-opacity", 1);

svg.append("rect")
.attr("width", 30)
.attr("height", 200)
.attr("x", 440).attr("y", 50)
.attr("fill", "url(#svgGradient)");

    }


//BubChart(genData(marks,false));

var RemoveLit = function(){
    d3.select("#task1").remove();
    BubChart(genData(marks, true));
}

var Displayog = function(){
    d3.select("#task1").remove();
    BubChart(genData(marks, false));
}
