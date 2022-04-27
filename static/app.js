console.log('l')
d3.json("http://localhost:8000/get_data").then(function(data){
    names = []
    for(let i =0 ; i < data['data'].length; i++){
        names.push(data['data'][i]['name'])
    }
    console.log(names)
})