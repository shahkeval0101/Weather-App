const request = require('request')

const geocode = (address, callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2V2YWxzaGFoOTA5MDkiLCJhIjoiY2wyeXZraWFkMDAzNjNpcDljejlndGh2ZiJ9.VYBBaUd8U--t4zb4NLyGdw&limit=1'
  request({url},(error, {body})=>{
    // console.log(JSON.parse(response.body).features.length)
    if(error){
     callback("Unable to connect to location services", undefined) 
    }else if (JSON.parse(body).features.length === 0){
      callback("Unable to Geocode the the location",undefined)
    }
    else{
      const data = JSON.parse(body)
       const longitude = data.features[0].center[0]
       const latitude = data.features[0].center[1]
      const placeName = data.features[0].place_name
      callback(undefined, {
        longitude :  data.features[0].center[0] , 
        latitude : data.features[0].center[1] ,
        location : data.features[0].place_name
      })
    }
  })


}


module.exports = geocode