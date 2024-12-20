import React, { useState, useEffect } from "react";
import axios from "axios";

function Location(props) {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [coordinatesError, setCoordinatesError] = useState(null);
  const [locationData, setLocationData] = useState(null);

  function AiqDescription({ aqiLevel }) {
    const aqiDescriptions = {
      1: "Air quality is satisfactory, and air pollution poses little or no risk.",
      2: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      3: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      4: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
      5: "Health alert: The risk of health effects is increased for everyone.",
      6: "Health warning of emergency conditions: everyone is more likely to be affected.",
    };

    const description = aqiDescriptions[aqiLevel] || "Unknown AIQ level.";

    return <p>{description}</p>;
  }

  function LocationDetails({ location }) {
    return (
      <div className="flex flex-col p-2 items-center">
        <h1>
          {location.name}
          {location.region && <span>, {location.region}</span>}
        </h1>
        <h2>{location.country}</h2>
        <h3>{location.localtime.split(" ")[1]}</h3>
      </div>
    );
  }

  function WeatherDetails({ current }) {
    return (
      <div className="grid grid-cols-2 items-center w-52">
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
      <div className="flex flex-col items-center col-span-2">
        <div className="flex flex-col items-center">
          <p>Wind speed: {current.wind_kph} km/h</p>
          <p>Precipitation: {current.precip_mm}mm</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Air Quality:</p>
          <ul className="list-none text-center space-y-2">
            <li>Carbon Monoxide: {current.air_quality.co} μg/m3</li>
            <li>Ozone: {current.air_quality.no2} μg/m3</li>
            <li>Nitrogen Dioxide: {current.air_quality.o3} μg/m3</li>
            <li>Sulphur Dioxide: {current.air_quality.so2} μg/m3</li>
            <li>US-EPA Index: {current.air_quality["us-epa-index"]}</li>
            <li>
              <AiqDescription aqiLevel={current.air_quality["us-epa-index"]} />
            </li>
          </ul>
        </div>
      </div>
    );
  }

  async function fetchCurrentLocationData() {
    try {
      const response = await axios.post("http://localhost:4000/current-location", {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
      setLocationData(response.data);
      props.current && props.current(response.data); // Callback for passing current location data to parent
    } catch (error) {
      console.error("Error fetching current location data: ", error);
    }
  }

  useEffect(function () {
    if (!props.data && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          setCoordinatesError(error.message);
        }
      );
    }
  }, [props.data]);

  useEffect(function () {
    if (!props.data && coordinates.latitude && coordinates.longitude) {
      fetchCurrentLocationData();
    }
  }, [coordinates, props.data]);

  useEffect(function () {
    if (props.data) {
      setLocationData(props.data);
    }
  }, [props.data]);

  return (
    <div>
      {locationData ? (
        <div className="flex flex-col gap-2 bg-slate-200 min-w-1 max-w-96 p-2 pl-4 pr-4 rounded-lg items-center">
          <LocationDetails location={locationData.location} />
          <WeatherDetails current={locationData.current} />
          <AdditionalInfo current={locationData.current} />
        </div>
      ) : coordinatesError ? (
        <p>Error: {coordinatesError}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Location;
