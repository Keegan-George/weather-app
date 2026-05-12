import "./styles.css";

//visual crossing api details
const API_KEY = "CZB8FQH63WGKAKCPYE7XCC2MQ";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

//dom elements
const locationInput = document.querySelector("#location");
const form = document.querySelector("form");

async function getWeather(location) {
  const response = await fetch(`${BASE_URL}${location}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
}

function processWeatherData(weatherResponse) {
  return {
    location: weatherResponse.resolvedAddress,
    description: weatherResponse.description,
    temp: weatherResponse.currentConditions.temp,
    feelslike: weatherResponse.currentConditions.feelslike,
    icon: weatherResponse.currentConditions.icon,
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  getWeather(locationInput.value).then((result) =>
    console.log(processWeatherData(result)),
  );
});
