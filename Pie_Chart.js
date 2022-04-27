var data = [{
    values: [41.2, 19.3, 4.3, 3.5, 2.6, 1.9, 1.9, 1.8, 1.7, 21.8],
    labels: ['Bitcoin', 'Ethereum', 'Tether', 'BNB', 'USD-Coin', 'XRP','Solana','Terra','Cardano','Other'],
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500
  };
  
  Plotly.newPlot('PieChart', data, layout);
  