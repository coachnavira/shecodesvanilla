// update the city name and temperature
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
  let emoji = response.data.condition.icon;

  console.log(response.data);

  cityInput.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  dateElement.innerHTML = formatDate(date);
  emojiElement.innerHTML = emoji;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateWeather);

// in order to use the API, you will need to add a link to AJAX with Axios and place it in the header
