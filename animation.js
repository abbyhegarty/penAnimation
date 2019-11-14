var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then(function(data)
{                  
    console.log("works", data)   
    return setup
},
   function(error)
{   
console.log("error", error)  
    
})

var screen = {width:400,height:500}
var margins = {top:20, right:50,bottom:50,left:50}

var setup = function(data)
{  
    
    d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        .append("g")
        .attr("id","graph")
        .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.bottom - margins.top;
    
   var xScale = d3.scaleLinear()
                    .domain([37,0])
                    .range([height,0])
    var yScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([height,0])
    
    
    var cSacle = d3.scaleOrdinal(d3.schemeTableau10)  //change color later
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
        .append("g")
        .classes("axis",true);
        

    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(25,"+margins.top+")")
        .call(yAxis)

    
//allows us to do .transition later if we already appended the stuff
    d3.select("#graph")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("fill","none")
        .attr("stroke","black")

//tooltip
    
.on("mouseover", function (num,index)
   {
        d3.select("#tooltip")
            .style ("left", (d3.event.pageX + 20) + "px")
            .style ("top", (d3.event.pageY + 25) + "py")
            .text("("+index+","+num+")")  //imgs , or whatever
            .classed("hidden",false)
    })
    
    //add mouse out here
    
  
    drawArray(data,xScale,yScale,cScale)  
}


var drawArray = function(data,xScale,yScale,cScale)
{
    var arrays = d3.select("graph")
                    .selectAll("g")
                    .data(data)
                    .transition()
                    .attr("fill","none")
                    .attr("stroke","black")
    // don't need .append or .enter because we added it in the setup
    
    
    

            
var lineGenerator = d3.line()
    .x(function(num,index){return xScale(index)})
    .y(function(num){return yScale(num)})
    //.curve(d3.curveNatural)
    

arrays.datum(function(obj)
{
return obj.quizes.map(function(d){return d.grade;});
})
    
    .append("path")  
    .attr("d", lineGenerator);
}
    

