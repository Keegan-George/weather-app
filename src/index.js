import "./styles.css";

//visual crossing api details
const API_KEY = "CZB8FQH63WGKAKCPYE7XCC2MQ";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

async function getWeather(location) {
  const response = await fetch(`${BASE_URL}${location}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
}

function processWeatherData(weatherResponse) {
  return {
    description: weatherResponse.description,
    temp: weatherResponse.currentConditions.temp,
    feelslike: weatherResponse.currentConditions.feelslike,
    icon: weatherResponse.currentConditions.icon,
  };
}

getWeather("las vegas").then((result) =>
  console.log(processWeatherData(result)),
);
