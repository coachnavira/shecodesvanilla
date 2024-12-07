// update the city name and temperature
function updateCityTemp(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityInput = document.querySelector("#city");
  cityInput.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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
