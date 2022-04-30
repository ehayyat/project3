var names = []
var volume = []
d3.json("http://localhost:8000/get_data").then(function (data) {
  var select = d3.select("#selDataset")
  select.append('select')
  newselect = select.enter()
  for (let i = 0; i < data['data'].length; i++) {
    newselect.enter().append("option").text("hello")
    names.push(data['data'][i]['name'])
    volume.push(data['data'][i]['quote']['USD']['market_cap_dominance'])
  }
  var ultimateColors = [
    '#392f5a',
    '#444267',
    '#4f5575',
    '#5a6882',
    '#657b8f',
    '#718d9d',
    '#7ca0aa',
    '#87b3b7',
    '#92c6c5',
    '#9dd9d2'    
  ]  
  var data = [{
    values: volume.slice(0, 10),
    labels: names.slice(0, 10),
    type: 'pie',
    marker: {
      colors: ultimateColors
    }
  }];

  var layout = {
    legend: {
      x: -5,
      y: 0
    },
    height: 400,
    width: 450,
    title: 'Top 10 by Market Dominance',
    paper_bgcolor: "#fff8f0"
  };
  Plotly.newPlot('PieChart', data, layout);
})

var names2 = []
var percentchange = []
d3.json("http://localhost:8000/get_data").then(function (data) {
  for (let i = 0; i < data['data'].length; i++) {
    names2.push(data['data'][i]['name'])
    percentchange.push(Math.log(data['data'][i]['quote']['USD']['volume_24h']))
  }
  var data = [{
    x: names2.slice(0, 14),
    y: percentchange.slice(0, 14),
    type: 'bar',
    marker: {
      color: '#392F5A'
    }
  }];

  var layout = {
    height: 400,
    width: 450,
    paper_bgcolor: "#fff8f0",
    plot_bgcolor:  "#fff8f0",
    title: 'Crypto by Volume in last 24h',
    yaxis: {
      title: "Volume (log)"
    }
  };
  Plotly.newPlot('BarChart', data, layout);
})

var pctchange = []
var percentlabels = ["1h", "24h", "7d", "30d", "60d", "90d"]
d3.json("http://localhost:8000/get_data").then(function (data) {
  console.log("hello")
  for (let i = 0; i < data['data'].length; i++) {
    if (data['data'][i]['name'] == "Bitcoin") {
      pctchange.push(data['data'][i]['quote']['USD']['percent_change_1h'])
      pctchange.push(data['data'][i]['quote']['USD']['percent_change_24h'])
      pctchange.push(data['data'][i]['quote']['USD']['percent_change_7d'])
      pctchange.push(data['data'][i]['quote']['USD']['percent_change_30d'])
      pctchange.push(data['data'][i]['quote']['USD']['percent_change_60d'])
      pctchange.push(data['data'][i]['quote']['USD']['percent_change_90d'])
    }
  }
  var data = [{
    x: percentlabels,
    y: pctchange,
    type: 'bar',
    marker: {
      color: '#392F5A'
    }
  }];
  var layout = {
    height: 400,
    width: 450,
    title: 'Crypto Percent Change',
    paper_bgcolor: "#fff8f0",
    plot_bgcolor:  "#fff8f0",
    yaxis: {
      title: {
        text: 'Percent',
      }
    }
  };
  Plotly.newPlot('BarChart2', data, layout);
})
d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var cryptoname = dropdownMenu.property("value");

  d3.json("http://localhost:8000/get_data").then(function (data) {
    pctchange = []
    for (let i = 0; i < data['data'].length; i++) {
      if (data['data'][i]['name'] == cryptoname) {
        pctchange.push(data['data'][i]['quote']['USD']['percent_change_1h'])
        pctchange.push(data['data'][i]['quote']['USD']['percent_change_24h'])
        pctchange.push(data['data'][i]['quote']['USD']['percent_change_7d'])
        pctchange.push(data['data'][i]['quote']['USD']['percent_change_30d'])
        pctchange.push(data['data'][i]['quote']['USD']['percent_change_60d'])
        pctchange.push(data['data'][i]['quote']['USD']['percent_change_90d'])
      }
    }
    Plotly.restyle("BarChart2", "y", [pctchange])
    Plotly.restyle("BarChart2",)
    var update = {
      title: `${cryptoname} percent changes`, // updates the title
    }
    Plotly.relayout("BarChart2", update)
  })
}