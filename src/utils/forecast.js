const request = require('request')

const forecast = (lat, long, callback )=>{
  const url = "http://api.weatherstack.com/current?access_key=f53ed14bb7d8fbe24f042c5e6d1dc89b&query=" + lat + "," + long
  // console.log(url)

  request({url, json:true},(error, {body})=>{//destructuring
   if(error){//for lower level like internet connection not working
    callback("Unable to connect to weather API",undefined)
  }else if(body.error){
    callback("Unable to find location", undefined)
  }  
  else{
    const data = body
    // console.log(data.current.weather_descriptions[0] + ". It is currently "+ data.current.temperature + " degrees. It feels like " + data.current.feelslike + " out there" )
    callback(undefined, `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees. It feels like  ${data.current.feelslike} out there`)
  }
    
    
})
  
}

module.exports = forecast