import React from "react";

function SpecificLocation({ data }) {
  if (!data) return null;

  const LocationDetails = ({ location }) => (
    <div>
      <h1>{location.name}{location.region !== "" && <span>, {location.region}</span>}</h1>
      <h2>{location.country}</h2>
      <h3>{location.localtime.split(" ")[1]}</h3>
    </div>
  );

  const WeatherDetails = ({ current }) => (
    <div>
      <img src={current.condition.icon} alt="Weather icon" />
      <p>{current.condition.text}</p>
      <p>
        Temperature: {current.temp_c}C || {current.temp_f}F
      </p>
      <p>
        Feels like: {current.feelslike_c}C || {current.feelslike_f}F
      </p>
    </div>
  );

  const AdditionalInfo = ({ current }) => (
    <div>
      <p>Wind speed: {current.wind_kph} km/h</p>
      <p>Precipitation: {current.precip_mm}mm</p>
      <p>Air Quality:
        <ul>
        <li>Carbon Monoxide: {current.air_quality.co} μg/m3</li>
        <li>Ozone: {current.air_quality.no2} μg/m3</li>
        <li>Nitrogen dioxide: {current.air_quality.o3} μg/m3</li>
        <li>Sulphur dioxide:{current.air_quality.so2} μg/m3</li>
        <li>US-epa Index: {current.air_quality['us-epa-index']}</li>
        </ul>
      </p>
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
