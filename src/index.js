// MAIN WEATHER TEMPERATURE
// The purpose of this function is to update the weather information based on the city submitted
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

  getForecast(response.data.city);
}

// The purpose of this function is to format the date
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

// THe purpose of this function is to access the weather API for the searched city
function accessAPI(city) {
  let apiKey = "at534282bb04c7407fb1fcb329do3c45";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateCityTemp);
}

// The purpose of this function is to search for the city
function updateWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  accessAPI(searchInput.value);
}

// FORECASTING
// The purpose of this function is to format the day according to API timestamp
function formatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = new Date(timestamp * 1000);

  return days[day.getDay()];
}

// The purpose of this function is to access the forecast API for the searched city
function getForecast(city) {
  let apiKey = "at534282bb04c7407fb1fcb329do3c45";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

// The purpose of this function is to update the forecast for the searched city
// ? review why the syntax function (day, index) works
function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <img src="${
                  day.condition.icon_url
                }" class="weather-forecast-emoji" />
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">
                            <strong>${Math.round(
                              day.temperature.maximum
                            )}°</strong>
                        </div>
                        <div class="weather-forecast-temperature">
                            ${Math.round(day.temperature.minimum)}°
                        </div>
                    </div>
            </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateWeather);

// NOTE: In order to use the Weather API, you will need to add a link to AJAX with Axios and place it in the header
