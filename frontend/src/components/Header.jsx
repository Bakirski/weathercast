import React, { useState } from "react";
import axios from "axios";

function Header(props) {
  const [location, setLocation] = useState(null);

  async function getLocationData(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/get-location-data",
        {
          location_name: location,
        }
      );
      console.log("Response from server: ", response.data);
      props.onSearch(response.data);
    } catch (error) {
      console.error("Error sending request for location weather: ", error);
    }
  }

  return (
    <div>
      <h1>Weather Forecast</h1>
      <form onSubmit={getLocationData}>
        <input
          type="text"
          placeholder="Search"
          name="location_name"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Header;
