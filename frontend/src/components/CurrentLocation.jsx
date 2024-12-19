import React, { useState, useEffect } from "react";
import axios from "axios";

function CurrentLocation(props) {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [coordinatesError, setCoordinatesError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  function LocationDetails({ location }) {
    return (
      <div>
        <h1>{location.name}{location.region !== "" && <span>, {location.region}</span>}</h1>
        <h2>{location.country}</h2>
        <h3>{location.localtime.split(" ")[1]}</h3>
      </div>
    );
  }
  
  function WeatherDetails({ current }) {
    return (
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
  }
  
  function AdditionalInfo({ current }) {
    return (
      <div>
        <p>Wind speed: {current.wind_kph} km/h</p>
        <p>Precipitation: {current.precip_mm}mm</p>
        <p>Air Quality:</p>
        <ul>
          <li>Carbon Monoxide: {current.air_quality.co} μg/m3</li>
          <li>Ozone: {current.air_quality.no2} μg/m3</li>
          <li>Nitrogen Dioxide: {current.air_quality.o3} μg/m3</li>
          <li>Sulphur Dioxide: {current.air_quality.so2} μg/m3</li>
          <li>US-EPA Index: {current.air_quality["us-epa-index"]}</li>
        </ul>
      </div>
    );
  }
  

  async function sendCoords() {
    try {
      const response = await axios.post(
        "http://localhost:4000/current-location",
        { latitude: coordinates.latitude, longitude: coordinates.longitude }
      );
      setCurrentLocation(response.data);
      props.current(response.data);
    } catch (error) {
      console.error("Error sending coordinates: ", error);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setCoordinatesError(error.message);
        }
      );
    } else {
      setCoordinatesError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      sendCoords();
    }
  }, [coordinates]);

  return (
    <div>
      {coordinatesError ? (
        <p>Error: {coordinatesError}</p>
      ) : (coordinates.latitude &&
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
      )}
      {currentLocation && (
        <div>
          <LocationDetails location={currentLocation.location} />
          <WeatherDetails current={currentLocation.current} />
          <AdditionalInfo current={currentLocation.current} />
        </div>
      )}
    </div>
  );
}

export default CurrentLocation;
