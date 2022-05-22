
// const path = require('path')
// const express = require('express')
// const hbs = require('hbs')
// const app = express()

// //Define path for express config
// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')
// //setup handlebars engine and views location as we have changed it to templates
// app.set('view engine','hbs')
// app.set('views',viewPath)
// hbs.registerPartials(partialsPath)


// //setup static directory to serve
// app.use(express.static(publicDirectoryPath))





// // console.log(__dirname)
// // console.log(__filename)
// // console.log(path.join(__dirname, "../public"))
// // app.get('',(req, res)=>{
// //   res.send("<h1>Hello Express !!!</h1>")
// // })
// // app.get('/help',(req, res)=>{
// //   res.send([{
// //     name : "keval"
// //   },{
// //     name : "Rahul"
// //   }    ])
// // })
// // app.get('/about',(req, res)=>{
// //   res.send("<h1>About Page!!</h1>")
// // })

// //To run in browser
// // https://nodecourseudemy.kevalshah.repl.co/help.html

// app.get('/weather',(req, res)=>{
//   res.send({
//     location : "Mumbai",
//     forecast : 30
//   })
// })

// app.get('',(req, res)=>{
//   res.render('index',{
//     title : 'Weather App',
//     name : 'Keval Shah'
//   })
// })

// app.get('/about',(req, res)=>{
//   res.render('about',{
//     title : 'About Me',
//     name : 'Keval Shah'
//   })
// })

// app.get('/help',(req, res)=>{
//   res.render('help',{
//     title : 'Help Page!!!',
//     helpText : 'This is help Text',
//     name : "Keval Shah"
//   })
// })
// app.get('/help/*',(req, res)=>{
//   res.render("404",{
//     title:'404',
//     name:'Keval Shah',
//     errorMessage:'Help Article not found'
//   })
// })

// app.get('*',(req, res)=>{
//   res.render('404',{
//     title:'404',
//     name:'Keval Shah',
//     errorMessage:'Page not found'
//   })
//   // res.render('help',{
//   //   title : 'Help Page!!!',
//   //   helpText : 'This is help Text',
//   //   name : "Keval Shah"
//   // })
// })
// //look at public folder then at app.js get calls
// app.listen(3000, ()=>{
//   console.log("server is up on port 3000.")
// })

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
console.log(publicDirectoryPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

//weather App
app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide the address'
    })
  }
  console.log(req.query.address)
  geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
    if(error){
       return res.send({error})
    }
    console.log("lat long and loc is ",latitude, longitude, location)
  
  forecast(latitude, longitude, (error,   forecastData) => {
    if(error){
      return res.send({error})
    }
    console.log('Location',location)
    console.log('Data', forecastData)
    res.send({
      // address : req.query.address,
      forecast: forecastData,
      location,
      address : req.query.address
      
  })
  })
    
  })  
  
})

app.get('/products',(req, res)=>{
  if(!req.query.search){//query string
     return res.send({
      error : 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})
const port =process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})