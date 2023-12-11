document.addEventListener('DOMContentLoaded', (event) => {
  const valueSlider = document.getElementById('valueSlider');
  const valueOutput = document.getElementById('valueOutput');

  valueOutput.textContent = valueSlider.value;

  valueSlider.addEventListener('input', function() {
    valueOutput.textContent = this.value;
    currentFilters.median_house_value = +this.value;
    updateVisualizations(); // Updated function name for clarity
  });
});


// Map setup
var mapWidth = 620;
var mapHeight = 800;
var mapSvg = d3.select("#californiaMap").append("svg")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

var projection = d3.geoConicConformal()
    .parallels([38 + 4 / 60, 38 + 26 / 60])
    .rotate([120 + 30 / 60], 0)
    //.fitSize([mapWidth, mapHeight], { type: "LineString", coordinates: [[-121.409591, 32.034156], [-116.581211, 39.009518]] });
    //.fitSize([mapWidth, mapHeight], { type: "LineString", coordinates: [[-121.409591, 32.034156], [-114.131211, 39.509518]] });
    .fitSize([mapWidth, mapHeight], { type: "LineString", coordinates: [[-124.509591, 32.534156], [-114.331211, 41.809518]] });

mapSvg.append('image')
    .attr('width', mapWidth)
    .attr('height', mapHeight)
    .attr('xlink:href', 'california_map.jpg');

// Scatterplot setup
var margin = { top: 20, right: 20, bottom: 50, left: 100 },
    scatterWidth = 960 - margin.left - margin.right,
    scatterHeight = 500 - margin.top - margin.bottom;

var scatterSvg = d3.select("#scatterplot").append("svg")
    .attr("width", scatterWidth + margin.left + margin.right)
    .attr("height", scatterHeight + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear().range([0, scatterWidth]);
var y = d3.scaleLinear().range([scatterHeight, 0]);
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

// Global filter settings
var currentFilters = {
  housing_median_age: 35, // Default value
  median_house_value: 250000 // Default value
};


// Data loading and processing
d3.csv("housing.csv").then(function(data) {
  data.forEach(function(d) {
    d.median_income = +d.median_income;
    d.median_house_value = +d.median_house_value;
    d.housing_median_age = +d.housing_median_age;
    var coords = projection([+d.longitude, +d.latitude]);
    d.mapX = coords[0];
    d.mapY = coords[1];
  });

  // Update domains for scatter plot
  x.domain(d3.extent(data, function(d) { return d.median_income; })).nice();
  y.domain(d3.extent(data, function(d) { return d.median_house_value; })).nice();

  // Append the X Axis
  scatterSvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + scatterHeight + ")")
      .call(xAxis);

  // Append X-Axis Label
  scatterSvg.append("text")
      .attr("class", "label")
      .attr("x", scatterWidth / 2)
      .attr("y", scatterHeight + margin.bottom - 10)
      .style("text-anchor", "middle")
      .text("Median Income");

  // Append the Y Axis
  scatterSvg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  // Append Y-Axis Label
  scatterSvg.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (scatterHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Median House Value");


  scatterSvg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.median_income); })
      .attr("cy", function(d) { return y(d.median_house_value); })
      .style("fill", function(d) {
        // Apply initial filters to scatterplot
        return (d.housing_median_age <= currentFilters.housing_median_age && 
                d.median_house_value <= currentFilters.median_house_value) ? "#69b3a2" : "none";
        });

  // Draw map points
  mapSvg.selectAll(".house")
      .data(data)
    .enter().append("circle")
      .attr("class", "house")
      .attr("cx", function(d) { return d.mapX; })
      .attr("cy", function(d) { return d.mapY; })
      .attr("r", 3)
      .attr("fill", "red")
      .style("display", function(d) {
        return (d.housing_median_age <= currentFilters.housing_median_age && 
                d.median_house_value <= currentFilters.median_house_value) ? "block" : "none";
      });
});


/*
// Update function for the houses on the map
function updateHouses() {
  mapSvg.selectAll(".house")
      .style("display", function(d) {
        return (d.housing_median_age <= currentFilters.housing_median_age && 
                d.median_house_value <= currentFilters.median_house_value) ? "block" : "none";
      });
}
*/
function updateVisualizations() {
  mapSvg.selectAll(".house")
      .style("display", function(d) {
        return (d.housing_median_age <= currentFilters.housing_median_age && 
                d.median_house_value <= currentFilters.median_house_value) ? "block" : "none";
      });

  scatterSvg.selectAll(".dot")
      .style("fill", function(d) {
        return (d.housing_median_age <= currentFilters.housing_median_age && 
                d.median_house_value <= currentFilters.median_house_value) ? "#69b3a2" : "none";
      });
}

d3.select("#ageSlider").on("input", function() {
  currentFilters.housing_median_age = +this.value;
  d3.select("#ageOutput").text(currentFilters.housing_median_age);
  updateVisualizations();
});
