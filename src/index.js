import "./styles.css";

//visual crossing api details
const API_KEY = "CZB8FQH63WGKAKCPYE7XCC2MQ";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

//dom elements
const locationInput = document.querySelector("#location-search");
const form = document.querySelector("form");

async function getWeather(location) {
  try {
    const response = await fetch(`${BASE_URL}${location}?key=${API_KEY}`);

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
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = locationInput.value;

  if (!location) {
    return;
  }

  getWeather(locationInput.value).then((result) =>
    console.log(processWeatherData(result)),
  );
});
