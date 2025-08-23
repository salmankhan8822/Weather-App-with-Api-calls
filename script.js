const API_KEY = "";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

// Page load پر last searched city load کریں
document.addEventListener("DOMContentLoaded", () => {
  let lastCity = localStorage.getItem("lastCity");
  if (lastCity) fetchWeather(lastCity);
});

// Search button click event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return alert("Please enter a city name");
  fetchWeather(city);
  cityInput.value = "";
});

// Fetch weather data
async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}&lang=ur`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("City not found or API key is invalid");

    const data = await response.json();
    showWeather(data);

    localStorage.setItem("lastCity", city);
  } catch (err) {
    alert(err.message);
  }
}

// Show weather in UI
function showWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
