import React from "react";

function SpecificLocation({ data }) {
  if (!data) return null;

  const LocationDetails = ({ location }) => (
    <div>
      <h1>{location.name}</h1>
      <h1>{location.region}</h1>
      <h3>{location.country}</h3>
      <h4>{location.localtime.split(" ")[1]}</h4>
    </div>
  );

  const WeatherDetails = ({ current }) => (
    <div>
      <p>
        Temperature: {current.temp_c}C || {current.temp_f}F
      </p>
      <p>
        Feels like: {current.feelslike_c}C || {current.feelslike_f}F
      </p>
      <p>{current.condition.text}</p>
      <img src={current.condition.icon} alt="Weather icon" />
    </div>
  );

  const AdditionalInfo = ({ current }) => (
    <div>
      <p>Wind speed: {current.wind_kph} km/h</p>
      <p>Precipitation: {current.precip_mm}mm</p>
      <p>AIQ</p>
    </div>
  );

  return (
    <div>
      <LocationDetails location={data.location} />
      <WeatherDetails current={data.current} />
      <AdditionalInfo current={data.current} />
    </div>
  );
}

export default SpecificLocation;
