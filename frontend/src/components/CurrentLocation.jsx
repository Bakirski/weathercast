import React, { useState, useEffect } from "react";
import axios from "axios";

function CurrentLocation() {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [coordinatesError, setCoordinatesError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

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

  async function sendCoords() {
    try {
      const response = await axios.post(
        "http://localhost:4000/current-location",
        { latitude: coordinates.latitude, longitude: coordinates.longitude }
      );
      setCurrentLocation(response.data);
      console.log(currentLocation);
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
      ) : (
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
