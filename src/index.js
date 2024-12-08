// MAIN WEATHER TEMPERATURE
// update the weather information based on the city submitted
function updateCityTemp(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityInput = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#current-emoji");

  console.log(response.data);

  cityInput.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(
    temperature
  )} <span class="current-unit">°C</span>`;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `Humidity: <strong>${humidity}%</strong>, `;
  windElement.innerHTML = `Wind: <strong>${wind}km/h</strong>`;
  dateElement.innerHTML = formatDate(date);
  emojiElement.innerHTML = `<img src=${response.data.condition.icon_url} />`;
}

// format the date
function formatDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}, `;
}

// access the weather API for the particular city
function accessAPI(city) {
  let apiKey = "at534282bb04c7407fb1fcb329do3c45";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateCityTemp);
}

// search for the city
function updateWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  accessAPI(searchInput.value);
}

// The purpose of this function is to update the forecast after the city is submitted
function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="weather-forecast-day">
                <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-emoji">⛅️</div>
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">
                            <strong>15°</strong>
                        </div>
                        <div class="weather-forecast-temperature">
                            30°
                        </div>
                    </div>
            </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateWeather);

// in order to use the Weather API, you will need to add a link to AJAX with Axios and place it in the header

displayForecast();
