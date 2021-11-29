const temperatureSelector = document.querySelector(".temperature")
const citySelector = document.querySelector(".city");
const descriptionSelector = document.querySelector(".description")
const imageSelector = document.querySelector(".image-icon")
const dateSelector = document.querySelector('.date-container')
const cardContainerSelector = document.querySelector('.card-container')

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        setDate()
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude
            let lat = position.coords.latitude
            getWeatherByPosition(long, lat).then((response => { return response.json() }),()=>{
                cardContainerSelector.style.visibility= "visible"
            }).then((data) => {
                if(data) {
                const temperature = data.main.feels_like
                const city = data.name
                const description = data.weather[0].main
                const icon = data.weather[0].icon
                temperatureSelector.innerHTML = parseInt(temperature) + " <span>&deg;</span>"
                citySelector.textContent = city
                descriptionSelector.textContent = description.toUpperCase()
                console.log(icon)
                console.log(imageSelector)
                imageSelector.src = "./asset/icons/" + icon + ".png"
                cardContainerSelector.style.visibility= "visible"
                }

            })


        }
        )
    }
})


function getWeatherByPosition(long, lat) {
    const apiKey = "5003c5431558e45afd00e13fd860b46d"
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`
    return fetch(api)

}

function setDate() {
    const months = new Array();
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";
    const date = new Date()
    let name = months[date.getMonth()]
    let day = date.getDate()
    console.log(date)
    dateSelector.textContent = day + " " + name
}