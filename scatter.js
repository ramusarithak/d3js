var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var innerHeight = height - margin.top - margin.bottom
var innerWidth = width - margin.left - margin.right

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function (data) {

    // console.log('d', d)
    var x = d3.scaleLinear().domain([4, 8]).range([0, width]);
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x))

    var y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y))

    var color = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica"])
        .range(["#440154ff", "#21908dff", "#fde725ff"])


    var myCircle = svg.append('g').selectAll('circle').data(data).enter().append('circle')
        .attr('cx', function (d) { return x((d.Sepal_Length)) })
        .attr('cy', function (d) { return x((d.Petal_Length)) })
        .attr('r', 8)
        .attr('fill', function (d) { return color(d.Species) })
        .style("opacity", 0.5)

    // add brush
    // svg.call(d3.brush()
    //     .extent([[0, 0], [width, height]])
    //     .on('start brush', updateChart)

    svg.call(d3.brush()                 // Add the brush feature using the d3.brush function
        .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    )

    function updateChart () {
        extent = d3.event.selection

        myCircle.classed("selected", function (d) {

            return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length))
        })
    }
    function isBrushed (brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[0][1],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];

        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }
    // .extent=d3.event.selection
    // myCircle.classed("selected", function(d){})

})
