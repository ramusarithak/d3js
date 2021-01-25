var height = 500
var width = 600
var margin = { left: 100, right: 40, top: 120, bottom: 60 }

var innerHeight = height - margin.top - margin.bottom
var innerWidth = width - margin.left - margin.right

var svg = d3.select('body').append('svg').attr('height', height).attr('width', width).attr('fill', 'steelblue')
var g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
// var gText = svg.append('g').attr('transform', `translate(${margin.left / 2 - 20}, ${innerHeight / 2})`)
// var gText = svg.append('g').attr('transform', `translate(${margin.left / 2 - 20}, ${innerHeight / 2})`)




const render = data => {
    var xScale = d3.scaleBand().domain(data.map(d => d.country)).range([0, innerWidth]).padding(0.2)
    var yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.population)]).range([innerHeight, 0])

    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    g.selectAll('rect').data(data).enter().append('rect')

        .attr('width', xScale.bandwidth()).attr('height', d => yScale(d.population))
        .attr('x', d => xScale(d.country))
        .attr('y', d => yScale(d.population))
    g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`)
    g.append('g').call(yAxis)
    // g.append('g').selectAll('text').data(data).enter().append('text').text(d => d.population).attr('x', xScale.bandwidth()).attr('y', d => yScale(d.country))

    // g.append('g').attr('transform', `translate(${-70},${innerHeight / 2})`).append('text').attr('text-anchor', 'middle').attr('transform', ``).text('country')
    // gText.append('text').text('Country').attr('transform', `rotate(-90)`)
    // g.append('text').text('ok')
    // g.append('text').text('POPULATION').attr('y', innerHeight + 40).attr('x', innerWidth / 2)
}
d3.csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population
    });
    console.log('data csv', data)
    render(data);
})