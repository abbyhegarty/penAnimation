var penPromise = d3.json("penguins/classData.json")

penPromise.then(
function(data)
    {
    
        setup(data);
        console.log("Penguins",data);
   
    },
function(err)
    {
        console.log("ERROR",err);
    })
 
    //for changes later if needed

    var screen = {width:600, height:600}
    var margins = {top:50,right:50,bottom:50,left:50}
    
    var setup = function(data)
    {        
     //creating svg (but don't forget to put in html
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("id","graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
        
     //scale    
    var xScale = d3.scaleLinear()
                    .domain([37,0])
                    .range([height,0])
    var yScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([height,0])
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
        .append("g")
        .classed("axis",true);
    
        //make axis
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","+(margins.top+height) +")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(25,"+margins.top+")")
        .call(yAxis)
    
        //button
     d3.select("body")
        .selectAll("button")
        .data(data)
        .enter()
        .append("button")
        .on("click",function(penguin, position) // position of where penguin is in array  ~ index
           {
         drawArray(data, xScale, yScale, position) //now you need to add position since we called it up there 
     })
      .append("img")
        .attr("src", function(data) 
             {
         return "penguins/" +data.picture   //return pic of penguin
     })
        
        //put the stuff here from the draw 
  d3.select("#graph") 
       .selectAll("circle")
       .data(data[0].quizes.map(function(d) { return d.grade}))
       .enter()
       .append("circle")
  
    drawArray(data,xScale,yScale,0);
    
}
    
   var drawArray = function(data,xScale,yScale, index)
    { 
       var arrays = d3.select("#graph") 
       .selectAll("circle")
       .data(data[index].quizes.map(function(d) { return d.grade}))
    //  .enter()
    //   .append("circle")
       .transition()
       .attr("fill", "blue")
      
      .attr("cx",function(num,index) 
        {
           return xScale(index) })
       .attr("cy",function(num)
        {
           return yScale(num) 
       })
       .attr("r", 5)
         
         
   /*      
     //mouse    
    .on("mouseover", function(data)
        {
        d3.select(this)
        .attr("stroke", "red")
        .attr("stroke-width", 10)
        .raise(this);
        
    })
      //mouse   
    .on("mouseout", function(data)
        {
        d3.select(this)
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
    })
    
      
    arrays.datum(function(obj)
    {
        return obj.quizes.map(function(d){return d.grade;});
    })}
*/
       }
