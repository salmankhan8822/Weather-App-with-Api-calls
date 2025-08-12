const API_KEY = "YOUR-API-KEY";


let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let weatherIcon = document.getElementById("weatherIcon");

document.addEventListener("DOMContentLoaded", () => {
  let lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    fetchWeather(lastCity);
  }
});

searchBtn.addEventListener("click", () => {
  let city = cityInput.value.trim();
  if (city === "") return alert("Please enter the city name");
  fetchWeather(city);
  cityInput.value = ""; // clear input
});

async function fetchWeather(city) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ur`;
    let response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    let data = await response.json();
    showWeather(data);
    localStorage.setItem("lastCity", city);
  } catch (error) {
    alert(error.message);
  }
}

function showWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

