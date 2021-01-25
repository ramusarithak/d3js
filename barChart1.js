var height = 500
var width = 500
var margin = { left: 100, top: 20, right: 40, bottom: 40 }
var innerHeight = height - margin.top - margin.bottom
var innerWidth = width - margin.left - margin.right

var svg = d3.select('body').append('svg').attr('height', height).attr('width', width).attr('fill', 'steelblue')
var g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

const barChart = data => {
    const formatNumber = (number) => d3.format('.3s')(number)
    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.population)]).range([0, innerWidth])
    const yScale = d3.scaleBand().domain(data.map(d => d.country)).range([0, innerHeight]).padding(0.1)


    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)



    g.selectAll('rect').data(data).enter().append('rect').attr('width', d => xScale(d.population)).attr('height', yScale.bandwidth()).attr('y', d => yScale(d.country))

    g.append('g').selectAll('text').data(data).enter().append('text').text(d => formatNumber(d.population)).attr('x', d => xScale(d.population)).attr('y', d => yScale(d.country) + 30)
    // g.append('g').selectAll('text').data(data).enter().append('text').text(d => formatNumber(d.population)).attr('x', d => xScale(d.population)).attr('y', d => yScale(d.country) + 30).attr('fill', 'steelblue')
    g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
    g.append('g').call(yAxis)

}

d3.csv('data.csv').then(d => {
    console.log(d)
    d.forEach(data => {
        data.population = +data.population
    })
    barChart(d)
})