var penPromise = d3.json("penguins/classData.json")

penPromise.then(
function(data)
    {
        ev(data);
        getDay(data);
        console.log("Penguins",data);
    },
function(err)
    {
        console.log("ERROR",err);
    })

var getGrade = function(quiz)
{
    return quiz.grade;
}

var getDay = function(data)
{
    return data[0].quizes.map(days);
}

var days = function(penguin)
{
    return penguin.day;
}

var startDay = 0;

var trackDay = function(change)
{
    day = startDay + change;
    startDay = day;
    return day;
}

var ev = function(data)
{
    var numPen = []
    for (i=0; i < data.length; i++)
        {
            numPen.push(i);
        }
    
    var getQuiz = function(data,num)
    {
        return data[num].quizes.map(getGrade);
    }
    
    var fullArray = [] //array of quizzes
        for (i=0; i < 23; i++)
            {
                var num = i
                var step = getQuiz(data,num)
                fullArray.push(step);
            }
        
    var pointsFunc = function(data,begDay)
    {    
        var xs = numPen;

        var points = xs.map(
            function(x)
            {
                return {x:x, y:fullArray[x][begDay]}
            })
        return points
    }
    
    var dayCounter = d3.select("body")
        .select("#dayCount")
        .text("Day 1")
       
    
    //////////////////////////////////////////////////
    
    var screen = {width:400, height:500}
    var margins = {top:10,right:50,bottom:50,left:50}
    
    var setup = function(points)
    {
                
       
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("id","graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
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
    
    //drawLegend(data,cScale);
    drawArray(data,xScale,yScale);
    
}
    
   var drawGraph = function(points,xScale,yScale)
    {
        d3.select("svg")
        .selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("fill","blue")
        .attr("cx",function(p){return xScale(p.x)})
        .attr("cy",function(p){return yScale(p.y)})
        .attr("r", 7)
        .on("mouseover", function(d)
           {
                d3.select("body").select("#pen").text("Penguin: " + d.x)
                d3.select("body").select("#quiz").text("Quiz Grade: " + d.y)
           })
    }
    
    //draws start graph
    setup(pointsFunc(data,startDay));
    var xScale = setup(pointsFunc(data,startDay)).xscale;
    var yScale = setup(pointsFunc(data,startDay)).yscale;
    drawGraph(pointsFunc(data,startDay),xScale,yScale);
    }
    
    //draws start graph
    setup(pointsFunc(data,startDay));
    var xScale = setup(pointsFunc(data,startDay)).xscale;
    var yScale = setup(pointsFunc(data,startDay)).yscale;
    drawGraph(pointsFunc(data,startDay),xScale,yScale);
    
    var prevButton = d3.select("#prev")
        .on("click", function(d)
            {
                var numDay = trackDay(-1)

                    d3.select("svg").selectAll("circle")
                        .remove();    

                    var displayDay = numDay + 1;

                    var newPoints = pointsFunc(d,numDay)    

                    setup(newPoints);
                    var xScale = setup(newPoints).xscale;
                    var yScale = setup(newPoints).yscale;
                    drawGraph(newPoints,xScale,yScale);

                    d3.select("#dayCount")
                        .text("Day " + displayDay)
            })
    
    var nextButton = d3.select("#next")
        .on("click", function(d)
            {
                var numDay = trackDay(1)
           
                    d3.select("svg").selectAll("circle")
                        .remove(); 

                    var displayDay = numDay + 1;

                    var newPoints = pointsFunc(d,numDay)    

                    setup(newPoints);
                    var xScale = setup(newPoints).xscale;
                    var yScale = setup(newPoints).yscale;
                    drawGraph(newPoints,xScale,yScale);

                    d3.select("#dayCount")
                        .text("Day " + displayDay)
            })


