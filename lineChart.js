var margin = {
    left: 20, top: 20, right: 20, bottom: 20
},
var width = 460 + margin.lef - margin.right,
var height = 460 + margin.top - margin.bottom
// var margin = { top: 10, right: 30, bottom: 30, left: 60 },
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// var g = d3.select("body")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var g = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv", function (d) {

    return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
})
    ,
    function (data) {
        var x = d3.scaleTime().domain([d3.extent(data, function (d) { return d.date })]).range([height, 0])
        g.append('g').attr('transform', "translate(0," + height + ")").call(d3.axixBottom(x))


        var y = d3.scaleLiner().domain([8000, 9200]).range([height, 0])
        g.append('g').call(d3.axisLeft(y))
    }