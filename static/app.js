var names = []
var volume = []
d3.json("http://localhost:8000/get_data").then(function(data){
  var select = d3.select("#selDataset")
console.log(select)
// select
//   .data(data)
//   .enter()
//     .append("option")
//     .attr("value", function (d) { return d.name; })
//     .text(function (d) { return d.name; });
select.append('select')
newselect = select.enter()
    for(let i =0 ; i < data['data'].length; i++){
      newselect.enter().append("option").text("hello")
        names.push(data['data'][i]['name'])
        volume.push(data['data'][i]['quote']['USD']['market_cap_dominance'])
    }

    var data = [{
      values: volume.slice(0,10),
      labels: names.slice(0,10),
      type: 'pie'
    }];
    
    var layout = {
        height: 400,
        width: 500,
        title: 'Top 10 CryptoCurrencies cuz why not!'
    };
      
    Plotly.newPlot('PieChart', data, layout);
  })


var names2 = []
var percentchange = []
d3.json("http://localhost:8000/get_data").then(function(data){

    for(let i =0 ; i < data['data'].length; i++){

        names2.push(data['data'][i]['name'])
        percentchange.push(data['data'][i]['quote']['USD']['volume_change_24h'])
    }

    var data = [{
      x: names2.slice(0,10),
      y: percentchange.slice(0,10),
      type: 'bar'
    }];
    
    var layout = {
        height: 400,
        width: 500,
        title: 'Top 10 CryptoCurrencies cuz why not!'
    };
      
    Plotly.newPlot('BarChart', data, layout);
  })

var pctchange= []
var percentlabels = ["percentchange1h","percentchange24h","percentchange7d","percentchange30d","percentchange60d","percentchange90d"]
d3.json("http://localhost:8000/get_data").then(function(data){
console.log("hello")
    for(let i =0 ; i < data['data'].length; i++){
      if (data['data'][i]['name'] == "Bitcoin") {
        console.log(data['data'][i])

        pctchange.push (data['data'][i]['quote']['USD']['percent_change_1h'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_24h'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_7d'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_30d'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_60d'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_90d'])

      }

    }

    var data = [{
      x: percentlabels,
      y: pctchange,
      type: 'bar'
    }];
    
    var layout = {
        height: 400,
        width: 500,
        title: 'Top 10 CryptoCurrencies cuz why not!'
    };
      
    Plotly.newPlot('BarChart2', data, layout);
  })

  d3.selectAll("#selDataset").on("change", updatePlotly);

  function updatePlotly() {

    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var cryptoname = dropdownMenu.property("value");

    d3.json("http://localhost:8000/get_data").then(function(data){
    pctchange = []
    for(let i =0 ; i < data['data'].length; i++){
      if (data['data'][i]['name'] == cryptoname) {
        console.log(data['data'][i])

        pctchange.push (data['data'][i]['quote']['USD']['percent_change_1h'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_24h'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_7d'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_30d'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_60d'])
        pctchange.push (data['data'][i]['quote']['USD']['percent_change_90d'])

      }
    
  }
  Plotly.restyle("BarChart2", "y", [pctchange]);
  Plotly.restyle("BarChart2", )
  var update = {
    title: `${cryptoname} percent changes`, // updates the title
};
Plotly.relayout("BarChart2", update)
    })
}