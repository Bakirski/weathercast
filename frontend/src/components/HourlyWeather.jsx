import React from "react";

function HourlyWeather({hourlyData, day}){
    if(!hourlyData) return null;

    function forecastHour(forecast, index){
        return(
            <div key={index} className="flex flex-col items-center bg-slate-200 rounded-lg p-1">
                <p>{forecast.time.split(" ")[1]}</p>
                <p>{forecast.condition.text}</p>
                <p>Temperature: {forecast.temp_c}°C</p>
                <p>Feels like: {forecast.feelslike_c}°C</p>
                <br />
            </div>
        )
    }

    return(
        <div>
            <h2 className="text-2xl mt-5">Hourly Forecast for {day}</h2>
            <div className="grid grid-cols-4 gap-2 w-2/4 mt-5 bg-slate-100">
            {hourlyData.length > 1 ? (
                hourlyData.map((forecast, index) => forecastHour(forecast, index))
            ) : (<p>Loading Hourly Data...</p>)}
            </div>
        </div>
    )
    
}

export default HourlyWeather;