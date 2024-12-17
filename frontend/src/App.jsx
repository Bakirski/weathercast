import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import CurrentLocation from "./components/CurrentLocation.jsx";
import SpecificLocation from "./components/SpecificLocation.jsx";
import Forecast from "./components/Forecast.jsx";
import HourlyWeather from "./components/HourlyWeather.jsx";

function App() {
  const [locationData, setLocationData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [forecast, setForecast] = useState(false);
  const [hourlyData, setHourlyData] = useState(null);

  function getData(returnedData){
    setLocationData(returnedData);
    setSearched(true);
    setForecast(false);  
  }

  return (
    <div>
      <Header
        onSearch={getData}
        searched={searched}
      />
      {locationData &&
        <button onClick={() => {
        console.log(locationData);
        setForecast(true);
        }}>
        3 Day Forecast
        </button>}
      {!searched ? (
        <CurrentLocation current={(returnedData) => {
          setLocationData(returnedData);
          setForecast(false);
        }}/>
      ) : (
        <div>
        <SpecificLocation data={locationData}/>
        </div>
        )}
        {forecast && locationData && <Forecast locationName={locationData.location.name} 
        hourlyWeather={(data) => {
          setHourlyData(data); 
          }}/>}
        

      {hourlyData && <HourlyWeather hourlyData={hourlyData.hours} day={hourlyData.day}/>}
    </div>
  );
}

export default App;
