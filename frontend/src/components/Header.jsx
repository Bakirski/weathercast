import React, { useState } from "react";
import axios from "axios";

function Header(props) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  async function getLocationData(event) {
    event.preventDefault();
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:4000/get-location-data",
        {
          location_name: location,
        }
      );
      console.log("Response from server: ", response.data);
      props.onSearch(response.data);
    } catch (error) {
      setError("City name does not exist.");
      console.error("Error sending request for location weather: ", error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl mb-5">Weather Forecast</h1>
      <form onSubmit={getLocationData} className="mb-3">
        <input
          type="text"
          placeholder="Search"
          name="location_name"
          className="rounded-lg border border-solid border-black mr-2 p-0.5"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <button type="submit" className="border border-black p-0.5 rounded-lg pl-1 pr-1">Search</button>
        <p>{error && error}</p>
      </form>
    </div>
  );
}

export default Header;
