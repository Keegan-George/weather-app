import "./styles.css";

//visual crossing query parameters
const API_KEY = "CZB8FQH63WGKAKCPYE7XCC2MQ";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

//dom elements
const locationEle = document.querySelector(".location");
const currentTemperatureValue = document.querySelector(
  ".current-temperature .value",
);
const currentTemperatureUnit = document.querySelector(
  ".current-temperature .unit",
);
const descriptionEle = document.querySelector(".description");
const feelsLikeValue = document.querySelector(".feels-like .value");
const feelsLikeUnit = document.querySelector(".feels-like .unit");
const humidityValue = document.querySelector(".humidity .value");
const uvIndexValue = document.querySelector(".uv-index .value");
const visibilityValue = document.querySelector(".visibility .value");
const visibilityUnit = document.querySelector(".visibility .unit");
const windSpeedValue = document.querySelector(".wind-speed .value");
const windSpeedUnit = document.querySelector(".wind-speed .unit");

const form = document.querySelector("form");
const locationInput = document.querySelector("#location-search");
const celciusButton = document.querySelector(".celcius_btn");
const fahrenheitButton = document.querySelector(".fahrenheit_btn");

//constants
let isMetric = true;
let currentWeatherData = undefined;

async function getWeather(location) {
  try {
    const response = await fetch(
      `${BASE_URL}${location}?unitGroup=metric&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Response: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error, { cause: error });
  }
}

function processWeatherData(weatherResponse) {
  return {
    location: weatherResponse.resolvedAddress,
    description: weatherResponse.description,
    feelslike: Math.round(weatherResponse.currentConditions.feelslike),
    humidity: Math.round(weatherResponse.currentConditions.humidity),
    icon: weatherResponse.currentConditions.icon,
    temp: Math.round(weatherResponse.currentConditions.temp),
    uvindex: weatherResponse.currentConditions.uvindex,
    visibility: Math.round(weatherResponse.currentConditions.visibility),
    windspeed: Math.round(weatherResponse.currentConditions.windspeed),
    temp_f: Math.round(
      celciusToFahrenheit(weatherResponse.currentConditions.temp),
    ),
    feelslike_f: Math.round(
      celciusToFahrenheit(weatherResponse.currentConditions.feelslike),
    ),
    visibility_mi: Math.round(
      kmToMiles(weatherResponse.currentConditions.visibility),
    ),
    windspeed_mi: Math.round(
      kmToMiles(weatherResponse.currentConditions.windspeed),
    ),
  };
}

function updateWeatherDisplay() {
  locationEle.textContent = currentWeatherData.location;

  currentTemperatureValue.textContent = isMetric
    ? currentWeatherData.temp
    : currentWeatherData.temp_f;

  currentTemperatureUnit.textContent = isMetric ? "\u00B0C" : "\u00B0F";

  descriptionEle.textContent = currentWeatherData.description;

  feelsLikeValue.textContent = isMetric
    ? currentWeatherData.feelslike
    : currentWeatherData.feelslike_f;

  feelsLikeUnit.textContent = isMetric ? "\u00B0C" : "\u00B0F";

  humidityValue.textContent = currentWeatherData.humidity;
  uvIndexValue.textContent = currentWeatherData.uvindex;

  visibilityValue.textContent = isMetric
    ? currentWeatherData.visibility
    : currentWeatherData.visibility_mi;

  visibilityUnit.textContent = isMetric ? "km" : "mi";

  windSpeedValue.textContent = isMetric
    ? currentWeatherData.windspeed
    : currentWeatherData.windspeed_mi;

  windSpeedUnit.textContent = isMetric ? "km/h" : "mph";
}

function celciusToFahrenheit(temp) {
  return temp * (9 / 5) + 32;
}

function kmToMiles(distance) {
  return distance / 1.609;
}

celciusButton.addEventListener("click", () => {
  if (isMetric) {
    return;
  }

  isMetric = true;

  updateWeatherDisplay();
});

fahrenheitButton.addEventListener("click", () => {
  if (!isMetric) {
    return;
  }

  isMetric = false;

  updateWeatherDisplay();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = locationInput.value;

  if (!location) {
    return;
  }

  getWeather(location)
    .then((result) => (currentWeatherData = processWeatherData(result)))
    .then(() => updateWeatherDisplay());
});
