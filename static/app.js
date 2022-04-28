console.log('l')
d3.json("http://localhost:8000/get_data").then(function(data){
    names = []
    volume = []
    for(let i =0 ; i < data['data'].length; i++){
        names.push(data['data'][i]['name'])
        volume.push(data['data'][i]['market_cap_dominance'])
    }
})


var data = [{
    values: volume,
    labels: names,
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500
  };
  
  Plotly.newPlot('PieChart', data, layout);