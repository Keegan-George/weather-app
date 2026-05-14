import "./styles.css";

//visual crossing query parameters
const API_KEY = "CZB8FQH63WGKAKCPYE7XCC2MQ";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

//dom elements
const currentTemperatureEle = document.querySelector(".current-temperature");
const locationEle = document.querySelector(".location");
const feelsLikeEle = document.querySelector(".feels-like");

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
    feelslike: weatherResponse.currentConditions.feelslike,
    humidity: weatherResponse.currentConditions.humidity,
    icon: weatherResponse.currentConditions.icon,
    temp: weatherResponse.currentConditions.temp,
    uvindex: weatherResponse.currentConditions.uvindex,
    visibility: weatherResponse.currentConditions.visibility,
    windspeed: weatherResponse.currentConditions.windspeed,
    feelslike_f: celciusToFahrenheit(
      weatherResponse.currentConditions.feelslike,
    ),
    temp_f: celciusToFahrenheit(weatherResponse.currentConditions.temp),
    visibility_mi: kmToMiles(weatherResponse.currentConditions.visibility),
    windspeed_mi: kmToMiles(weatherResponse.currentConditions.windspeed),
  };
}

function updateWeatherDisplay() {
  locationEle.textContent = currentWeatherData.location;

  currentTemperatureEle.textContent = isMetric
    ? currentWeatherData.temp
    : currentWeatherData.temp_f;

  feelsLikeEle.textContent = isMetric
    ? currentWeatherData.feelslike
    : currentWeatherData.feelslike_f;
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
