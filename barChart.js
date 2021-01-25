var margin = { top: 50, right: 30, bottom: 70, left: 100 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// var g = d3.select('body').append('g').width(width + margin.left + margin.right).height(height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var g = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function (data) {
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.Country; }))
        .padding(0.2);
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .transition()
        .duration(1500)
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 13000])
        .range([height, 0]);
    g.append("g")
        .call(d3.axisLeft(y));

    // Bars
    g.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.Country); })
        .attr("y", function (d) { return y(d.Value); })
        .transition()
        .duration(1500)
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.Value); })
        .attr("fill", "red")

})
