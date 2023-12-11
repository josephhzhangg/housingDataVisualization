


// Front-end function
function getCorrelation() {
  const category1 = document.getElementById('category1').value;
  const category2 = document.getElementById('category2').value;

  // Retrieve the correlation from the hardcoded matrix
  const correlationValue = correlationMatrix[category1][category2];

  // Display the result
  document.getElementById('correlationResult').textContent = `Correlation between ${category1} and ${category2} is ${correlationValue}`;
  console.log("correlationVALUE!!", correlationValue);
}

const correlationMatrix = {
  "longitude": {
    "longitude": 1,
    "latitude": -0.9247,
    "housing_median_age": -0.1117,
    "median_income": -0.0208,
    "median_house_value": -0.0475,
    "rooms_per_household": -0.03,
    "population_per_household": 0.0008,
    "bedrooms_to_rooms_ratio": 0.1025,
    "age_income_interaction": -0.0931
  },
  "latitude": {
    "longitude": -0.9247,
    "latitude": 1,
    "housing_median_age": 0.0136,
    "median_income": -0.0757,
    "median_house_value": -0.143,
    "rooms_per_household": 0.1087,
    "population_per_household": -0.0012,
    "bedrooms_to_rooms_ratio": -0.1225,
    "age_income_interaction": -0.0363
  },
  "housing_median_age": {
    "longitude": -0.1117,
    "latitude": 0.0136,
    "housing_median_age": 1,
    "median_income": -0.1182,
    "median_house_value": 0.1052,
    "rooms_per_household": -0.1474,
    "population_per_household": 0.0149,
    "bedrooms_to_rooms_ratio": 0.1345,
    "age_income_interaction": 0.5881
  },
  "median_income": {
    "longitude": -0.0208,
    "latitude": -0.0757,
    "housing_median_age": -0.1182,
    "median_income": 1,
    "median_house_value": 0.6893,
    "rooms_per_household": 0.3093,
    "population_per_household": 0.0215,
    "bedrooms_to_rooms_ratio": -0.6216,
    "age_income_interaction": 0.6593
  },
  "median_house_value": {
    "longitude": -0.0475,
    "latitude": -0.143,
    "housing_median_age": 0.1052,
    "median_income": 0.6893,
    "median_house_value": 1,
    "rooms_per_household": 0.1437,
    "population_per_household": -0.0194,
    "bedrooms_to_rooms_ratio": -0.2604,
    "age_income_interaction": 0.5894
  },
  "rooms_per_household": {
    "longitude": -0.03,
    "latitude": 0.1087,
    "housing_median_age": -0.1474,
    "median_income": 0.3093,
    "median_house_value": 0.1437,
    "rooms_per_household": 1,
    "population_per_household": -0.0048,
    "bedrooms_to_rooms_ratio": -0.399,
    "age_income_interaction": 0.129
  },
  "population_per_household": {
    "longitude": 0.0008,
    "latitude": -0.0012,
    "housing_median_age": 0.0149,
    "median_income": 0.0215,
    "median_house_value": -0.0194,
    "rooms_per_household": -0.0048,
    "population_per_household": 1,
    "bedrooms_to_rooms_ratio": 0.0029,
    "age_income_interaction": 0.035
  },
  "bedrooms_to_rooms_ratio": {
    "longitude": 0.1025,
    "latitude": -0.1225,
    "housing_median_age": 0.1345,
    "median_income": -0.6216,
    "median_house_value": -0.2604,
    "rooms_per_household": -0.399,
    "population_per_household": 0.0029,
    "bedrooms_to_rooms_ratio": 1,
    "age_income_interaction": -0.3681
  },
  "age_income_interaction": {
    "longitude": -0.0931,
    "latitude": -0.0363,
    "housing_median_age": 0.5881,
    "median_income": 0.6593,
    "median_house_value": 0.5894,
    "rooms_per_household": 0.129,
    "population_per_household": 0.035,
    "bedrooms_to_rooms_ratio": -0.3681,
    "age_income_interaction": 1
  }
};




google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // Data: Coefficients and Estimates
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Coefficient');
  data.addColumn('number', 'Estimate');
  data.addRows([
    ['Intercept', 204673.5],
    ['longitude', 6631.7],
    ['latitude', 5123.6],
    ['housing_median_age', 1194.8],
    ['median_income', 79954.1],
    ['near_water1', 8753.1],
    ['Rooms_per_Household', 1859.5],
    ['Population_per_Household', 982.0],
    ['Bedrooms_to_Rooms_Ratio', 6544.0],
    ['age_income_interaction', 11564.5]
    // Add more data rows here
  ]);

  // Define chart options
  const options = {
    title: 'Coefficient Estimates',
    pieHole: 0.4,
    colors: ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'yellow', 'brown', 'gray'],
    pieSliceText: 'label',
    pieSliceTextStyle: {
      color: 'black',
    },
  };

  // Create the pie chart
  const chart = new google.visualization.PieChart(document.getElementById('coefficient-pie-chart'));
  chart.draw(data, options);
}