var svg2 = d3.select(".Task2").append("svg").attr("width", 700).attr("height", 760)
svg2.style('background-color', '#8707f0');

d3.json("task2.json").then(dataset => {

        var root = d3.hierarchy(d3.group(dataset.root, d=>d.Folder)).sum(d => d.size)
        
        var treeMap = d3.treemap()
        .size([700, 600])
        .padding(2)
      
        treeMap(root);
        svg2
          .selectAll("rect")
          .data(root.leaves())
          .enter()
          .append("rect")
          .attr("x", d => d.x0)
          .attr("y", d => d.y0)
          .attr("width",  d=>d.x1 - d.x0)
          .attr("height", d=>d.y1 - d.y0)
          .attr("fill",(file) =>
            {
              if(file['data']['filename'].substr(-3) == "mp4"){
                return "#6459fa";
              }else if(file['data']['filename'].substr(-3) == "mp3"){
                return "#77fa59";
              }else if(file['data']['filename'].substr(-3) == "avi"){
                return "#d63c3c";
              }else if(file['data']['filename'].substr(-3) == "wav"){
                return "#02f791";
              }else{
                return "#e3b900";
              }
            })
          

        svg2.append("text")
            .attr("x", 640)
            .attr("y", 590)
            .text("Misc")
            .style("font-size", "20px")
            .style("fill", "#0e0742")

        svg2.append("text")
            .attr("x", 640)
            .attr("y", 500)
            .text("Document")
            .style("font-size", "13px")
            .style("fill", "#0e0742")

        svg2.append("text")
            .attr("x", 10)
            .attr("y", 25)
            .text("Video")
            .style("font-size", "20px")
            .style("fill", "#0e0742")

        svg2.append("text")
            .attr("x", 647)
            .attr("y", 20)
            .text("Audio")
            .style("font-size", "20px")
            .style("fill", "#0e0742")


        svg2.append("text").attr("x", 100).attr("y", 610).text(" .mp4 ").style("font-size", "15px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 100).attr("y", 640).text(" .mp3 ").style("font-size", "15px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 40).attr("y", 610).text(" other ").style("font-size", "15px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 40).attr("y", 640).text(" .avi ").style("font-size", "15px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 40).attr("y", 670).text(" .wav ").style("font-size", "15px").attr("alignment-baseline","middle")
        

        svg2.append("circle").attr("cx",85).attr("cy",610).attr("r", 10).style("fill", "#6459fa")  
        svg2.append("circle").attr("cx",85).attr("cy",640).attr("r", 10).style("fill", "#77fa59")  
        svg2.append("circle").attr("cx",25).attr("cy",610).attr("r", 10).style("fill", "#e3b900")
        svg2.append("circle").attr("cx",25).attr("cy",640).attr("r", 10).style("fill", "#d63c3c")
        svg2.append("circle").attr("cx",25).attr("cy",670).attr("r", 10).style("fill", "#02f791")
        

        svg2.append("text").attr("x", 150).attr("y", 610).text("1. There 4 folders, 'Videos', 'Audio', 'Document', 'Misc' ").style("font-size", "14px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 150).attr("y", 630).text("2. # of Video files: 14 , # of Audio files: 11, # of Document files: 11, # of Misc files: 8").style("font-size", "14px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 150).attr("y", 650).text("3. Video: .mp4, .avi,  Audio: .wav, .mp3,  Misc: .xls, .ppt, .py, .js, .c,  Document: .pdf, .doc .").style("font-size", "14px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 150).attr("y", 670).text("4. Tree map shows relative size of files (highlighted by size) in accordance with the legend").style("font-size", "14px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 75).attr("y", 690).text("5. Video: .mp4/.avi files are larger, Audio: .mp3/.wav are second largest, & Doc/Misc: relatively the same size ").style("font-size", "14px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 150).attr("y", 710).text("6. Name of folders: 'Videos', 'Audio', 'Document', 'Misc' ").style("font-size", "14px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 150).attr("y", 730).text("7. Tree map (legend) shows files that have .mp4 and or .mp3 ").style("font-size", "14px").attr("alignment-baseline","middle")

        svg2.append("text").attr("x", 150).attr("y", 610).text("1. There 4 folders, 'Videos', 'Audio', 'Document', 'Misc' ").style("font-size", "14px").attr("alignment-baseline","middle")
        
})