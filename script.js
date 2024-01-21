const weatherDataEl = document.getElementById("weather-data");

const apiKey = "c0aac9ef9c13829de6439e033cdfd34e"

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  // console.log(cityValue);
  getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

    if(!response.ok) {
      throw new Error("Network Problem Ocurr")
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp)

    const description = data.weather[0].description

    const icon = data.weather[0].icon

    const details = [
      `Feels like: ${data.main.feels_like}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`
    ]

    weatherDataEl.querySelector("#icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`

    weatherDataEl.querySelector("#temperature").textContent = `${temperature}°C`

    weatherDataEl.querySelector("#description").textContent = description

    weatherDataEl.querySelector("#details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("")

    // console.log(data);
  
  } catch (error) {

    weatherDataEl.querySelector("#icon").innerHTML = ""

    weatherDataEl.querySelector("#temperature").textContent = ""

    if (!cityValue) {
      weatherDataEl.querySelector("#description").textContent = "Please, Provide a value"
    } else {
      weatherDataEl.querySelector("#description").textContent = "An error ocurred, try again later"
    }


    weatherDataEl.querySelector("#details").innerHTML = ""
  }
}