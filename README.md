# Weather-App
Application deployed at https://keval-weather-application.herokuapp.com/

The Entire Flow of the Application is like this
The user will initially fill the form and click on submit on browser
The browser js will hit the api endpoint with fetch request(weather/address=search_term) on click of submit
The apis role will come into play
Now when the api is hit corresponding api.get('/weather?address=location') is triggered
First Geocoding is done and longitude and latitude are returned
Then weather api returns corresponding forecast on that latitude and longitude
Now res.send will send JSON object with forecast data, location
Then fetch apis callback method will take it and display it to the UI element

