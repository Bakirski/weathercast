import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import CurrentLocation from "./components/CurrentLocation.jsx";
import SpecificLocation from "./components/SpecificLocation.jsx";
function App() {
  const [locationData, setLocationData] = useState(null);
  const [searched, setSearched] = useState(false);
  return (
    <div>
      <Header
        onSearch={(returnedData) => {
          setLocationData(returnedData);
          setSearched(true);
        }}
        searched={searched}
      />
      {!searched ? (
        <CurrentLocation />
      ) : (
        <SpecificLocation data={locationData} />
      )}
    </div>
  );
}

export default App;
