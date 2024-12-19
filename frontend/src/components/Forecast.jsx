import React, { useState, useEffect } from "react";
import axios from "axios";

function Forecast(props) {
  const [forecastData, setForecastData] = useState([]);

  function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  function dayAndMonth(dateString){
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
    })
  }

  useEffect(() => {
    async function getForecast() {
      try {
        const response = await axios.post("http://localhost:4000/get-forecast", {
          location: props.locationName,
        });
        console.log(response.data);
        setForecastData(response.data);
      } catch (error) {
        console.error("Error getting forecast data: ", error);
      }
    }

    getForecast();
  }, [props.locationName]);

  function forecastDay(forecast, index) {
    return (
      <div key={index}>
        <div>
          <p>{getDayOfWeek(forecast.date)}, {dayAndMonth(forecast.date)}</p>
          <img src={forecast.day.condition.icon} alt="Weather icon" />
          <p>{forecast.day.condition.text}</p>
        </div>
        <div>
          <p>{forecast.day.daily_chance_of_rain > 0 ? (
            <div>
              <p>Chance of rain: {forecast.day.daily_chance_of_rain}%</p>
              <p>Precipitation: {forecast.day.totalprecip_mm}mm</p>
            </div>) : forecast.day.daily_chance_of_snow > 0 && (
            <div>
              <p>Chance of snow: {forecast.day.daily_chance_of_snow}%</p>
              <p>Precipitation: {forecast.day.totalprecip_mm}mm</p>
            </div>
              )}
          </p>
          
        </div>
        <div>
          <p>Average Temperature: {forecast.day.avgtemp_c}°C</p>
          <p>Max Temperature: {forecast.day.maxtemp_c}°C</p>
          <p>Min Temperature: {forecast.day.mintemp_c}°C</p>
          <p>RealFeel: {forecast.day.avgtemp_c}°C</p>
          <p>Wind: {forecast.day.maxwind_kph} km/h</p>
          <button onClick={() => {
              console.log(forecast.hour);
              props.hourlyWeather({
                day: getDayOfWeek(forecast.date),
                hours: forecast.hour,
              })
              }}>Hourly Forecast</button>
          <br />
        </div>
      </div>
    );
  }

return (
  <div>
    <h2>Forecast for next 3 days</h2>
    {forecastData.length > 1 ? (
      forecastData.slice(1).map((forecast, index) => forecastDay(forecast, index))
    ) : (
      <p>Loading forecast data...</p>
    )}
  </div>
);
}

export default Forecast;
