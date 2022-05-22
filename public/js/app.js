console.log("Client Side Javascript File is Loaded")
//client side javascript will run here
//Fetch data from puzzle.mead.io/puzzle API on client side javascript

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//   response.json().then((data)=>{
//     console.log(data)
//   })
// }  
// )

// const url = "https://nodecourseudemy.kevalshah.repl.co/weather?address=delhi"
// fetch(url).then((response)=>{
//   response.json().then((data)=>{
//     if(data.error){
//       return console.log(data.error)
//     }
//     console.log(data)
//     console.log(data.address)
//     console.log(data.location)
//     console.log(data.forecast)
//   })
// })


const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})