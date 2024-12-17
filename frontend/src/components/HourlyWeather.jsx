import React from "react";

function HourlyWeather({hourlyData, day}){
    if(!hourlyData) return null;

    function forecastHour(forecast, index){
        return(
            <div key={index}>
                <div>
                    <p>{forecast.time.split(" ")[1]}</p>
                    <p>{forecast.condition.text}</p>
                    <p>Temperature: {forecast.temp_c}°C</p>
                    <p>Feels like: {forecast.feelslike_c}°C</p>
                    <br />
                </div>
            </div>
        )
    }

    return(
        <div>
            <h2>Hourly Forecast for {day}</h2>
            {hourlyData.length > 1 ? (
                hourlyData.map((forecast, index) => forecastHour(forecast, index))
            ) : (<p>Loading Hourly Data...</p>)}
        </div>
    )
    
}

export default HourlyWeather;